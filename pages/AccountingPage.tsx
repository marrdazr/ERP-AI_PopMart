import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sale, Product, Expense } from '../types';

interface AccountingPageProps {
  sales: Sale[];
  products: Product[];
  expenses: Expense[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const AccountingPage: React.FC<AccountingPageProps> = ({ sales, products, expenses }) => {
  const [period, setPeriod] = useState<'monthly' | 'allTime'>('monthly');

  const financialData = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const filteredSales = period === 'monthly'
      ? sales.filter(s => {
          const saleDate = new Date(s.sale_date);
          return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear && s.status === 'Paid';
        })
      : sales.filter(s => s.status === 'Paid');

    const filteredExpenses = period === 'monthly'
      ? expenses.filter(e => {
          const expenseDate = new Date(e.expense_date);
          return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
        })
      : expenses;

    const revenue = filteredSales.reduce((acc, sale) => acc + (sale.quantity * sale.unit_price), 0);

    const cogs = filteredSales.reduce((acc, sale) => {
      const product = products.find(p => p.id === sale.product_id);
      const cost = product ? product.purchase_price * sale.quantity : 0;
      return acc + cost;
    }, 0);

    const grossProfit = revenue - cogs;

    const operatingExpenses = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);

    const netProfit = grossProfit - operatingExpenses;

    return {
      revenue,
      cogs,
      grossProfit,
      operatingExpenses,
      netProfit,
    };
  }, [sales, products, expenses, period]);

  const chartData = [
    { name: 'Revenue', value: financialData.revenue, fill: '#82ca9d' },
    { name: 'Expenses', value: financialData.cogs + financialData.operatingExpenses, fill: '#ff8042' },
    { name: 'Net Profit', value: financialData.netProfit, fill: '#8884d8' },
  ];

  const StatCard: React.FC<{ title: string; value: number, isNegative?: boolean }> = ({ title, value, isNegative = false }) => (
    <div className={`p-4 rounded-lg flex justify-between items-center ${isNegative ? 'bg-red-50' : 'bg-green-50'}`}>
        <span className={`text-sm font-medium ${isNegative ? 'text-red-800' : 'text-green-800'}`}>{title}</span>
        <span className={`text-lg font-bold ${isNegative ? 'text-red-900' : 'text-green-900'}`}>{formatCurrency(value)}</span>
    </div>
  );


  return (
    <div className="p-6 space-y-6">
      <div className="bg-surface rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Laporan Laba Rugi (Profit & Loss)</h2>
          <div className="flex items-center space-x-2">
            <label htmlFor="period-select" className="text-sm font-medium text-text-secondary">Period:</label>
            <select
                id="period-select"
                value={period}
                onChange={(e) => setPeriod(e.target.value as 'monthly' | 'allTime')}
                className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
            >
                <option value="monthly">This Month</option>
                <option value="allTime">All Time</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* P&L Statement */}
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
                <div className="flex justify-between py-2 border-b">
                    <span className="font-medium text-text-secondary">Pendapatan (Revenue)</span>
                    <span className="font-semibold text-text-primary">{formatCurrency(financialData.revenue)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                    <span className="font-medium text-text-secondary">Harga Pokok Penjualan (COGS)</span>
                    <span className="font-semibold text-text-primary">({formatCurrency(financialData.cogs)})</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-lg border-b">
                    <span className="text-text-primary">Laba Kotor (Gross Profit)</span>
                    <span className="text-text-primary">{formatCurrency(financialData.grossProfit)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                    <span className="font-medium text-text-secondary">Beban Operasional</span>
                    <span className="font-semibold text-text-primary">({formatCurrency(financialData.operatingExpenses)})</span>
                </div>
                 <div className={`flex justify-between py-3 font-bold text-xl ${financialData.netProfit < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    <span>Laba Bersih (Net Profit)</span>
                    <span>{formatCurrency(financialData.netProfit)}</span>
                </div>
            </div>
            <div className="space-y-2">
                <StatCard title="Total Revenue" value={financialData.revenue} />
                <StatCard title="Total Expenses" value={financialData.cogs + financialData.operatingExpenses} isNegative />
            </div>
          </div>
          
          {/* Chart */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">Financial Summary</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(value as number)} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="value" />
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingPage;
