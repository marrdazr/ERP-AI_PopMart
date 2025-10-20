import React, { useState } from 'react';
import { Customer, CustomerType } from '../../types';

interface CustomerFormProps {
  onSave: (customer: Customer) => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSave, onCancel }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [customerType, setCustomerType] = useState<CustomerType>(CustomerType.Regular);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) {
        alert('Customer name is required');
        return;
    }
    const newCustomer: Customer = {
      id: `c${Date.now()}`,
      customer_name: customerName,
      phone,
      email,
      social_media: socialMedia,
      customer_type: customerType,
    };
    onSave(newCustomer);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary">Nama Customer *</label>
        <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-text-secondary">No. HP</label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
        <div>
            <label className="block text-sm font-medium text-text-secondary">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-text-secondary">IG/Username</label>
            <input type="text" value={socialMedia} onChange={e => setSocialMedia(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
        <div>
            <label className="block text-sm font-medium text-text-secondary">Tipe Customer</label>
            <select value={customerType} onChange={e => setCustomerType(e.target.value as CustomerType)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2">
                {Object.values(CustomerType).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Save Customer</button>
      </div>
    </form>
  );
};

export default CustomerForm;
