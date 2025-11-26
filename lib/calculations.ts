export const calculatePercentage = (number: number, percentage: number): number => {
  return (number * percentage) / 100;
};

export const percentageOf = (part: number, whole: number): number => {
  if (whole === 0) return 0;
  return (part / whole) * 100;
};

export const percentageIncrease = (number: number, percentage: number): number => {
  return number + calculatePercentage(number, percentage);
};

export const percentageDecrease = (number: number, percentage: number): number => {
  return number - calculatePercentage(number, percentage);
};

export const changeRate = (oldValue: number, newValue: number): {
  difference: number;
  percentage: number;
  isIncrease: boolean;
} => {
  const difference = newValue - oldValue;
  const percentage = oldValue !== 0 ? (difference / oldValue) * 100 : 0;
  return {
    difference,
    percentage,
    isIncrease: difference >= 0,
  };
};

export const simpleInterest = (
  principal: number,
  rate: number,
  time: number
): {
  totalInterest: number;
  totalAmount: number;
  monthlyPayment: number;
} => {
  const totalInterest = (principal * rate * time) / 100;
  const totalAmount = principal + totalInterest;
  const monthlyPayment = totalAmount / (time * 12);
  
  return {
    totalInterest,
    totalAmount,
    monthlyPayment,
  };
};

export const compoundInterest = (
  principal: number,
  rate: number,
  time: number,
  frequency: number = 12 // monthly by default
): {
  totalInterest: number;
  totalAmount: number;
  monthlyPayment: number;
} => {
  const totalAmount = principal * Math.pow(1 + rate / (100 * frequency), frequency * time);
  const totalInterest = totalAmount - principal;
  const monthlyPayment = totalAmount / (time * 12);
  
  return {
    totalInterest,
    totalAmount,
    monthlyPayment,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(value);
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};
