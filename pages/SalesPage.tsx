import React, { useState } from 'react';
import { Sale, Customer, Product } from '../types';
import { DataTable, Column } from './DataTable';
import Modal from '../components/Modal';
import SaleForm from '../components/forms/SaleForm';

interface SalesPageProps {
  sales: Sale[];
  customers: Customer[];
  products: Product[];
  onAddSale: (sale: Sale) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const SalesPage: React.FC<SalesPageProps> = ({ sales, customers, products, onAddSale }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
        case 'Paid': return <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{status}</span>;
        case 'Pending': return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{status}</span>;
        case 'Cancelled': return <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{status}</span>;
        default: return <span>{status}</span>;
    }
  };
  
  const augmentedData = sales.map(s => ({
    ...s,
    total_amount: s.quantity * s.unit_price,
  }));

  const columns: Column<(typeof augmentedData)[0]>[] = [
    { accessor: 'sale_date', header: 'Tanggal Jual' },
    { accessor: 'customer_id', header: 'Customer', render: (item: Sale) => customers.find(c => c.id === item.customer_id)?.customer_name || 'N/A' },
    { accessor: 'product_id', header: 'Produk', render: (item: Sale) => products.find(p => p.id === item.product_id)?.product_name || 'N/A' },
    { accessor: 'quantity', header: 'Jumlah' },
    { accessor: 'unit_price', header: 'Harga Satuan', render: (item: Sale) => formatCurrency(item.unit_price) },
    { accessor: 'total_amount', header: 'Total', render: (item) => formatCurrency(item.total_amount) },
    { accessor: 'payment_method', header: 'Cara Bayar' },
    { accessor: 'status', header: 'Status', render: (item: Sale) => getStatusBadge(item.status) },
  ];

  const handleSaveSale = (sale: Sale) => {
    onAddSale(sale);
    setIsModalOpen(false);
  };

  return (
    <>
      <DataTable 
        columns={columns} 
        data={augmentedData} 
        title="Penjualan"
        onAddNew={() => setIsModalOpen(true)}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Sale"
      >
        <SaleForm 
            onSave={handleSaveSale} 
            onCancel={() => setIsModalOpen(false)}
            products={products}
            customers={customers}
        />
      </Modal>
    </>
  );
};

export default SalesPage;
