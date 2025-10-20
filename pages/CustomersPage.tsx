import React, { useState } from 'react';
import { Customer } from '../types';
import { DataTable, Column } from './DataTable';
import Modal from '../components/Modal';
import CustomerForm from '../components/forms/CustomerForm';

interface CustomersPageProps {
  customers: Customer[];
  onAddCustomer: (customer: Customer) => void;
}

const CustomersPage: React.FC<CustomersPageProps> = ({ customers, onAddCustomer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: Column<Customer>[] = [
    { accessor: 'customer_name', header: 'Nama Customer' },
    { accessor: 'phone', header: 'No. HP' },
    { accessor: 'email', header: 'Email' },
    { accessor: 'social_media', header: 'IG/Username' },
    { accessor: 'customer_type', header: 'Tipe Customer' },
  ];

  const handleSaveCustomer = (customer: Customer) => {
    onAddCustomer(customer);
    setIsModalOpen(false);
  };

  return (
    <>
      <DataTable 
        columns={columns} 
        data={customers} 
        title="Pelanggan" 
        onAddNew={() => setIsModalOpen(true)}
      />
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Customer"
      >
        <CustomerForm onSave={handleSaveCustomer} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default CustomersPage;
