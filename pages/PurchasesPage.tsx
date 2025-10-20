import React, { useState } from 'react';
import { Purchase, Product } from '../types';
import { DataTable, Column } from './DataTable';
import Modal from '../components/Modal';
import PurchaseForm from '../components/forms/PurchaseForm';

interface PurchasesPageProps {
  purchases: Purchase[];
  products: Product[];
  onAddPurchase: (purchase: Purchase) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const PurchasesPage: React.FC<PurchasesPageProps> = ({ purchases, products, onAddPurchase }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const augmentedData = purchases.map(p => ({
    ...p,
    total_cost: p.quantity * p.unit_cost,
  }));

  const columns: Column<(typeof augmentedData)[0]>[] = [
    { accessor: 'purchase_date', header: 'Tanggal Beli' },
    { accessor: 'supplier_name', header: 'Nama Supplier' },
    { accessor: 'product_id', header: 'Produk', render: (item: Purchase) => products.find(p => p.id === item.product_id)?.product_name || 'N/A' },
    { accessor: 'quantity', header: 'Jumlah Beli' },
    { accessor: 'unit_cost', header: 'Harga Beli per Unit', render: (item: Purchase) => formatCurrency(item.unit_cost) },
    { accessor: 'total_cost', header: 'Total Biaya', render: (item) => formatCurrency(item.total_cost) },
    { accessor: 'notes', header: 'Keterangan' },
  ];
  
  const handleSavePurchase = (purchase: Purchase) => {
    onAddPurchase(purchase);
    setIsModalOpen(false);
  };

  return (
    <>
      <DataTable 
        columns={columns} 
        data={augmentedData} 
        title="Pembelian Stok"
        onAddNew={() => setIsModalOpen(true)} 
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Purchase"
      >
        <PurchaseForm
            onSave={handleSavePurchase}
            onCancel={() => setIsModalOpen(false)}
            products={products}
        />
      </Modal>
    </>
    );
};

export default PurchasesPage;
