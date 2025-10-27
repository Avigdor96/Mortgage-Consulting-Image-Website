import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface MortgageCalculatorProps {
  isDarkMode: boolean;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ isDarkMode }) => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    pieData: any;
    lineData: any;
  } | null>(null);

  useEffect(() => {
    const principal = loanAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment = 0;
    if (interestRate > 0) {
      monthlyPayment =
        (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    } else if (numberOfPayments > 0) {
      monthlyPayment = principal / numberOfPayments;
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    const textColor = isDarkMode ? 'rgb(226, 232, 240)' : 'rgb(51, 65, 85)';

    // Data for Pie Chart
    const pieData = {
      labels: ['קרן', 'ריבית'],
      datasets: [
        {
          data: [principal, totalInterest],
          backgroundColor: ['#14b8a6', '#f97316'], // Teal and Orange
          borderColor: [isDarkMode ? '#334155' : '#ffffff'],
          borderWidth: 2,
        },
      ],
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                 labels: {
                    color: textColor,
                    font: {
                        size: 14,
                    }
                }
            },
            tooltip: {
                 bodyColor: isDarkMode ? '#0f172a' : '#ffffff',
                titleColor: isDarkMode ? '#0f172a' : '#ffffff',
                backgroundColor: isDarkMode ? 'rgba(226, 232, 240, 0.9)' : 'rgba(30, 41, 59, 0.9)',
                callbacks: {
                    label: function(context: any) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', minimumFractionDigits: 0 }).format(context.parsed);
                        }
                        return label;
                    }
                }
            }
        }
    };

    // Data for Line Chart (Amortization)
    const lineLabels: string[] = [];
    const lineDataPoints: number[] = [];
    let remainingBalance = principal;
    if (numberOfPayments > 0) {
        for (let year = 1; year <= loanTerm; year++) {
            for (let month = 1; month <= 12; month++) {
                let interestForMonth = remainingBalance * monthlyInterestRate;
                let principalForMonth = monthlyPayment - interestForMonth;
                remainingBalance -= principalForMonth;
            }
            lineLabels.push(`שנה ${year}`);
            lineDataPoints.push(Math.max(0, remainingBalance));
        }
    }
    
    const lineData = {
      labels: lineLabels,
      datasets: [
        {
          label: 'יתרת קרן',
          data: lineDataPoints,
          borderColor: '#14b8a6',
          backgroundColor: 'rgba(20, 184, 166, 0.1)',
          fill: true,
          tension: 0.1,
        },
      ],
    };
    
    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: textColor,
                    font: {
                        size: 14,
                    }
                }
            },
            tooltip: {
                bodyColor: isDarkMode ? '#0f172a' : '#ffffff',
                titleColor: isDarkMode ? '#0f172a' : '#ffffff',
                backgroundColor: isDarkMode ? 'rgba(226, 232, 240, 0.9)' : 'rgba(30, 41, 59, 0.9)',
                callbacks: {
                    label: function(context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', minimumFractionDigits: 0 }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: { 
                    color: textColor,
                    callback: (value: any) => `${(Number(value) / 1000).toLocaleString()}k ₪`
                },
                grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            },
            x: {
                ticks: { color: textColor },
                grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            }
        }
    };

    setResults({ monthlyPayment, totalInterest, totalPayment, pieData: {...pieData, options: pieChartOptions}, lineData: {...lineData, options: lineChartOptions} });

  }, [loanAmount, interestRate, loanTerm, isDarkMode]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('he-IL', { style: 'currency', currency: 'ILS', minimumFractionDigits: 0 });
  }

  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">מחשבון משכנתא</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">הכניסו את פרטי ההלוואה וקבלו הערכה של ההחזר החודשי</p>
        </div>
        <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/50 p-8 rounded-lg shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Loan Amount */}
            <div>
              <label htmlFor="loanAmount" className="block text-slate-700 dark:text-slate-200 font-medium mb-2">סכום ההלוואה</label>
              <input type="range" id="loanAmount" min="100000" max="3000000" step="50000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
              <div className="text-center mt-2 font-bold text-teal-600 dark:text-teal-400 text-lg">{formatCurrency(loanAmount)}</div>
            </div>
            {/* Interest Rate */}
            <div>
              <label htmlFor="interestRate" className="block text-slate-700 dark:text-slate-200 font-medium mb-2">ריבית שנתית (%)</label>
              <input type="range" id="interestRate" min="1" max="10" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
              <div className="text-center mt-2 font-bold text-teal-600 dark:text-teal-400 text-lg">{interestRate.toFixed(1)}%</div>
            </div>
            {/* Loan Term */}
            <div>
              <label htmlFor="loanTerm" className="block text-slate-700 dark:text-slate-200 font-medium mb-2">תקופת ההלוואה (שנים)</label>
              <input type="range" id="loanTerm" min="5" max="30" step="1" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
              <div className="text-center mt-2 font-bold text-teal-600 dark:text-teal-400 text-lg">{loanTerm} שנים</div>
            </div>
          </div>

          {results && (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-10 p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                    <div>
                        <h4 className="text-slate-600 dark:text-slate-400">החזר חודשי</h4>
                        <p className="text-2xl font-bold text-teal-700 dark:text-teal-300">{formatCurrency(results.monthlyPayment)}</p>
                    </div>
                    <div>
                        <h4 className="text-slate-600 dark:text-slate-400">סה"כ ריבית</h4>
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{formatCurrency(results.totalInterest)}</p>
                    </div>
                    <div>
                        <h4 className="text-slate-600 dark:text-slate-400">סה"כ החזר</h4>
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{formatCurrency(results.totalPayment)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
                     <h3 className="text-xl font-bold text-center mb-4">התפלגות תשלומים</h3>
                    <Pie data={results.pieData} options={results.pieData.options} />
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-center mb-4">לוח סילוקין (יתרת קרן)</h3>
                    <Line data={results.lineData} options={results.lineData.options} />
                  </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
