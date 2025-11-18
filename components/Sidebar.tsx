import React from 'react';
import { View } from '../types';
import { DashboardIcon, ProductIcon, CustomerIcon, SalesIcon, PurchaseIcon, ExpenseIcon, CashFlowIcon, ReportIcon, CalculatorIcon } from './icons/Icons';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const navItems: { view: View; label: string; icon: React.FC<{ className?: string }> }[] = [
  { view: 'Dashboard', label: 'Dashboard', icon: DashboardIcon },
  { view: 'Products', label: 'Products (PopMart)', icon: ProductIcon },
  { view: 'Customers', label: 'Customers', icon: CustomerIcon },
  { view: 'Sales', label: 'Sales (Penjualan)', icon: SalesIcon },
  { view: 'Purchases', label: 'Purchases (Pembelian Stok)', icon: PurchaseIcon },
  { view: 'Expenses', label: 'Expenses (Pengeluaran)', icon: ExpenseIcon },
  { view: 'Cash Flow', label: 'Cash Flow', icon: CashFlowIcon },
  { view: 'Reports', label: 'Reports', icon: ReportIcon },
  { view: 'Accounting', label: 'Accounting', icon: CalculatorIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <div className="w-64 bg-surface h-screen p-4 flex flex-col fixed shadow-lg">
      <div className="flex items-center mb-10">
        <span className="text-2xl font-bold text-primary">PopMart ERP</span>
        <span className="text-2xl font-bold text-text-primary">SYSTEM</span>
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.view}>
              <button
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center p-3 my-1 rounded-lg text-left text-sm font-medium transition-colors duration-200 ${
                  currentView === item.view
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-secondary hover:bg-background hover:text-text-primary'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-2 text-center text-xs text-gray-400">
        <p>© 2024 PopMart ERP</p>
        <p>Made with ♡</p>
      </div>
    </div>
  );
};

export default Sidebar;