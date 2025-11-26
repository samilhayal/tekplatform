'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, GraduationCap, TrendingUp, Award, BookOpen } from 'lucide-react'

type LetterGrade = 'AA' | 'BA' | 'BB' | 'CB' | 'CC' | 'DC' | 'DD' | 'FD' | 'FF'

interface Course {
  id: string
  name: string
  credit: number
  grade: LetterGrade | ''
}

interface Semester {
  id: string
  name: string
  courses: Course[]
}

const GRADE_COEFFICIENTS: Record<LetterGrade, number> = {
  'AA': 4.0,
  'BA': 3.5,
  'BB': 3.0,
  'CB': 2.5,
  'CC': 2.0,
  'DC': 1.5,
  'DD': 1.0,
  'FD': 0.5,
  'FF': 0.0
}

export function GpaCalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: '1',
      name: 'Dönem 1',
      courses: [
        { id: '1', name: 'Ders 1', credit: 3, grade: '' }
      ]
    }
  ])

  const [currentSemester, setCurrentSemester] = useState('1')

  // LocalStorage'dan yükle
  useEffect(() => {
    const saved = localStorage.getItem('gpa-calculator')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setSemesters(data.semesters || semesters)
        setCurrentSemester(data.currentSemester || '1')
      } catch (e) {
        console.error('Load error:', e)
      }
    }
  }, [])

  // LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('gpa-calculator', JSON.stringify({
      semesters,
      currentSemester
    }))
  }, [semesters, currentSemester])

  const addSemester = () => {
    const newId = String(semesters.length + 1)
    setSemesters([
      ...semesters,
      {
        id: newId,
        name: `Dönem ${newId}`,
        courses: [{ id: '1', name: 'Ders 1', credit: 3, grade: '' }]
      }
    ])
    setCurrentSemester(newId)
  }

  const removeSemester = (semesterId: string) => {
    if (semesters.length === 1) {
      alert('En az bir dönem olmalı')
      return
    }
    const newSemesters = semesters.filter(s => s.id !== semesterId)
    setSemesters(newSemesters)
    if (currentSemester === semesterId) {
      setCurrentSemester(newSemesters[0].id)
    }
  }

  const addCourse = (semesterId: string) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        const newCourseId = String(sem.courses.length + 1)
        return {
          ...sem,
          courses: [
            ...sem.courses,
            { id: newCourseId, name: `Ders ${newCourseId}`, credit: 3, grade: '' }
          ]
        }
      }
      return sem
    }))
  }

  const removeCourse = (semesterId: string, courseId: string) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        if (sem.courses.length === 1) {
          alert('En az bir ders olmalı')
          return sem
        }
        return {
          ...sem,
          courses: sem.courses.filter(c => c.id !== courseId)
        }
      }
      return sem
    }))
  }

  const updateCourse = (semesterId: string, courseId: string, field: keyof Course, value: string | number) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        return {
          ...sem,
          courses: sem.courses.map(course => {
            if (course.id === courseId) {
              return { ...course, [field]: value }
            }
            return course
          })
        }
      }
      return sem
    }))
  }

  const calculateSemesterGPA = (semester: Semester) => {
    const validCourses = semester.courses.filter(c => c.grade && c.credit > 0)
    if (validCourses.length === 0) return 0

    const totalPoints = validCourses.reduce((sum, course) => {
      return sum + (course.credit * GRADE_COEFFICIENTS[course.grade as LetterGrade])
    }, 0)

    const totalCredits = validCourses.reduce((sum, course) => sum + course.credit, 0)

    return totalCredits > 0 ? totalPoints / totalCredits : 0
  }

  const calculateCGPA = () => {
    const allCourses = semesters.flatMap(sem => sem.courses)
    const validCourses = allCourses.filter(c => c.grade && c.credit > 0)
    
    if (validCourses.length === 0) return 0

    const totalPoints = validCourses.reduce((sum, course) => {
      return sum + (course.credit * GRADE_COEFFICIENTS[course.grade as LetterGrade])
    }, 0)

    const totalCredits = validCourses.reduce((sum, course) => sum + course.credit, 0)

    return totalCredits > 0 ? totalPoints / totalCredits : 0
  }

  const getTotalCredits = () => {
    return semesters.flatMap(sem => sem.courses)
      .filter(c => c.grade && c.credit > 0)
      .reduce((sum, course) => sum + course.credit, 0)
  }

  const getGradeColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-600'
    if (gpa >= 3.0) return 'text-blue-600'
    if (gpa >= 2.5) return 'text-yellow-600'
    if (gpa >= 2.0) return 'text-orange-600'
    return 'text-red-600'
  }

  const getGradeLabel = (gpa: number) => {
    if (gpa >= 3.5) return 'Pekiyi'
    if (gpa >= 3.0) return 'İyi'
    if (gpa >= 2.5) return 'Orta'
    if (gpa >= 2.0) return 'Geçer'
    return 'Zayıf'
  }

  const resetAll = () => {
    if (confirm('Tüm veriler silinecek. Emin misiniz?')) {
      setSemesters([
        {
          id: '1',
          name: 'Dönem 1',
          courses: [{ id: '1', name: 'Ders 1', credit: 3, grade: '' }]
        }
      ])
      setCurrentSemester('1')
      localStorage.removeItem('gpa-calculator')
    }
  }

  const currentSemesterData = semesters.find(s => s.id === currentSemester)
  const cgpa = calculateCGPA()
  const totalCredits = getTotalCredits()

  return (
    <div className="space-y-6">
      {/* Not Sistemi Bilgisi */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-indigo-900">4'lük Not Sistemi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-sm">
            {Object.entries(GRADE_COEFFICIENTS).map(([grade, coef]) => (
              <div key={grade} className="bg-white px-3 py-2 rounded text-center">
                <div className="font-bold text-indigo-600">{grade}</div>
                <div className="text-slate-600">{coef.toFixed(1)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dönem Seçimi */}
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Dönemler</CardTitle>
            <Button onClick={addSemester} size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600">
              <Plus className="h-4 w-4 mr-1" />
              Yeni Dönem
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {semesters.map(sem => (
              <div key={sem.id} className="flex items-center gap-1">
                <Button
                  variant={currentSemester === sem.id ? 'default' : 'outline'}
                  onClick={() => setCurrentSemester(sem.id)}
                  className={currentSemester === sem.id ? 'bg-indigo-600' : ''}
                >
                  {sem.name}
                  <span className="ml-2 text-xs">
                    (DNO: {calculateSemesterGPA(sem).toFixed(2)})
                  </span>
                </Button>
                {semesters.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSemester(sem.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dersler */}
      {currentSemesterData && (
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{currentSemesterData.name}</CardTitle>
                <CardDescription>Ders bilgilerini girin</CardDescription>
              </div>
              <Button 
                onClick={() => addCourse(currentSemester)}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-1" />
                Ders Ekle
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentSemesterData.courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-12 gap-3 items-end p-3 bg-slate-50 rounded-lg">
                <div className="col-span-12 md:col-span-5">
                  <Label className="text-xs">Ders Adı</Label>
                  <Input
                    value={course.name}
                    onChange={(e) => updateCourse(currentSemester, course.id, 'name', e.target.value)}
                    placeholder="Ders adı"
                  />
                </div>
                
                <div className="col-span-6 md:col-span-3">
                  <Label className="text-xs">Kredi</Label>
                  <Input
                    type="number"
                    value={course.credit || ''}
                    onChange={(e) => updateCourse(currentSemester, course.id, 'credit', Number(e.target.value))}
                    placeholder="3"
                    min="1"
                    max="10"
                  />
                </div>

                <div className="col-span-5 md:col-span-3">
                  <Label className="text-xs">Not</Label>
                  <Select
                    value={course.grade}
                    onValueChange={(v) => updateCourse(currentSemester, course.id, 'grade', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(GRADE_COEFFICIENTS).map(grade => (
                        <SelectItem key={grade} value={grade}>
                          {grade} ({GRADE_COEFFICIENTS[grade as LetterGrade].toFixed(1)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1 md:col-span-1 flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCourse(currentSemester, course.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Sonuçlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DNO */}
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Dönem Not Ortalaması (DNO)
            </CardTitle>
            <CardDescription className="text-blue-100">
              {currentSemesterData?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentSemesterData && (
              <>
                <div className="text-6xl font-bold mb-2">
                  {calculateSemesterGPA(currentSemesterData).toFixed(2)}
                </div>
                <div className="text-blue-100 text-lg">
                  {getGradeLabel(calculateSemesterGPA(currentSemesterData))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* GANO */}
        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Genel Not Ortalaması (GANO)
            </CardTitle>
            <CardDescription className="text-purple-100">
              Tüm dönemler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-bold mb-2">
              {cgpa.toFixed(2)}
            </div>
            <div className="text-purple-100 text-lg">
              {getGradeLabel(cgpa)} • {totalCredits} Kredi
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dönem Ortalamaları Tablosu */}
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-slate-700" />
            Dönem Bazında Ortalamalar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {semesters.map(sem => {
              const gpa = calculateSemesterGPA(sem)
              const credits = sem.courses
                .filter(c => c.grade && c.credit > 0)
                .reduce((sum, c) => sum + c.credit, 0)
              
              return (
                <div key={sem.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <Award className={`h-5 w-5 ${getGradeColor(gpa)}`} />
                    <div>
                      <div className="font-semibold">{sem.name}</div>
                      <div className="text-xs text-slate-600">{credits} kredi</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getGradeColor(gpa)}`}>
                      {gpa.toFixed(2)}
                    </div>
                    <div className="text-xs text-slate-600">{getGradeLabel(gpa)}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sıfırla Butonu */}
      <div className="flex justify-center">
        <Button onClick={resetAll} variant="outline" className="text-red-600 hover:bg-red-50">
          <Trash2 className="h-4 w-4 mr-2" />
          Tüm Verileri Sıfırla
        </Button>
      </div>
    </div>
  )
}
