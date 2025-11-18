
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Sale, Product, Customer, Expense, ProductSeries } from '../types';
import DashboardCard from '../components/DashboardCard';

interface DashboardPageProps {
  sales: Sale[];
  products: Product[];
  customers: Customer[];
  expenses: Expense[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const SalesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const ProfitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const StockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
const BestSellerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.232 5.232 3.536 3.536m-2.036-5.036a2.5 2.5 0 1 1 3.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>;


const DashboardPage: React.FC<DashboardPageProps> = ({ sales, products, customers, expenses }) => {

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlySales = sales.filter(s => {
    const saleDate = new Date(s.sale_date);
    return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear && s.status === 'Paid';
  });

  const monthlyRevenue = monthlySales.reduce((acc, sale) => acc + (sale.quantity * sale.unit_price), 0);
  
  const monthlyProfit = monthlySales.reduce((acc, sale) => {
    const product = products.find(p => p.id === sale.product_id);
    if (!product) return acc;
    const cost = product.purchase_price * sale.quantity;
    const revenue = sale.quantity * sale.unit_price;
    return acc + (revenue - cost);
  }, 0);

  const totalStock = products.reduce((acc, p) => acc + p.stock_quantity, 0);

  const seriesSales = sales.reduce((acc, sale) => {
    const product = products.find(p => p.id === sale.product_id);
    if (product) {
      acc[product.series] = (acc[product.series] || 0) + sale.quantity;
    }
    return acc;
  }, {} as Record<ProductSeries, number>);

  // FIX: Explicitly cast sorting values to numbers to prevent type errors during arithmetic operations.
  const bestSellingSeries = Object.entries(seriesSales).sort((a, b) => Number(b[1]) - Number(a[1]))[0]?.[0] || 'N/A';

  const salesDataForChart = sales
    .filter(s => s.status === 'Paid')
    .reduce((acc, sale) => {
        const date = new Date(sale.sale_date).toLocaleDateString('en-CA');
        const existing = acc.find(item => item.date === date);
        const saleTotal = sale.quantity * sale.unit_price;
        if (existing) {
            existing.sales += saleTotal;
        } else {
            acc.push({ date, sales: saleTotal });
        }
        return acc;
    }, [] as { date: string; sales: number; }[])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const lowStockProducts = products.filter(p => p.stock_quantity < 5);
  const recentSales = [...sales].sort((a, b) => new Date(b.sale_date).getTime() - new Date(a.sale_date).getTime()).slice(0, 5);
  const recentExpenses = [...expenses].sort((a, b) => new Date(b.expense_date).getTime() - new Date(a.expense_date).getTime()).slice(0, 5);
  
  const totalCustomers = customers.length;
  const totalProducts = products.length;
  const pendingOrders = sales.filter(s => s.status === 'Pending').length;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Monthly Revenue" value={formatCurrency(monthlyRevenue)} icon={<SalesIcon />} color="#FF6B9D" />
        <DashboardCard title="Monthly Profit" value={formatCurrency(monthlyProfit)} icon={<ProfitIcon />} color="#875A7B" />
        <DashboardCard title="Total Stok Available" value={totalStock} icon={<StockIcon />} color="#6AAB9C" />
        <DashboardCard title="Best Selling Series" value={bestSellingSeries} icon={<BestSellerIcon />} color="#F6AE2D" />
      </div>

       <div className="bg-surface rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Grafik Penjualan</h3>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesDataForChart} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" stroke="#6B6B6B" />
                <YAxis stroke="#6B6B6B" tickFormatter={(value) => new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(value as number)} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#FF6B9D" strokeWidth={2} dot={{ r: 4, fill: '#FF6B9D' }} activeDot={{ r: 6 }} />
            </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface rounded-xl shadow-md p-6 col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-text-secondary mb-2">Latest Sales</h4>
                    <ul className="space-y-2">
                        {recentSales.map(s => {
                             const product = products.find(p => p.id === s.product_id);
                             const customer = customers.find(c => c.id === s.customer_id);
                            return <li key={s.id} className="text-sm p-2 bg-background rounded-md">{customer?.customer_name} bought {s.quantity}x {product?.product_name}</li>
                        })}
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-text-secondary mb-2">Recent Expenses</h4>
                    <ul className="space-y-2">
                        {recentExpenses.map(e => (
                           <li key={e.id} className="text-sm p-2 bg-background rounded-md flex justify-between"><span>{e.description}</span> <strong>{formatCurrency(e.amount)}</strong></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        <div className="bg-surface rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Stats & Alerts</h3>
            <div className="space-y-4">
                 <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">Total Customers</span>
                    <span className="text-lg font-bold text-blue-900">{totalCustomers}</span>
                </div>
                 <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-green-800">Total Products</span>
                    <span className="text-lg font-bold text-green-900">{totalProducts}</span>
                </div>
                <div className="flex justify-between items-center bg-yellow-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-yellow-800">Pending Orders</span>
                    <span className="text-lg font-bold text-yellow-900">{pendingOrders}</span>
                </div>
                <div>
                    <h4 className="font-semibold text-red-600 mt-4 mb-2">Low Stock Alerts</h4>
                    <ul className="space-y-1">
                        {lowStockProducts.map(p => (
                            <li key={p.id} className="text-sm text-red-700 flex justify-between">
                                <span>{p.product_name}</span> 
                                <span className="font-bold">{p.stock_quantity} left</span>
                            </li>
                        ))}
                         {lowStockProducts.length === 0 && <p className="text-sm text-gray-500">No low stock items.</p>}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;