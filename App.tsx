
import React, { useState, useMemo, useEffect } from 'react';
import { TableType, MenuItem, TableStatus, OrderItem, Sale } from './types';
import { generateInitialTables, MENU_ITEMS as INITIAL_MENU_ITEMS } from './constants';
import TableGrid from './components/TableGrid';
import OrderModal from './components/OrderModal';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/AdminPanel';
import { CoffeeIcon, UserIcon } from './components/icons';

function App() {
  // Menu State (Stock is kept here)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('cafe_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });
  
  // Persist menu to localStorage
  useEffect(() => {
    localStorage.setItem('cafe_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  // Table State
  const [tables, setTables] = useState<TableType[]>(generateInitialTables());
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  // Sales History State
  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem('cafe_sales');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist sales to localStorage
  useEffect(() => {
    localStorage.setItem('cafe_sales', JSON.stringify(sales));
  }, [sales]);

  // Auth & UI State
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // --- Table Logic ---
  const handleSelectTable = (id: number) => {
    setSelectedTableId(id);
  };

  const handleCloseModal = () => {
    setSelectedTableId(null);
  };

  const handleAddItem = (tableId: number, item: MenuItem) => {
    // Check stock first
    if (item.stock <= 0) return;

    // Decrease stock in menu
    setMenuItems(prev => prev.map(m => m.id === item.id ? { ...m, stock: m.stock - 1 } : m));

    setTables(prevTables =>
      prevTables.map(table => {
        if (table.id === tableId) {
          const newOrderItem: OrderItem = {
            ...item,
            orderId: `${item.id}-${Date.now()}` // Unique ID for each added item
          };
          return {
            ...table,
            status: TableStatus.Occupied,
            orders: [...table.orders, newOrderItem],
            total: table.total + item.price,
          };
        }
        return table;
      })
    );
  };

  const handleRemoveItem = (tableId: number, orderId: string) => {
    setTables(prevTables => 
      prevTables.map(table => {
        if (table.id === tableId) {
            const itemToRemove = table.orders.find(order => order.orderId === orderId);
            if (!itemToRemove) return table;

            // Return stock to menu
            setMenuItems(prev => prev.map(m => m.id === itemToRemove.id ? { ...m, stock: m.stock + 1 } : m));

            const newOrders = table.orders.filter(order => order.orderId !== orderId);
            const newTotal = table.total - itemToRemove.price;
            
            return {
                ...table,
                orders: newOrders,
                total: newTotal,
                status: newOrders.length > 0 ? TableStatus.Occupied : TableStatus.Vacant,
            };
        }
        return table;
      })
    );
  };
  
  const handlePayBill = (tableId: number, method: 'Nakit' | 'Kredi Kartı') => {
    setTables(prevTables =>
      prevTables.map(table => {
        if (table.id === tableId) {
          // Record sale before resetting table
          if (table.total > 0) {
            const newSale: Sale = {
              id: Date.now().toString(),
              amount: table.total,
              timestamp: Date.now(),
              paymentMethod: method,
            };
            setSales(prev => [...prev, newSale]);
          }

          return {
            ...table,
            status: TableStatus.Vacant,
            orders: [],
            total: 0,
          };
        }
        return table;
      })
    );
    handleCloseModal();
  };

  const selectedTable = useMemo(() => {
    if (selectedTableId === null) return null;
    return tables.find(t => t.id === selectedTableId) || null;
  }, [selectedTableId, tables]);


  // --- Admin Logic ---
  const handleUserIconClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminPanelOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsLoginOpen(false);
    setIsAdminPanelOpen(true);
  };

  const handleAddMenuItem = (item: MenuItem) => {
    setMenuItems(prev => [...prev, item]);
  };

  const handleRemoveMenuItem = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdatePrice = (id: number, newPrice: number) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, price: newPrice } : item
    ));
  };

  const handleUpdateStock = (id: number, newStock: number) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, stock: newStock } : item
    ));
  };

  return (
    <div className="wood-texture min-h-screen text-amber-100 font-nunito">
      <header className="bg-amber-950 text-white shadow-xl sticky top-0 z-40 border-b border-amber-900/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CoffeeIcon className="w-8 h-8 text-amber-500" />
            <h1 className="text-2xl font-bold tracking-wider text-amber-50 text-shadow-sm">Cafe Adisyon</h1>
          </div>
          <button 
            onClick={handleUserIconClick}
            className="p-3 rounded-full hover:bg-amber-900 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-900/30"
            title="Yönetici Paneli"
          >
            <UserIcon className={`w-9 h-9 ${isAdminLoggedIn ? 'text-amber-500' : 'text-amber-100'}`} />
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <TableGrid tables={tables} onSelectTable={handleSelectTable} />
      </main>

      {/* Order Modal */}
      {selectedTable && (
        <OrderModal
          table={selectedTable}
          menuItems={menuItems}
          onClose={handleCloseModal}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onPayBill={handlePayBill}
        />
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <LoginModal 
          onClose={() => setIsLoginOpen(false)} 
          onLogin={handleLoginSuccess} 
        />
      )}

      {/* Admin Panel */}
      {isAdminPanelOpen && (
        <AdminPanel
          menuItems={menuItems}
          sales={sales}
          onClose={() => setIsAdminPanelOpen(false)}
          onAdd={handleAddMenuItem}
          onRemove={handleRemoveMenuItem}
          onUpdatePrice={handleUpdatePrice}
          onUpdateStock={handleUpdateStock}
        />
      )}
    </div>
  );
}

export default App;
