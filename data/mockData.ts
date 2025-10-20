
import { Product, Customer, Sale, Purchase, Expense, CashFlow, ProductSeries, ProductCondition, CustomerType, PaymentMethod, SaleStatus, ExpenseCategory, CashFlowType } from '../types';

export const mockProducts: Product[] = [
  { id: 'p1', product_code: 'HRN01', product_name: 'Hirono The Other One', series: ProductSeries.Hirono, condition: ProductCondition.New, purchase_price: 150000, selling_price: 250000, stock_quantity: 12 },
  { id: 'p2', product_code: 'KBO01', product_name: 'Kubo Walks of Life', series: ProductSeries.Kubo, condition: ProductCondition.New, purchase_price: 160000, selling_price: 260000, stock_quantity: 8 },
  { id: 'p3', product_code: 'CRY01', product_name: 'Crybaby Crying Parade', series: ProductSeries.Crybaby, condition: ProductCondition.PreOrder, purchase_price: 175000, selling_price: 280000, stock_quantity: 5 },
  { id: 'p4', product_code: 'TNY01', product_name: 'TinyTiny City Farmer', series: ProductSeries.TinyTiny, condition: ProductCondition.Second, purchase_price: 100000, selling_price: 180000, stock_quantity: 3 },
  { id: 'p5', product_code: 'HRN02', product_name: 'Hirono Little Mischief', series: ProductSeries.Hirono, condition: ProductCondition.New, purchase_price: 155000, selling_price: 255000, stock_quantity: 20 },
  { id: 'p6', product_code: 'CRY02', product_name: 'Crybaby Sad Club', series: ProductSeries.Crybaby, condition: ProductCondition.New, purchase_price: 180000, selling_price: 290000, stock_quantity: 2 },
];

export const mockCustomers: Customer[] = [
  { id: 'c1', customer_name: 'Andi Collector', phone: '081234567890', email: 'andi@mail.com', social_media: '@andicollects', customer_type: CustomerType.Collector },
  { id: 'c2', customer_name: 'Budi Reseller', phone: '081234567891', email: 'budi@mail.com', social_media: '@buditoys', customer_type: CustomerType.Reseller },
  { id: 'c3', customer_name: 'Citra Regular', phone: '081234567892', email: 'citra@mail.com', social_media: '@citra', customer_type: CustomerType.Regular },
];

const today = new Date();
const lastMonth = new Date();
lastMonth.setMonth(today.getMonth() - 1);

export const mockSales: Sale[] = [
  { id: 's1', sale_date: today.toISOString().split('T')[0], customer_id: 'c1', product_id: 'p1', quantity: 1, unit_price: 250000, payment_method: PaymentMethod.Transfer, status: SaleStatus.Paid },
  { id: 's2', sale_date: today.toISOString().split('T')[0], customer_id: 'c2', product_id: 'p5', quantity: 5, unit_price: 255000, payment_method: PaymentMethod.QRIS, status: SaleStatus.Paid },
  { id: 's3', sale_date: new Date(today.setDate(today.getDate() - 2)).toISOString().split('T')[0], customer_id: 'c3', product_id: 'p2', quantity: 1, unit_price: 260000, payment_method: PaymentMethod.Cash, status: SaleStatus.Pending },
  { id: 's4', sale_date: lastMonth.toISOString().split('T')[0], customer_id: 'c1', product_id: 'p3', quantity: 1, unit_price: 280000, payment_method: PaymentMethod.Transfer, status: SaleStatus.Paid },
  { id: 's5', sale_date: new Date(today.setDate(today.getDate() - 5)).toISOString().split('T')[0], customer_id: 'c2', product_id: 'p6', quantity: 2, unit_price: 290000, payment_method: PaymentMethod.QRIS, status: SaleStatus.Cancelled },
  { id: 's6', sale_date: lastMonth.toISOString().split('T')[0], customer_id: 'c1', product_id: 'p1', quantity: 2, unit_price: 250000, payment_method: PaymentMethod.Transfer, status: SaleStatus.Paid },
];

export const mockPurchases: Purchase[] = [
    { id: 'pu1', purchase_date: lastMonth.toISOString().split('T')[0], supplier_name: 'Distributor A', product_id: 'p1', quantity: 15, unit_cost: 150000, notes: 'Initial stock' },
    { id: 'pu2', purchase_date: lastMonth.toISOString().split('T')[0], supplier_name: 'Distributor B', product_id: 'p5', quantity: 25, unit_cost: 155000, notes: 'Restock Hirono' },
];

export const mockExpenses: Expense[] = [
    { id: 'e1', expense_date: new Date(today.setDate(today.getDate() - 1)).toISOString().split('T')[0], category: ExpenseCategory.Shipping, description: 'Kirim barang ke customer C1', amount: 25000 },
    { id: 'e2', expense_date: new Date(today.setDate(today.getDate() - 3)).toISOString().split('T')[0], category: ExpenseCategory.Packaging, description: 'Beli bubble wrap & box', amount: 150000 },
    { id: 'e3', expense_date: lastMonth.toISOString().split('T')[0], category: ExpenseCategory.Marketing, description: 'Iklan Instagram', amount: 300000 },
];

export const mockCashFlow: CashFlow[] = [
    ...mockSales.filter(s => s.status === SaleStatus.Paid).map((s, i) => ({ id: `cfi${i}`, date: s.sale_date, type: CashFlowType.Pemasukan, source: `Penjualan #${s.id}`, amount: s.quantity * s.unit_price })),
    ...mockPurchases.map((p, i) => ({ id: `cfo_p${i}`, date: p.purchase_date, type: CashFlowType.Pengeluaran, source: `Pembelian dari ${p.supplier_name}`, amount: p.quantity * p.unit_cost })),
    ...mockExpenses.map((e, i) => ({ id: `cfo_e${i}`, date: e.expense_date, type: CashFlowType.Pengeluaran, source: `${e.category}: ${e.description}`, amount: e.amount })),
].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
