import { createResource, createSignal, Show } from "solid-js";
import Table, { TableColumn } from "./components/table";
import createDatabase from "../app/database";
import { Form } from "./components/editForm";
import { Order } from "../app/types";

const productColumns: TableColumn<Order>[] = [
  {
    title: "ID",
    field: "order_id",
    render: (item) => item.order_id,
  },
  {
    title: "Product",
    field: "product_id",
    render: (item) => item.product_id,
  },
  {
    title: "Quantity",
    field: "quantity",
    render: (item) => item.quantity,
  },
  {
    title: "Order Date",
    field: "order_date",
    render: (item) => item.order_date.toLocaleDateString(),
  },
  {
    title: "Delivery Date",
    field: "delivery_date",
    render: (item) => item.delivery_date.toLocaleDateString(),
  },
  {
    title: "Status",
    field: "status",
    render: (item) => item.status,
  },
];

export default function Orders() {
  //   const [products, setProducts] = createSignal<Product[]>([]);
  const db = createDatabase();
  const [orders, { mutate: setOrders }] = createResource(db.fetchOrders);
  const [editingOrder, setEditingOrder] = createSignal<Order | null>(null);

  const handleAdd = async () => {
    setEditingOrder({
      created_at: new Date(),
      order_id: 0,
      delivery_date: new Date(),
      order_date: new Date(),
      status: "Pending",
      product_id: 0,
      quantity: 0,
      location: "",
      updated_at: new Date(),
    });
  };

  const handleSave = async (data: Order) => {
    try {
      if (data.order_id === 0) {
        await db.createOrder(data);
        setOrders((prev = []) => [...prev, data]);
      } else {
        await db.saveOrder({
          ...data,
          updated_at: new Date(),
        });
        console.log(data);
        setOrders((prev = []) =>
          prev.map((p) => (p.order_id === data.order_id ? { ...data } : p))
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEditingOrder(null);
    }
  };
  const handleCancel = () => {
    setEditingOrder(null);
  };

  const handleEdit = async (data: Order) => {
    setEditingOrder(data);
  };

  const handleDelete = async (data: Order) => {
    try {
      await db.deleteInventory(data.order_id);
      setOrders(orders()?.filter((p) => p.order_id !== data.order_id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-semibold mb-4">Список заказов</h1>
      <Table
        columns={productColumns}
        data={orders}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Show when={editingOrder() !== null}>
        <Form<Order>
          initialValues={editingOrder() || {}}
          onSubmit={handleSave}
          onCancel={handleCancel}
          fields={[
            {
              field: "delivery_date",
              label: "Delivery Date",
              type: "date",
            },
            {
              field: "order_date",
              label: "Order Date",
              type: "date",
            },
            {
              field: "status",
              label: "Status",
              type: "select",
              options: [
                { value: "Pending", label: "Pending" },
                { value: "Shipped", label: "Shipped" },
                { value: "Delivered", label: "Delivered" },
              ],
            },
            {
              field: "product_id",
              label: "Product ID",
              type: "number",
            },
            {
              field: "quantity",
              label: "Quantity",
              type: "number",
            },
          ]}
        />
      </Show>
    </div>
  );
}
