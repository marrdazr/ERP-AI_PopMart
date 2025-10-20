import React, { useState, useEffect } from 'react';

// Import types
import { View, Product, Customer, Sale, Purchase, Expense, CashFlow, CashFlowType, SaleStatus, CartItem, FeaturedProduct } from './types';

// Import mock data
import { mockProducts, mockCustomers, mockSales, mockPurchases, mockExpenses, mockCashFlow } from './data/mockData';

// Import Layout Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Import Page Components
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import CustomersPage from './pages/CustomersPage';
import SalesPage from './pages/SalesPage';
import PurchasesPage from './pages/PurchasesPage';
import ExpensesPage from './pages/ExpensesPage';
import CashFlowPage from './pages/CashFlowPage';
import ReportsPage from './pages/ReportsPage';

// Import Landing Page Components
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import FeaturedProducts from './components/landing/FeaturedProducts';
import About from './components/landing/About';
import Testimonials from './components/landing/Testimonials';
import Contact from './components/landing/Contact';
import Footer from './components/landing/Footer';
import LoginModal from './components/LoginModal';
import ShoppingCartModal from './components/ShoppingCartModal';


const App: React.FC = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Navigation state
  const [currentView, setCurrentView] = useState<View>('Dashboard');

  // Data state
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [cashFlows, setCashFlows] = useState<CashFlow[]>(mockCashFlow);
  
  // Recalculate cash flow whenever sales, purchases, or expenses change.
  useEffect(() => {
    const salesIncome = sales
      .filter(s => s.status === SaleStatus.Paid)
      .map(s => ({ 
        id: `cfi_${s.id}`, 
        date: s.sale_date, 
        type: CashFlowType.Pemasukan, 
        source: `Penjualan #${s.id}`, 
        amount: s.quantity * s.unit_price 
      }));
      
    const purchaseExpenses = purchases.map(p => ({ 
        id: `cfo_p_${p.id}`, 
        date: p.purchase_date, 
        type: CashFlowType.Pengeluaran, 
        source: `Pembelian dari ${p.supplier_name}`, 
        amount: p.quantity * p.unit_cost 
    }));
    
    const otherExpenses = expenses.map(e => ({ 
        id: `cfo_e_${e.id}`, 
        date: e.expense_date, 
        type: CashFlowType.Pengeluaran, 
        source: `${e.category}: ${e.description}`, 
        amount: e.amount 
    }));

    const allFlows = [...salesIncome, ...purchaseExpenses, ...otherExpenses]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setCashFlows(allFlows);
  }, [sales, purchases, expenses]);


  // Handlers
  const handleLogin = (password: string) => {
    if (password === 'popmartadmin') {
      setIsLoggedIn(true);
      setShowLogin(false);
    } else {
      throw new Error('Password salah. Coba lagi.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('Dashboard');
  };
  
  // Cart Handlers
  const handleAddToCart = (product: FeaturedProduct) => {
    setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id);
        if (existingItem) {
            return prevCart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        }
        return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
        handleRemoveFromCart(productId);
        return;
    }
    setCart(prevCart => prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
    ));
  };
  
  const handleRemoveFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleCheckout = (customerDetails: {name: string, email: string}) => {
    alert(`Terima kasih, ${customerDetails.name}! Pesanan Anda sedang diproses. Konfirmasi akan dikirim ke ${customerDetails.email}.`);
    setCart([]);
    setIsCartOpen(false);
  };

  // ERP Data Handlers
  const handleAddProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const handleAddCustomer = (customer: Customer) => {
    setCustomers(prev => [...prev, customer]);
  };

  const handleAddSale = (sale: Sale) => {
    setSales(prev => [...prev, sale]);
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        if (p.id === sale.product_id) {
          return { ...p, stock_quantity: p.stock_quantity - sale.quantity };
        }
        return p;
      });
    });
  };

  const handleAddPurchase = (purchase: Purchase) => {
    setPurchases(prev => [...prev, purchase]);
    setProducts(prevProducts => {
       return prevProducts.map(p => {
        if (p.id === purchase.product_id) {
          return { ...p, stock_quantity: p.stock_quantity + purchase.quantity };
        }
        return p;
      });
    });
  };

  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const renderView = () => {
    switch (currentView) {
      case 'Dashboard':
        return <DashboardPage sales={sales} products={products} customers={customers} expenses={expenses} />;
      case 'Products':
        return <ProductsPage products={products} onAddProduct={handleAddProduct} />;
      case 'Customers':
        return <CustomersPage customers={customers} onAddCustomer={handleAddCustomer} />;
      case 'Sales':
        return <SalesPage sales={sales} customers={customers} products={products} onAddSale={handleAddSale} />;
      case 'Purchases':
        return <PurchasesPage purchases={purchases} products={products} onAddPurchase={handleAddPurchase} />;
      case 'Expenses':
        return <ExpensesPage expenses={expenses} onAddExpense={handleAddExpense} />;
      case 'Cash Flow':
        return <CashFlowPage cashFlows={cashFlows} />;
      case 'Reports':
        return <ReportsPage sales={sales} products={products} customers={customers} />;
      default:
        return <DashboardPage sales={sales} products={products} customers={customers} expenses={expenses} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Navbar 
            onLoginClick={() => setShowLogin(true)} 
            onCartClick={() => setIsCartOpen(true)}
            cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
        <main>
          <Hero />
          <FeaturedProducts onAddToCart={handleAddToCart} />
          <About />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        {showLogin && <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
        <ShoppingCartModal 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onCheckout={handleCheckout}
        />
      </>
    );
  }

  return (
    <div className="flex bg-background min-h-screen font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 ml-64">
        <Header title={currentView} onLogout={handleLogout} />
        <main>{renderView()}</main>
      </div>
    </div>
  );
};

export default App;