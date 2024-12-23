export type Role = "Admin" | "Manager" | "WarehouseStaff";
export type OrderStatus = "Pending" | "Completed" | "Canceled";

export interface User {
  user_id: number; // Уникальный идентификатор пользователя
  username: string;
  password: string;
  role: Role; // Роль пользователя
  created_at: Date;
  updated_at: Date;
}

export interface Supplier {
  supplier_id: number; // Уникальный идентификатор поставщика
  supplier_name: string;
  contact_name: string;
  phone: string;
  email: string;
  address: string;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  product_id: number; // Уникальный идентификатор товара
  product_name: string;
  description: string;
  supplier_id: number; // Идентификатор поставщика
  unit_price: number; // Цена за единицу
  created_at: Date;
  updated_at: Date;
}

export interface Inventory {
  inventory_id: number; // Уникальный идентификатор записи склада
  product_id: number; // Идентификатор товара
  quantity: number;
  location: string;
  updated_at: Date;
}

export interface Order {
  order_id: number; // Уникальный идентификатор заказа
  product_id: number; // Идентификатор товара
  quantity: number;
  order_date: Date;
  delivery_date: Date;
  status: OrderStatus; // Статус заказа
  created_at: Date;
  updated_at: Date;
}

export interface TransactionHistory {
  transaction_id: number; // Уникальный идентификатор транзакции
  product_id: number; // Идентификатор товара
  change_quantity: number; // Изменение количества
  transaction_date: Date;
  user_id: number; // Идентификатор пользователя
  description: string;
}
