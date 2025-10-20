import React, { useState, useEffect } from 'react';
import { Sale, PaymentMethod, SaleStatus, Product, Customer } from '../../types';

interface SaleFormProps {
  onSave: (sale: Sale) => void;
  onCancel: () => void;
  products: Product[];
  customers: Customer[];
}

const SaleForm: React.FC<SaleFormProps> = ({ onSave, onCancel, products, customers }) => {
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split('T')[0]);
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [productId, setProductId] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.Transfer);
  const [status, setStatus] = useState<SaleStatus>(SaleStatus.Pending);

  useEffect(() => {
    const selectedProduct = products.find(p => p.id === productId);
    if (selectedProduct) {
      setUnitPrice(selectedProduct.selling_price);
    }
  }, [productId, products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || !productId) {
        alert('Customer and Product are required');
        return;
    }
    const newSale: Sale = {
      id: `s${Date.now()}`,
      sale_date: saleDate,
      customer_id: customerId,
      product_id: productId,
      quantity,
      unit_price: unitPrice,
      payment_method: paymentMethod,
      status,
    };
    onSave(newSale);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-text-secondary">Tanggal Jual *</label>
            <input type="date" value={saleDate} onChange={e => setSaleDate(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
        <div>
            <label className="block text-sm font-medium text-text-secondary">Customer *</label>
            <select value={customerId} onChange={e => setCustomerId(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2">
                <option value="">Select Customer</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.customer_name}</option>)}
            </select>
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
            <label className="block text-sm font-medium text-text-secondary">Jumlah</label>
            <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
        <div>
            <label className="block text-sm font-medium text-text-secondary">Harga Satuan</label>
            <input type="number" value={unitPrice} onChange={e => setUnitPrice(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-text-secondary">Cara Bayar</label>
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value as PaymentMethod)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2">
                {Object.values(PaymentMethod).map(pm => <option key={pm} value={pm}>{pm}</option>)}
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-text-secondary">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as SaleStatus)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2">
                {Object.values(SaleStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </div>
      </div>
      <div className="text-right font-bold text-lg text-text-primary">
          Total: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(quantity * unitPrice)}
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Save Sale</button>
      </div>
    </form>
  );
};

export default SaleForm;
