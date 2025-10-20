import React, { useState } from 'react';
import { Expense } from '../types';
import { DataTable, Column } from './DataTable';
import Modal from '../components/Modal';
import ExpenseForm from '../components/forms/ExpenseForm';

interface ExpensesPageProps {
  expenses: Expense[];
  onAddExpense: (expense: Expense) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const ExpensesPage: React.FC<ExpensesPageProps> = ({ expenses, onAddExpense }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: Column<Expense>[] = [
    { accessor: 'expense_date', header: 'Tanggal' },
    { accessor: 'category', header: 'Kategori' },
    { accessor: 'description', header: 'Deskripsi' },
    { accessor: 'amount', header: 'Jumlah', render: (item: Expense) => formatCurrency(item.amount) },
    { accessor: 'receipt', header: 'Bukti', render: (item: Expense) => item.receipt ? <a href="#" className="text-primary hover:underline">{item.receipt}</a> : 'N/A' },
  ];

  const handleSaveExpense = (expense: Expense) => {
    onAddExpense(expense);
    setIsModalOpen(false);
  };

  return (
    <>
      <DataTable 
        columns={columns} 
        data={expenses} 
        title="Pengeluaran Lain" 
        onAddNew={() => setIsModalOpen(true)}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Expense"
      >
          <ExpenseForm onSave={handleSaveExpense} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default ExpensesPage;
