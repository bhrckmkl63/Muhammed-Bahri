
import { TableType, MenuItem, TableStatus } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Sıcak İçecekler
  { id: 1, name: 'Türk Kahvesi', price: 45, category: 'Sıcak İçecekler', stock: 100 },
  { id: 2, name: 'Filtre Kahve', price: 60, category: 'Sıcak İçecekler', stock: 50 },
  { id: 3, name: 'Latte', price: 70, category: 'Sıcak İçecekler', stock: 40 },
  { id: 4, name: 'Çay', price: 25, category: 'Sıcak İçecekler', stock: 500 },
  { id: 5, name: 'Bitki Çayı', price: 40, category: 'Sıcak İçecekler', stock: 60 },
  { id: 6, name: 'Espresso', price: 40, category: 'Sıcak İçecekler', stock: 80 },
  { id: 16, name: 'Cappuccino', price: 70, category: 'Sıcak İçecekler', stock: 35 },
  { id: 17, name: 'Americano', price: 55, category: 'Sıcak İçecekler', stock: 45 },
  { id: 18, name: 'Sıcak Çikolata', price: 80, category: 'Sıcak İçecekler', stock: 30 },
  { id: 19, name: 'Salep', price: 80, category: 'Sıcak İçecekler', stock: 25 },
  { id: 20, name: 'Flat White', price: 75, category: 'Sıcak İçecekler', stock: 20 },
  { id: 21, name: 'White Chocolate Mocha', price: 85, category: 'Sıcak İçecekler', stock: 15 },
  { id: 22, name: 'Chai Tea Latte', price: 80, category: 'Sıcak İçecekler', stock: 20 },

  // Soğuk İçecekler
  { id: 7, name: 'Soğuk Kahve', price: 75, category: 'Soğuk İçecekler', stock: 50 },
  { id: 8, name: 'Limonata', price: 65, category: 'Soğuk İçecekler', stock: 30 },
  { id: 9, name: 'Taze Sıkma Portakal', price: 80, category: 'Soğuk İçecekler', stock: 20 },
  { id: 10, name: 'Su', price: 15, category: 'Soğuk İçecekler', stock: 200 },
  { id: 23, name: 'Ice Americano', price: 65, category: 'Soğuk İçecekler', stock: 50 },
  { id: 24, name: 'Ice Latte', price: 75, category: 'Soğuk İçecekler', stock: 50 },
  { id: 25, name: 'Soda', price: 25, category: 'Soğuk İçecekler', stock: 100 },
  { id: 26, name: 'Ayran', price: 30, category: 'Soğuk İçecekler', stock: 40 },
  { id: 27, name: 'Milkshake (Çikolata)', price: 95, category: 'Soğuk İçecekler', stock: 15 },
  { id: 28, name: 'Milkshake (Çilek)', price: 95, category: 'Soğuk İçecekler', stock: 15 },
  { id: 29, name: 'Churchill', price: 40, category: 'Soğuk İçecekler', stock: 30 },
  { id: 30, name: 'Cool Lime', price: 70, category: 'Soğuk İçecekler', stock: 20 },

  // Tatlılar
  { id: 11, name: 'Cheesecake', price: 110, category: 'Tatlılar', stock: 12 },
  { id: 12, name: 'Brownie', price: 95, category: 'Tatlılar', stock: 10 },
  { id: 13, name: 'Tiramisu', price: 105, category: 'Tatlılar', stock: 8 },
  { id: 31, name: 'San Sebastian', price: 130, category: 'Tatlılar', stock: 5 },
  { id: 32, name: 'Magnolia', price: 90, category: 'Tatlılar', stock: 15 },
  { id: 33, name: 'Waffle', price: 150, category: 'Tatlılar', stock: 20 },
  { id: 34, name: 'Sufle', price: 100, category: 'Tatlılar', stock: 10 },
  { id: 35, name: 'Profiterol', price: 95, category: 'Tatlılar', stock: 12 },
  { id: 36, name: 'Trileçe', price: 85, category: 'Tatlılar', stock: 10 },

  // Yiyecekler
  { id: 14, name: 'Sandviç', price: 120, category: 'Yiyecekler', stock: 25 },
  { id: 15, name: 'Tost', price: 90, category: 'Yiyecekler', stock: 30 },
  { id: 37, name: 'Hamburger', price: 180, category: 'Yiyecekler', stock: 15 },
  { id: 38, name: 'Cheeseburger', price: 200, category: 'Yiyecekler', stock: 12 },
  { id: 39, name: 'Patates Kızartması', price: 70, category: 'Yiyecekler', stock: 40 },
  { id: 40, name: 'Pizza (Karışık)', price: 220, category: 'Yiyecekler', stock: 10 },
  { id: 41, name: 'Menemen', price: 110, category: 'Yiyecekler', stock: 20 },
  { id: 42, name: 'Kahvaltı Tabağı', price: 250, category: 'Yiyecekler', stock: 15 },
  { id: 43, name: 'Serpme Kahvaltı (2 Kişilik)', price: 600, category: 'Yiyecekler', stock: 5 },
];

export const TOTAL_TABLES = 32;

export const generateInitialTables = (): TableType[] => {
  return Array.from({ length: TOTAL_TABLES }, (_, i) => ({
    id: i + 1,
    status: TableStatus.Vacant,
    orders: [],
    total: 0,
  }));
};
