
import React, { useState } from 'react';
import { TableType, MenuItem, OrderItem } from '../types';
import { CloseIcon, TrashIcon } from './icons';

interface OrderModalProps {
  table: TableType;
  menuItems: MenuItem[];
  onClose: () => void;
  onAddItem: (tableId: number, item: MenuItem) => void;
  onRemoveItem: (tableId: number, orderId: string) => void;
  onPayBill: (tableId: number, method: 'Nakit' | 'Kredi Kartı') => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ table, menuItems, onClose, onAddItem, onRemoveItem, onPayBill }) => {
  const [selectedMethod, setSelectedMethod] = useState<'Nakit' | 'Kredi Kartı' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const groupedMenu = menuItems.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const handleFinalizeBill = () => {
    if (!selectedMethod) {
      setError('Ödeme biçimini seç!');
      return;
    }
    onPayBill(table.id, selectedMethod);
  };
  
  return (
    <div className="fixed inset-0 bg-stone-900/80 backdrop-blur-md flex justify-center items-center z-50 p-2 md:p-6 animate-fade-in">
      <div className="bg-[#fcfaf7] rounded-[2.5rem] shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col overflow-hidden border border-stone-200">
        
        {/* Modern Header */}
        <header className="px-8 py-6 bg-[#2a1a15] text-white flex justify-between items-center relative">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-900/40 rotate-3">
              <span className="text-2xl font-black text-white">#</span>
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">MASA {table.id}</h2>
              <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">Sipariş & Adisyon Yönetimi</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all group active:scale-90"
          >
            <CloseIcon className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>
          
          {/* Decorative element */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        </header>
        
        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          
          {/* Menu Section - Card Based Design */}
          <div className="flex-grow p-6 overflow-y-auto scroll-smooth">
            <div className="max-w-4xl mx-auto space-y-10">
              {Object.keys(groupedMenu).map((category) => (
                <section key={category}>
                  <div className="flex items-center gap-4 mb-6">
                    <h4 className="text-lg font-black text-[#2a1a15] uppercase tracking-tighter bg-amber-100 px-4 py-1 rounded-full border border-amber-200">
                      {category}
                    </h4>
                    <div className="flex-grow h-px bg-stone-200"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {groupedMenu[category].map(item => {
                      const isOutOfStock = item.stock <= 0;
                      return (
                        <button
                          key={item.id}
                          disabled={isOutOfStock}
                          onClick={() => {
                             onAddItem(table.id, item);
                             setError(null);
                          }}
                          className={`group relative flex flex-col p-5 rounded-3xl transition-all duration-300 border-2 ${
                            isOutOfStock 
                            ? 'bg-stone-100 border-stone-200 opacity-60 cursor-not-allowed' 
                            : 'bg-white border-white hover:border-amber-500 hover:shadow-xl hover:-translate-y-1 shadow-sm'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-xs font-black px-2 py-1 rounded-lg ${isOutOfStock ? 'bg-red-100 text-red-600' : 'bg-stone-100 text-stone-500 group-hover:bg-amber-100 group-hover:text-amber-700'}`}>
                              {isOutOfStock ? 'STOK YOK' : `STOK: ${item.stock}`}
                            </span>
                            <span className="font-black text-amber-700 text-lg">
                              {item.price.toFixed(0)}<span className="text-xs ml-0.5">TL</span>
                            </span>
                          </div>
                          
                          <h5 className={`text-lg font-bold text-left leading-tight ${isOutOfStock ? 'text-stone-400' : 'text-[#2a1a15]'}`}>
                            {item.name}
                          </h5>
                          
                          {/* Hover effect indicator */}
                          {!isOutOfStock && (
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                               <div className="bg-amber-500 text-white rounded-full p-1.5 shadow-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                  </svg>
                               </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
          
          {/* Order Detail Section - POS Screen Style */}
          <aside className="w-full lg:w-[420px] bg-white border-l border-stone-200 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
            <div className="p-6 border-b border-stone-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#2a1a15]">SİPARİŞ ÖZETİ</h3>
                <span className="bg-stone-900 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
                  {table.orders.length} ÜRÜN
                </span>
              </div>
            </div>

            {/* Receipt Area */}
            <div className="flex-grow overflow-y-auto px-6 py-4 space-y-3 bg-[#fcfaf7]/50">
              {table.orders.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30">
                  <div className="w-20 h-20 border-4 border-dashed border-stone-400 rounded-full flex items-center justify-center mb-4">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                     </svg>
                  </div>
                  <p className="font-bold text-stone-500 italic">Henüz ürün seçilmedi</p>
                </div>
              ) : (
                table.orders.map((order: OrderItem) => (
                  <div key={order.orderId} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-stone-100 shadow-sm animate-slide-in">
                    <div className="flex-grow">
                      <p className="font-black text-[#2a1a15] text-sm uppercase">{order.name}</p>
                      <p className="text-amber-700 text-xs font-bold">{order.price.toFixed(2)} TL</p>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(table.id, order.orderId)} 
                      className="ml-2 w-10 h-10 flex items-center justify-center rounded-xl text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                       <TrashIcon className="w-5 h-5"/>
                    </button>
                  </div>
                ))
              )}
            </div>
            
            {/* Footer Area with Payment and Total */}
            <div className="p-6 bg-white border-t border-stone-100 space-y-6">
               
               {/* Payment Selector */}
               <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">ÖDEME YÖNTEMİ</span>
                    {error && <span className="text-red-500 text-[10px] font-black animate-pulse">{error}</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => { setSelectedMethod('Nakit'); setError(null); }}
                      className={`relative overflow-hidden py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${
                        selectedMethod === 'Nakit' 
                        ? 'bg-[#2a1a15] text-white border-[#2a1a15] shadow-xl' 
                        : 'bg-white text-stone-500 border-stone-100 hover:border-stone-200'
                      }`}
                    >
                      Nakit
                      {selectedMethod === 'Nakit' && <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500 rounded-bl-3xl flex items-center justify-center translate-x-1 -translate-y-1"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg></div>}
                    </button>
                    <button
                      onClick={() => { setSelectedMethod('Kredi Kartı'); setError(null); }}
                      className={`relative overflow-hidden py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${
                        selectedMethod === 'Kredi Kartı' 
                        ? 'bg-[#2a1a15] text-white border-[#2a1a15] shadow-xl' 
                        : 'bg-white text-stone-500 border-stone-100 hover:border-stone-200'
                      }`}
                    >
                      Kredi Kartı
                      {selectedMethod === 'Kredi Kartı' && <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500 rounded-bl-3xl flex items-center justify-center translate-x-1 -translate-y-1"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg></div>}
                    </button>
                  </div>
               </div>

               {/* Summary & Checkout */}
               <div className="space-y-4">
                  <div className="flex justify-between items-end p-2">
                    <span className="text-stone-400 font-black text-xs uppercase tracking-widest pb-1">Genel Toplam</span>
                    <span className="text-4xl font-black text-[#2a1a15] leading-none">
                      {table.total.toLocaleString('tr-TR', { minimumFractionDigits: 0 })}<span className="text-lg ml-1 text-stone-400">TL</span>
                    </span>
                  </div>
                  
                  <button
                    disabled={table.orders.length === 0}
                    onClick={handleFinalizeBill}
                    className="group relative w-full h-20 bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-200 rounded-[1.5rem] transition-all overflow-hidden flex items-center justify-center shadow-lg shadow-emerald-900/10 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <span className={`relative text-xl font-black uppercase tracking-[0.1em] ${table.orders.length === 0 ? 'text-stone-400' : 'text-white'}`}>
                      {table.orders.length === 0 ? 'Masa Boş' : 'HESABI KAPAT'}
                    </span>
                  </button>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
