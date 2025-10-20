import React, { useState } from 'react';
import { Product, ProductSeries, ProductCondition } from '../../types';

interface ProductFormProps {
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSave, onCancel }) => {
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [series, setSeries] = useState<ProductSeries>(ProductSeries.Hirono);
  const [condition, setCondition] = useState<ProductCondition>(ProductCondition.New);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName) {
        alert('Product name is required');
        return;
    }
    const newProduct: Product = {
      id: `p${Date.now()}`,
      product_code: productCode,
      product_name: productName,
      series,
      condition,
      purchase_price: purchasePrice,
      selling_price: sellingPrice,
      stock_quantity: stock,
    };
    onSave(newProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary">Nama Figure *</label>
        <input type="text" value={productName} onChange={e => setProductName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-text-secondary">Kode Produk</label>
            <input type="text" value={productCode} onChange={e => setProductCode(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
        <div>
            <label className="block text-sm font-medium text-text-secondary">Series</label>
            <select value={series} onChange={e => setSeries(e.target.value as ProductSeries)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2">
                {Object.values(ProductSeries).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-text-secondary">Kondisi</label>
            <select value={condition} onChange={e => setCondition(e.target.value as ProductCondition)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2">
                {Object.values(ProductCondition).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-text-secondary">Stok</label>
            <input type="number" value={stock} onChange={e => setStock(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-text-secondary">Harga Beli</label>
            <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
        <div>
            <label className="block text-sm font-medium text-text-secondary">Harga Jual</label>
            <input type="number" value={sellingPrice} onChange={e => setSellingPrice(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Save Product</button>
      </div>
    </form>
  );
};

export default ProductForm;
