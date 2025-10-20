import React, { useState } from 'react';
import { Product } from '../types';
import { DataTable, Column } from './DataTable';
import Modal from '../components/Modal';
import ProductForm from '../components/forms/ProductForm';

interface ProductsPageProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const ProductsPage: React.FC<ProductsPageProps> = ({ products, onAddProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: Column<Product>[] = [
    { accessor: 'product_code', header: 'Kode Produk' },
    { accessor: 'product_name', header: 'Nama Figure' },
    { accessor: 'series', header: 'Series' },
    { accessor: 'condition', header: 'Kondisi' },
    { accessor: 'purchase_price', header: 'Harga Beli', render: (item: Product) => formatCurrency(item.purchase_price) },
    { accessor: 'selling_price', header: 'Harga Jual', render: (item: Product) => formatCurrency(item.selling_price) },
    { accessor: 'stock_quantity', header: 'Stok' },
  ];

  const handleSaveProduct = (product: Product) => {
    onAddProduct(product);
    setIsModalOpen(false);
  };

  return (
    <>
      <DataTable 
        columns={columns} 
        data={products} 
        title="Koleksi PopMart" 
        onAddNew={() => setIsModalOpen(true)}
      />
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Product"
      >
        <ProductForm onSave={handleSaveProduct} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default ProductsPage;
