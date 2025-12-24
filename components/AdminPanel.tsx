
import React, { useState, useMemo } from 'react';
import { MenuItem, Sale } from '../types';
import { CloseIcon, TrashIcon, TagIcon, CurrencyIcon, GiftIcon, PlusIcon, ChartBarIcon, CalendarIcon } from './icons';

interface AdminPanelProps {
  menuItems: MenuItem[];
  sales: Sale[];
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
  onRemove: (id: number) => void;
  onUpdatePrice: (id: number, newPrice: number) => void;
  onUpdateStock: (id: number, newStock: number) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ menuItems, sales, onClose, onAdd, onRemove, onUpdatePrice, onUpdateStock }) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemStock, setNewItemStock] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  
  // Get unique categories for suggestions
  const existingCategories = Array.from(new Set(menuItems.map(i => i.category)));

  // --- Revenue Calculations ---
  const revenueStats = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    const dailyTotal = sales
      .filter(sale => sale.timestamp >= startOfToday)
      .reduce((sum, sale) => sum + sale.amount, 0);

    const monthlyTotal = sales
      .filter(sale => sale.timestamp >= startOfMonth)
      .reduce((sum, sale) => sum + sale.amount, 0);

    return { dailyTotal, monthlyTotal };
  }, [sales]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice || !newItemCategory || !newItemStock) return;

    const newItem: MenuItem = {
      id: Date.now(),
      name: newItemName,
      price: parseFloat(newItemPrice),
      stock: parseInt(newItemStock),
      category: newItemCategory,
    };

    onAdd(newItem);
    setNewItemName('');
    setNewItemPrice('');
    setNewItemStock('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 backdrop-blur-md">
      <div className="bg-stone-50 rounded-2xl shadow-2xl w-full max-w-7xl h-[95vh] flex flex-col overflow-hidden border border-stone-300">
        {/* Header */}
        <header className="p-5 bg-stone-100 text-black flex justify-between items-center shadow-sm z-10 border-b border-stone-300">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-8 bg-black rounded-full"></div>
            <h2 className="text-2xl font-black text-black tracking-tighter uppercase italic">Yönetici Paneli</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-200 transition-all active:scale-95 group">
            <CloseIcon className="w-7 h-7 text-stone-600 group-hover:text-black transition-colors" />
          </button>
        </header>

        {/* Top Dashboard Section */}
        <div className="bg-white border-b border-stone-200 p-6 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-5 rounded-2xl text-white shadow-lg flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Günlük Ciro</p>
                <h4 className="text-3xl font-black mt-1">
                  {revenueStats.dailyTotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                </h4>
              </div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <ChartBarIcon className="w-8 h-8" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-5 rounded-2xl text-white shadow-lg flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">Aylık Ciro</p>
                <h4 className="text-3xl font-black mt-1">
                  {revenueStats.monthlyTotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                </h4>
              </div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <CalendarIcon className="w-8 h-8" />
              </div>
            </div>

            <div className="bg-stone-100 p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl text-black border border-stone-200">
                <PlusIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-wider">Menü Ürün Sayısı</p>
                <p className="text-2xl font-black text-black">{menuItems.length}</p>
              </div>
            </div>

            <div className="bg-stone-900 p-5 rounded-2xl shadow-lg flex items-center gap-4 text-white">
              <div className="p-3 bg-white/10 rounded-xl text-white">
                <CurrencyIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-stone-400 text-xs font-bold uppercase tracking-wider">Toplam İşlem</p>
                <p className="text-2xl font-black">{sales.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden bg-stone-100">
          
          {/* Add New Item Section */}
          <div className="w-full lg:w-1/4 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-stone-200 bg-white overflow-y-auto">
            <h3 className="text-lg font-black text-black mb-4 flex items-center gap-2 pb-2 border-b-2 border-stone-900">
              Yeni Ürün Ekle
            </h3>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-stone-400 uppercase tracking-tighter">Ürün Adı</label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  className="w-full pl-3 pr-3 py-2 border-2 border-stone-200 rounded-lg focus:border-black outline-none text-sm transition-all"
                  placeholder="Latte"
                  required
                />
              </div>

              <div className="flex gap-2">
                <div className="space-y-1 flex-1">
                  <label className="text-xs font-black text-stone-400 uppercase tracking-tighter">Fiyat</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newItemPrice}
                    onChange={e => setNewItemPrice(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 border-2 border-stone-200 rounded-lg focus:border-black outline-none text-sm transition-all"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <label className="text-xs font-black text-stone-400 uppercase tracking-tighter">Stok</label>
                  <input
                    type="number"
                    value={newItemStock}
                    onChange={e => setNewItemStock(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 border-2 border-stone-200 rounded-lg focus:border-black outline-none text-sm transition-all"
                    placeholder="100"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-stone-400 uppercase tracking-tighter">Kategori</label>
                <input
                  type="text"
                  list="categories"
                  value={newItemCategory}
                  onChange={e => setNewItemCategory(e.target.value)}
                  className="w-full pl-3 pr-3 py-2 border-2 border-stone-200 rounded-lg focus:border-black outline-none text-sm transition-all"
                  placeholder="Sıcak İçecekler"
                  required
                />
                <datalist id="categories">
                  {existingCategories.map(cat => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white font-black py-3 rounded-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-stone-200 uppercase tracking-widest text-xs mt-2"
              >
                <PlusIcon className="w-4 h-4" />
                Listeye Ekle
              </button>
            </form>

            <div className="mt-8">
               <h3 className="text-lg font-black text-black mb-4 flex items-center gap-2 pb-2 border-b-2 border-stone-900">
                Son İşlemler
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {sales.length === 0 ? (
                  <p className="text-xs text-stone-400 italic">Henüz işlem yok.</p>
                ) : (
                  [...sales].reverse().slice(0, 15).map((sale) => (
                    <div key={sale.id} className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex justify-between items-center shadow-sm">
                       <div className="text-[10px]">
                          <p className="font-black text-black">{new Date(sale.timestamp).toLocaleTimeString('tr-TR')}</p>
                          <p className="text-stone-500">{new Date(sale.timestamp).toLocaleDateString('tr-TR')}</p>
                          <span className={`inline-block px-1.5 py-0.5 rounded mt-1 text-[9px] font-black uppercase ${sale.paymentMethod === 'Nakit' ? 'bg-stone-200 text-stone-900' : 'bg-black text-white'}`}>
                            {sale.paymentMethod}
                          </span>
                       </div>
                       <div className="text-black font-black text-sm">
                          {sale.amount.toFixed(2)} TL
                       </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* List Items Section */}
          <div className="w-full lg:w-3/4 p-4 lg:p-6 overflow-y-auto">
            <h3 className="text-lg font-black text-black mb-4 flex items-center justify-between">
              <span>Mevcut Ürün Listesi</span>
              <span className="text-[10px] font-black text-white bg-black px-3 py-1 rounded-full uppercase tracking-widest">
                {menuItems.length} Ürün
              </span>
            </h3>
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="min-w-full divide-y divide-stone-200">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-black uppercase tracking-widest">Ürün Adı</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-black uppercase tracking-widest">Kategori</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-black uppercase tracking-widest">Fiyat (TL)</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-black uppercase tracking-widest">Stok</th>
                    <th className="px-6 py-4 text-right text-[10px] font-black text-black uppercase tracking-widest">İşlem</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-stone-100">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-bold text-black">
                        {item.name}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-xs text-stone-600">
                        <span className="px-2 py-1 bg-stone-100 rounded border border-stone-200 font-medium">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-stone-600">
                        <div className="flex items-center gap-1 border-2 border-stone-100 rounded-lg p-1 w-24 focus-within:border-black transition-all">
                          <span className="text-stone-400 font-bold ml-1">₺</span>
                          <input
                            type="number"
                            min="0"
                            step="0.5"
                            value={item.price}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              if (!isNaN(val)) onUpdatePrice(item.id, val);
                            }}
                            className="w-full bg-transparent text-black font-black outline-none text-sm"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-stone-600">
                        <div className="flex items-center gap-1 border-2 border-stone-100 rounded-lg p-1 w-20 focus-within:border-black transition-all">
                          <input
                            type="number"
                            min="0"
                            value={item.stock}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val)) onUpdateStock(item.id, val);
                            }}
                            className="w-full bg-transparent text-black font-black outline-none text-sm text-center"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-stone-300 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                          title="Ürünü Sil"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
