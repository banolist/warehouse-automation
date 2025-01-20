import Database from "@tauri-apps/plugin-sql";
import { Inventory, Order, Product, Supplier, User } from "./types";
type FetchFunction<T> = () => Promise<T[]>;
interface DatabaseAPI {
  db: Database;
  fetchUsers: FetchFunction<User>;
  deleteUser: (userId: number) => Promise<void>;
  saveUser: (user: User) => Promise<void>;
  createUser: (user: User) => Promise<number>;
  getUserByLogin: (login: string) => Promise<User | undefined>;
  fetchSuppliers: FetchFunction<Supplier>;
  createSupplier: (supplier: Supplier) => Promise<number>;
  saveSupplier: (supplier: Supplier) => Promise<void>;
  deleteSupplier: (supplierId: number) => Promise<void>;
  fetchProducts: FetchFunction<Product>;
  createProduct: (product: Product) => Promise<number>;
  saveProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  fetchOrders: FetchFunction<Order>;
  createOrder: (order: Order) => Promise<number>;
  saveOrder: (order: Order) => Promise<void>;
  deleteOrder: (orderId: number) => Promise<void>;
  fethchInventory: FetchFunction<Inventory>;
  createInventory: (inventory: Inventory) => Promise<number>;
  saveInventory: (inventory: Inventory) => Promise<void>;
  deleteInventory: (inventoryId: number) => Promise<void>;
}

export default function createDatabase(): DatabaseAPI {
  const db = Database.get("sqlite:database.db");
  return {
    db,
    fetchUsers: async () => {
      return db.select("SELECT * FROM users");
    },
    createUser: async (user: User) => {
      const result = await db.execute(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [user.username, user.password, user.role]
      );
      return result.lastInsertId!;
    },
    getUserByLogin: async (login: string) => {
      const result = await db.select<User[]>(
        "SELECT * from users WHERE username = ?",
        [login]
      );
      return result.at(0);
    },
    deleteUser: async (userId: number) => {
      await db.execute("DELETE FROM users WHERE user_id = ?", [userId]);
    },
    saveUser: async (user: User) => {
      await db.execute(
        "UPDATE users SET username = ?, password = ?, role = ? WHERE user_id = ?",
        [user.username, user.password, user.role, user.user_id]
      );
    },

    fetchSuppliers: async () => {
      return db.select("SELECT * FROM suppliers");
    },
    createSupplier: async (supplier: Supplier) => {
      const result = await db.execute(
        "INSERT INTO suppliers (supplier_name, contact_name, phone, email, address) VALUES (?, ?, ?, ?, ?)",
        [
          supplier.supplier_name,
          supplier.contact_name,
          supplier.phone,
          supplier.email,
          supplier.address,
        ]
      );
      return result.lastInsertId!;
    },
    saveSupplier: async (supplier: Supplier) => {
      await db.execute(
        "UPDATE suppliers SET supplier_name = ?, contact_name = ?, phone = ?, email = ?, address = ? WHERE supplier_id = ?",
        [
          supplier.supplier_name,
          supplier.contact_name,
          supplier.phone,
          supplier.email,
          supplier.address,
          supplier.supplier_id,
        ]
      );
    },
    deleteSupplier: async (supplierId: number) => {
      await db.execute("DELETE FROM suppliers WHERE supplier_id = ?", [
        supplierId,
      ]);
    },
    fetchProducts: async () => {
      return db.select("SELECT * FROM products");
    },
    createProduct: async (product: Product) => {
      const result = await db.execute(
        "INSERT INTO products (product_name, description, supplier_id, unit_price) VALUES (?, ?, ?, ?)",
        [
          product.product_name,
          product.description,
          product.supplier_id,
          product.unit_price,
        ]
      );
      return result.lastInsertId!;
    },
    deleteProduct: async (productId: number) => {
      await db.execute("DELETE FROM products WHERE product_id = ?", [
        productId,
      ]);
    },
    fetchOrders: async () => {
      return db.select("SELECT * FROM orders");
    },
    createOrder: async (order: Order) => {
      const result = await db.execute(
        "INSERT INTO orders ( product_id, quantity, order_date, delivery_date, status) VALUES (?, ?, ?, ?, ?)",
        [
          order.product_id,
          order.quantity,
          order.order_date,
          order.delivery_date,
          order.status,
        ]
      );
      return result.lastInsertId!;
    },
    saveOrder: async (order: Order) => {
      await db.execute(
        "UPDATE orders SET product_id = ?, quantity = ?, order_date = ?, delivery_date = ?, status = ? WHERE order_id = ?",
        [
          order.product_id,
          order.quantity,
          order.order_date,
          order.delivery_date,
          order.status,
          order.order_id,
        ]
      );
    },
    deleteOrder: async (orderId: number) => {
      await db.execute("DELETE FROM orders WHERE order_id = ?", [orderId]);
    },
    saveProduct: async (product: Product) => {
      await db.execute(
        "UPDATE products SET product_name = ?, description = ?, supplier_id = ?, unit_price = ? WHERE product_id = ?",
        [
          product.product_name,
          product.description,
          product.supplier_id,
          product.unit_price,
          product.product_id,
        ]
      );
    },
    fethchInventory: async () => {
      return db.select("SELECT * FROM inventory");
    },
    createInventory: async (inventory: Inventory) => {
      const result = await db.execute(
        "INSERT INTO inventory (product_id, quantity, location) VALUES (?, ?, ?)",
        [inventory.product_id, inventory.quantity, inventory.location]
      );
      return result.lastInsertId!;
    },
    saveInventory: async (inventory: Inventory) => {
      await db.execute(
        "UPDATE inventory SET product_id = ?, quantity = ?, location = ? WHERE inventory_id = ?",
        [
          inventory.product_id,
          inventory.quantity,
          inventory.location,
          inventory.inventory_id,
        ]
      );
    },
    deleteInventory: async (inventoryId: number) => {
      await db.execute("DELETE FROM inventory WHERE inventory_id = ?", [
        inventoryId,
      ]);
    },
  };
}
