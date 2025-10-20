import React, { useState, useEffect } from 'react';
import { Purchase, Product } from '../../types';

interface PurchaseFormProps {
  onSave: (purchase: Purchase) => void;
  onCancel: () => void;
  products: Product[];
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ onSave, onCancel, products }) => {
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
    const [supplierName, setSupplierName] = useState('');
    const [productId, setProductId] = useState(products[0]?.id || '');
    const [quantity, setQuantity] = useState(1);
    const [unitCost, setUnitCost] = useState(0);
    const [notes, setNotes] = useState('');

  useEffect(() => {
    const selectedProduct = products.find(p => p.id === productId);
    if (selectedProduct) {
      setUnitCost(selectedProduct.purchase_price);
    }
  }, [productId, products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) {
        alert('Product is required');
        return;
    }
    const newPurchase: Purchase = {
        id: `pu${Date.now()}`,
        purchase_date: purchaseDate,
        supplier_name: supplierName,
        product_id: productId,
        quantity,
        unit_cost: unitCost,
        notes
    };
    onSave(newPurchase);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-text-secondary">Tanggal Beli</label>
            <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
        <div>
            <label className="block text-sm font-medium text-text-secondary">Nama Supplier</label>
            <input type="text" value={supplierName} onChange={e => setSupplierName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
      </div>
       <div>
        <label className="block text-sm font-medium text-text-secondary">Produk *</label>
        <select value={productId} onChange={e => setProductId(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2">
            <option value="">Select Product</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.product_name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-text-secondary">Jumlah Beli</label>
            <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
        <div>
            <label className="block text-sm font-medium text-text-secondary">Harga Beli per Unit</label>
            <input type="number" value={unitCost} onChange={e => setUnitCost(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-secondary">Keterangan</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
      </div>
       <div className="text-right font-bold text-lg text-text-primary">
          Total: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(quantity * unitCost)}
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Save Purchase</button>
      </div>
    </form>
  );
};

export default PurchaseForm;
