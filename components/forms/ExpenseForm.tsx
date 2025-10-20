import React, { useState } from 'react';
import { Expense, ExpenseCategory } from '../../types';

interface ExpenseFormProps {
  onSave: (expense: Expense) => void;
  onCancel: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSave, onCancel }) => {
    const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.Other);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || amount <= 0) {
        alert('Description and a valid amount are required');
        return;
    }
    const newExpense: Expense = {
        id: `e${Date.now()}`,
        expense_date: expenseDate,
        category,
        description,
        amount
    };
    onSave(newExpense);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-text-secondary">Tanggal</label>
            <input type="date" value={expenseDate} onChange={e => setExpenseDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
        <div>
            <label className="block text-sm font-medium text-text-secondary">Kategori</label>
            <select value={category} onChange={e => setCategory(e.target.value as ExpenseCategory)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2">
                {Object.values(ExpenseCategory).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
      </div>
       <div>
            <label className="block text-sm font-medium text-text-secondary">Deskripsi *</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
      </div>
       <div>
            <label className="block text-sm font-medium text-text-secondary">Jumlah *</label>
            <input type="number" min="0" value={amount} onChange={e => setAmount(Number(e.target.value))} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
      </div>
       <div>
            <label className="block text-sm font-medium text-text-secondary">Bukti (Optional)</label>
            <input type="file" className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-primary hover:file:bg-pink-100" />
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Save Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
