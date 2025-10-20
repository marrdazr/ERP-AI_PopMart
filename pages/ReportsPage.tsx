import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sale, Product, Customer, ProductSeries, CustomerType } from '../types';

interface ReportsPageProps {
  sales: Sale[];
  products: Product[];
  customers: Customer[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const COLORS = ['#FF6B9D', '#875A7B', '#6AAB9C', '#F6AE2D', '#F26D6D'];

const ReportsPage: React.FC<ReportsPageProps> = ({ sales, products, customers }) => {

  const profitPerSeries = sales
    .filter(s => s.status === 'Paid')
    .reduce((acc, sale) => {
      const product = products.find(p => p.id === sale.product_id);
      if (!product) return acc;

      const profit = (sale.unit_price - product.purchase_price) * sale.quantity;
      if (!acc[product.series]) {
        acc[product.series] = { name: product.series, profit: 0 };
      }
      acc[product.series].profit += profit;
      return acc;
    }, {} as Record<ProductSeries, { name: string, profit: number }>);
  
  const profitPerSeriesData = Object.values(profitPerSeries);

  const salesPerCustomerType = sales
    .filter(s => s.status === 'Paid')
    .reduce((acc, sale) => {
      const customer = customers.find(c => c.id === sale.customer_id);
      if (!customer) return acc;

      const saleAmount = sale.quantity * sale.unit_price;
       if (!acc[customer.customer_type]) {
        acc[customer.customer_type] = { name: customer.customer_type, value: 0 };
      }
      acc[customer.customer_type].value += saleAmount;
      return acc;
    }, {} as Record<CustomerType, { name: string, value: number }>);
    
  const salesPerCustomerTypeData = Object.values(salesPerCustomerType);
  
  const stockValueData = products.map(p => ({
    name: p.product_name,
    value: p.purchase_price * p.stock_quantity
  }));

  const totalStockValue = stockValueData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Profit per Series</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={profitPerSeriesData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(value as number)} />
                    <YAxis type="category" dataKey="name" width={80} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="profit" fill="#FF6B9D" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="bg-surface rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Sales per Customer Type</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    {/* FIX: The `percent` prop from recharts can be undefined or not a number. Coercing to a number prevents a potential TypeError. */}
                    <Pie data={salesPerCustomerTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${((Number(percent) || 0) * 100).toFixed(0)}%`}>
                        {salesPerCustomerTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-surface rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Stock Value Report</h3>
          <p className="text-xl font-bold text-primary">{formatCurrency(totalStockValue)}</p>
        </div>
        <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm text-left text-text-secondary">
              <thead className="text-xs text-text-primary uppercase bg-background sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-3">Product Name</th>
                  <th scope="col" className="px-6 py-3 text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {stockValueData.sort((a,b)=> b.value - a.value).map((item, index) => (
                  <tr key={index} className="bg-surface border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4 text-right">{formatCurrency(item.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;