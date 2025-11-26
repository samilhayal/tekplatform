"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Users, DollarSign, TrendingUp, Download, Link as LinkIcon, Calculator, PieChart, FileText, Edit, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Participant {
  id: string
  name: string
  email?: string
}

interface Expense {
  id: string
  description: string
  amount: number
  paidBy: string
  date: string
  splitWith: string[]
  customSplit?: { [key: string]: number }
}

interface Settlement {
  from: string
  to: string
  amount: number
}

interface Group {
  id: string
  name: string
  date: string
  currency: string
  participants: Participant[]
  expenses: Expense[]
}

export function ExpenseSplitter() {
  const [groups, setGroups] = useState<Group[]>([])
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupCurrency, setNewGroupCurrency] = useState("TRY")
  const [newParticipantName, setNewParticipantName] = useState("")
  const [newParticipantEmail, setNewParticipantEmail] = useState("")
  const [newExpenseDesc, setNewExpenseDesc] = useState("")
  const [newExpenseAmount, setNewExpenseAmount] = useState("")
  const [newExpensePaidBy, setNewExpensePaidBy] = useState("")
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])
  const [showGroupForm, setShowGroupForm] = useState(true)
  const [editingExpense, setEditingExpense] = useState<string | null>(null)

  // LocalStorage'dan veri yükle
  useEffect(() => {
    const saved = localStorage.getItem("expenseSplitterGroups")
    if (saved) {
      const loadedGroups = JSON.parse(saved)
      setGroups(loadedGroups)
      if (loadedGroups.length > 0) {
        setCurrentGroup(loadedGroups[0])
        setShowGroupForm(false)
      }
    }
  }, [])

  // LocalStorage'a kaydet
  useEffect(() => {
    if (groups.length > 0) {
      localStorage.setItem("expenseSplitterGroups", JSON.stringify(groups))
    }
  }, [groups])

  // Grup oluştur
  const createGroup = () => {
    if (!newGroupName.trim()) return

    const newGroup: Group = {
      id: Date.now().toString(),
      name: newGroupName,
      date: new Date().toISOString().split('T')[0],
      currency: newGroupCurrency,
      participants: [],
      expenses: []
    }

    setGroups([...groups, newGroup])
    setCurrentGroup(newGroup)
    setNewGroupName("")
    setShowGroupForm(false)
  }

  // Katılımcı ekle
  const addParticipant = () => {
    if (!currentGroup || !newParticipantName.trim()) return

    const newParticipant: Participant = {
      id: Date.now().toString(),
      name: newParticipantName,
      email: newParticipantEmail || undefined
    }

    const updatedGroup = {
      ...currentGroup,
      participants: [...currentGroup.participants, newParticipant]
    }

    updateGroup(updatedGroup)
    setNewParticipantName("")
    setNewParticipantEmail("")
  }

  // Katılımcı sil
  const removeParticipant = (id: string) => {
    if (!currentGroup) return

    const updatedGroup = {
      ...currentGroup,
      participants: currentGroup.participants.filter(p => p.id !== id)
    }

    updateGroup(updatedGroup)
  }

  // Masraf ekle
  const addExpense = () => {
    if (!currentGroup || !newExpenseDesc.trim() || !newExpenseAmount || !newExpensePaidBy) return

    const participantsToSplit = selectedParticipants.length > 0 
      ? selectedParticipants 
      : currentGroup.participants.map(p => p.id)

    const newExpense: Expense = {
      id: Date.now().toString(),
      description: newExpenseDesc,
      amount: parseFloat(newExpenseAmount),
      paidBy: newExpensePaidBy,
      date: new Date().toISOString().split('T')[0],
      splitWith: participantsToSplit
    }

    const updatedGroup = {
      ...currentGroup,
      expenses: [...currentGroup.expenses, newExpense]
    }

    updateGroup(updatedGroup)
    setNewExpenseDesc("")
    setNewExpenseAmount("")
    setNewExpensePaidBy("")
    setSelectedParticipants([])
  }

  // Masraf sil
  const removeExpense = (id: string) => {
    if (!currentGroup) return

    const updatedGroup = {
      ...currentGroup,
      expenses: currentGroup.expenses.filter(e => e.id !== id)
    }

    updateGroup(updatedGroup)
  }

  // Grubu güncelle
  const updateGroup = (updatedGroup: Group) => {
    const updatedGroups = groups.map(g => g.id === updatedGroup.id ? updatedGroup : g)
    setGroups(updatedGroups)
    setCurrentGroup(updatedGroup)
  }

  // Hesaplamalar
  const calculateBalances = (): { [key: string]: number } => {
    if (!currentGroup) return {}

    const balances: { [key: string]: number } = {}
    currentGroup.participants.forEach(p => {
      balances[p.id] = 0
    })

    currentGroup.expenses.forEach(expense => {
      const sharePerPerson = expense.amount / expense.splitWith.length

      // Ödemeyi yapan alacaklı
      balances[expense.paidBy] += expense.amount

      // Masrafı paylaşanlar borçlu
      expense.splitWith.forEach(participantId => {
        balances[participantId] -= sharePerPerson
      })
    })

    return balances
  }

  // Borç/alacak tablosu
  const calculateSettlements = (): Settlement[] => {
    const balances = calculateBalances()
    const settlements: Settlement[] = []

    const debtors = Object.entries(balances)
      .filter(([_, balance]) => balance < 0)
      .map(([id, balance]) => ({ id, amount: Math.abs(balance) }))
      .sort((a, b) => b.amount - a.amount)

    const creditors = Object.entries(balances)
      .filter(([_, balance]) => balance > 0)
      .map(([id, balance]) => ({ id, amount: balance }))
      .sort((a, b) => b.amount - a.amount)

    let i = 0, j = 0
    while (i < debtors.length && j < creditors.length) {
      const debt = debtors[i].amount
      const credit = creditors[j].amount
      const amount = Math.min(debt, credit)

      if (amount > 0.01) {
        settlements.push({
          from: debtors[i].id,
          to: creditors[j].id,
          amount: amount
        })
      }

      debtors[i].amount -= amount
      creditors[j].amount -= amount

      if (debtors[i].amount < 0.01) i++
      if (creditors[j].amount < 0.01) j++
    }

    return settlements
  }

  // PDF export
  const exportToPDF = () => {
    if (!currentGroup) return
    
    const settlements = calculateSettlements()
    let content = `Grup: ${currentGroup.name}\nTarih: ${currentGroup.date}\n\n`
    content += `KATILIMCILAR:\n`
    currentGroup.participants.forEach(p => {
      content += `- ${p.name}${p.email ? ` (${p.email})` : ''}\n`
    })
    content += `\nHARCAMALAR:\n`
    currentGroup.expenses.forEach(e => {
      const payer = currentGroup.participants.find(p => p.id === e.paidBy)
      content += `${e.date} - ${e.description}: ${e.amount} ${currentGroup.currency} (${payer?.name})\n`
    })
    content += `\nÖDEMELER:\n`
    settlements.forEach(s => {
      const from = currentGroup.participants.find(p => p.id === s.from)
      const to = currentGroup.participants.find(p => p.id === s.to)
      content += `${from?.name} → ${to?.name}: ${s.amount.toFixed(2)} ${currentGroup.currency}\n`
    })

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentGroup.name}-hesap.txt`
    a.click()
  }

  // İstatistikler
  const getStats = () => {
    if (!currentGroup) return { total: 0, perPerson: 0, expenseCount: 0 }

    const total = currentGroup.expenses.reduce((sum, e) => sum + e.amount, 0)
    const perPerson = currentGroup.participants.length > 0 
      ? total / currentGroup.participants.length 
      : 0

    return {
      total,
      perPerson,
      expenseCount: currentGroup.expenses.length
    }
  }

  const stats = getStats()
  const balances = calculateBalances()
  const settlements = calculateSettlements()

  const getParticipantName = (id: string) => {
    return currentGroup?.participants.find(p => p.id === id)?.name || 'Bilinmeyen'
  }

  return (
    <div className="w-full space-y-6">
      {/* Header Stats */}
      {!showGroupForm && currentGroup && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Toplam Harcama</p>
                  <p className="text-3xl font-bold text-blue-900">
                    {stats.total.toFixed(2)} {currentGroup.currency}
                  </p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Kişi Başı</p>
                  <p className="text-3xl font-bold text-green-900">
                    {stats.perPerson.toFixed(2)} {currentGroup.currency}
                  </p>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Toplam İşlem</p>
                  <p className="text-3xl font-bold text-purple-900">{stats.expenseCount}</p>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Grup Oluşturma / Seçme */}
      {showGroupForm ? (
        <Card className="border-2 border-indigo-200">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              Yeni Grup Oluştur
            </CardTitle>
            <CardDescription>Harcama paylaşımı için bir grup oluşturun</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>Grup Adı</Label>
              <Input
                placeholder="Örn: Yaz Tatili 2024"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="border-2 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Para Birimi</Label>
              <select
                value={newGroupCurrency}
                onChange={(e) => setNewGroupCurrency(e.target.value)}
                className="w-full rounded-lg border-2 border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              >
                <option value="TRY">TRY (₺)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <Button 
              onClick={createGroup}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Grup Oluştur
            </Button>

            {groups.length > 0 && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Mevcut Gruplar:</p>
                <div className="space-y-2">
                  {groups.map(group => (
                    <Button
                      key={group.id}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        setCurrentGroup(group)
                        setShowGroupForm(false)
                      }}
                    >
                      {group.name} ({group.participants.length} kişi)
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Grup Bilgileri */}
          {currentGroup && (
            <Card className="border-2 border-indigo-200">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-indigo-600" />
                      {currentGroup.name}
                    </CardTitle>
                    <CardDescription>
                      {currentGroup.date} • {currentGroup.currency}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowGroupForm(true)}
                  >
                    Grup Değiştir
                  </Button>
                </div>
              </CardHeader>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sol Kolon - Katılımcılar ve Masraflar */}
            <div className="space-y-6">
              {/* Katılımcı Ekleme */}
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                    Katılımcılar ({currentGroup?.participants.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-sm">İsim *</Label>
                      <Input
                        placeholder="Katılımcı adı"
                        value={newParticipantName}
                        onChange={(e) => setNewParticipantName(e.target.value)}
                        className="border-2 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">E-posta (Opsiyonel)</Label>
                      <Input
                        type="email"
                        placeholder="ornek@email.com"
                        value={newParticipantEmail}
                        onChange={(e) => setNewParticipantEmail(e.target.value)}
                        className="border-2 focus:border-blue-500"
                      />
                    </div>
                    <Button 
                      onClick={addParticipant}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      disabled={!newParticipantName.trim()}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Katılımcı Ekle
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {currentGroup?.participants.map(participant => (
                      <div 
                        key={participant.id}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-blue-900">{participant.name}</p>
                          {participant.email && (
                            <p className="text-xs text-blue-600">{participant.email}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeParticipant(participant.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Masraf Ekleme */}
              <Card className="border-2 border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Masraf Ekle
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label className="text-sm">Açıklama *</Label>
                    <Input
                      placeholder="Örn: Restoran yemeği"
                      value={newExpenseDesc}
                      onChange={(e) => setNewExpenseDesc(e.target.value)}
                      className="border-2 focus:border-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Tutar *</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newExpenseAmount}
                      onChange={(e) => setNewExpenseAmount(e.target.value)}
                      className="border-2 focus:border-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Kim Ödedi? *</Label>
                    <select
                      value={newExpensePaidBy}
                      onChange={(e) => setNewExpensePaidBy(e.target.value)}
                      className="w-full rounded-lg border-2 border-slate-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                    >
                      <option value="">Seçiniz...</option>
                      {currentGroup?.participants.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Masrafı Paylaşanlar (Boş = Herkes)</Label>
                    <div className="flex flex-wrap gap-2">
                      {currentGroup?.participants.map(p => (
                        <Badge
                          key={p.id}
                          variant={selectedParticipants.includes(p.id) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedParticipants.includes(p.id) 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'hover:bg-green-50'
                          }`}
                          onClick={() => {
                            setSelectedParticipants(prev =>
                              prev.includes(p.id)
                                ? prev.filter(id => id !== p.id)
                                : [...prev, p.id]
                            )
                          }}
                        >
                          {p.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={addExpense}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    disabled={!newExpenseDesc.trim() || !newExpenseAmount || !newExpensePaidBy}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Masraf Ekle
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sağ Kolon - Masraf Listesi ve Ödemeler */}
            <div className="space-y-6">
              {/* Masraf Listesi */}
              <Card className="border-2 border-purple-200">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-purple-600" />
                    Masraflar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-6">
                  {currentGroup?.expenses.length === 0 ? (
                    <p className="text-center text-slate-500 py-8">Henüz masraf eklenmemiş</p>
                  ) : (
                    currentGroup?.expenses.map(expense => (
                      <div 
                        key={expense.id}
                        className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-purple-900">{expense.description}</p>
                            <p className="text-sm text-purple-600">
                              {getParticipantName(expense.paidBy)} ödedi • {expense.date}
                            </p>
                            <p className="text-xs text-purple-500 mt-1">
                              Paylaşanlar: {expense.splitWith.map(id => getParticipantName(id)).join(', ')}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-purple-900">
                              {expense.amount.toFixed(2)} {currentGroup.currency}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExpense(expense.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Ödeme Planı */}
              <Card className="border-2 border-orange-200">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="h-5 w-5 text-orange-600" />
                    Kim Kime Ne Kadar Borçlu?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-6">
                  {settlements.length === 0 ? (
                    <p className="text-center text-slate-500 py-8">Borç/alacak yok</p>
                  ) : (
                    settlements.map((settlement, idx) => (
                      <div 
                        key={idx}
                        className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-orange-500">{getParticipantName(settlement.from)}</Badge>
                              <span className="text-orange-600">→</span>
                              <Badge className="bg-green-500">{getParticipantName(settlement.to)}</Badge>
                            </div>
                          </div>
                          <span className="text-xl font-bold text-orange-900">
                            {settlement.amount.toFixed(2)} {currentGroup?.currency}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Bakiye Durumu */}
              <Card className="border-2 border-slate-200">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PieChart className="h-5 w-5 text-slate-600" />
                    Bakiye Durumu
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-6">
                  {currentGroup?.participants.map(participant => {
                    const balance = balances[participant.id] || 0
                    return (
                      <div 
                        key={participant.id}
                        className={`p-3 rounded-lg border ${
                          balance > 0 
                            ? 'bg-green-50 border-green-200' 
                            : balance < 0 
                            ? 'bg-red-50 border-red-200' 
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{participant.name}</span>
                          <span className={`text-lg font-bold ${
                            balance > 0 
                              ? 'text-green-700' 
                              : balance < 0 
                              ? 'text-red-700' 
                              : 'text-slate-700'
                          }`}>
                            {balance > 0 ? '+' : ''}{balance.toFixed(2)} {currentGroup.currency}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Eylemler */}
              <Card className="border-2 border-indigo-200">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle className="text-lg">Eylemler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-6">
                  <Button 
                    onClick={exportToPDF}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Rapor İndir (TXT)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
