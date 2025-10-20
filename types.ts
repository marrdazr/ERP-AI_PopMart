export interface FeaturedProduct {
  id: string;
  name: string;
  series: string;
  imageUrl: string;
  price: number;
}

export interface CartItem extends FeaturedProduct {
    quantity: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export type View = 'Dashboard' | 'Products' | 'Customers' | 'Sales' | 'Purchases' | 'Expenses' | 'Cash Flow' | 'Reports';

export enum ProductSeries {
    Hirono = 'Hirono',
    Kubo = 'Kubo',
    Crybaby = 'Crybaby',
    TinyTiny = 'TinyTiny',
    Labubu = 'Labubu',
}

export enum ProductCondition {
    New = 'New',
    PreOrder = 'PreOrder',
    Second = 'Second',
}

export interface Product {
    id: string;
    product_code: string;
    product_name: string;
    series: ProductSeries;
    condition: ProductCondition;
    purchase_price: number;
    selling_price: number;
    stock_quantity: number;
}

export enum CustomerType {
    Collector = 'Collector',
    Reseller = 'Reseller',
    Regular = 'Regular',
}

export interface Customer {
    id: string;
    customer_name: string;
    phone: string;
    email: string;
    social_media: string;
    customer_type: CustomerType;
}

export enum PaymentMethod {
    Transfer = 'Transfer',
    QRIS = 'QRIS',
    Cash = 'Cash',
}

export enum SaleStatus {
    Paid = 'Paid',
    Pending = 'Pending',
    Cancelled = 'Cancelled',
}

export interface Sale {
    id: string;
    sale_date: string;
    customer_id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    payment_method: PaymentMethod;
    status: SaleStatus;
}

export interface Purchase {
    id: string;
    purchase_date: string;
    supplier_name: string;
    product_id: string;
    quantity: number;
    unit_cost: number;
    notes?: string;
}

export enum ExpenseCategory {
    Shipping = 'Shipping',
    Packaging = 'Packaging',
    Marketing = 'Marketing',
    Other = 'Other',
}

export interface Expense {
    id: string;
    expense_date: string;
    category: ExpenseCategory;
    description: string;
    amount: number;
    receipt?: string;
}

export enum CashFlowType {
    Pemasukan = 'Pemasukan',
    Pengeluaran = 'Pengeluaran',
}

export interface CashFlow {
    id: string;
    date: string;
    type: CashFlowType;
    source: string;
    amount: number;
    balance?: number;
}