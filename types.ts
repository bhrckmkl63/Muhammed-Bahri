
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface OrderItem extends MenuItem {
  orderId: string;
}

export enum TableStatus {
  Vacant = 'vacant',
  Occupied = 'occupied',
}

export interface TableType {
  id: number;
  status: TableStatus;
  orders: OrderItem[];
  total: number;
}

export interface Sale {
  id: string;
  amount: number;
  timestamp: number;
  paymentMethod: 'Nakit' | 'Kredi Kartı';
}
