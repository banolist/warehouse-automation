import { createResource, createSignal, Show } from "solid-js";
import Table, { TableColumn } from "./components/table";
import createDatabase from "../app/database";
import { Form } from "./components/editForm";
import { Inventory } from "../app/types";

const productColumns: TableColumn<Inventory>[] = [
  {
    title: "ID",
    field: "inventory_id",
    render: (item) => item.inventory_id,
  },
  {
    title: "ID Товара",
    field: "product_id",
    render: (item) => item.product_id,
  },
  {
    title: "Количество",
    field: "quantity",
    render: (item) => item.quantity,
  },
  {
    title: "Место",
    field: "location",
    render: (item) => item.location,
  },
  {
    field: "updated_at",
    title: "Дата обновления",
    render: (item) => new Date(item.updated_at).toLocaleDateString(),
  },
];

export default function InventoryPage() {
  //   const [products, setProducts] = createSignal<Product[]>([]);
  const db = createDatabase();
  const [inventory, { mutate: setInventory }] = createResource(
    db.fethchInventory
  );
  const [products] = createResource(db.fetchProducts);
  const [editingInventory, setEditingInventory] =
    createSignal<Inventory | null>(null);

  const handleAdd = async () => {
    setEditingInventory({
      inventory_id: 0,
      product_id: 0,
      quantity: 0,
      location: "",
      updated_at: new Date(),
    });
  };

  const handleSave = async (data: Inventory) => {
    try {
      if (data.inventory_id === 0) {
        const id = await db.createInventory(data);
        setInventory((prev = []) => [...prev, { ...data, inventory_id: id }]);
      } else {
        await db.saveInventory({
          ...data,
          updated_at: new Date(),
        });
        console.log(data);
        setInventory((prev = []) =>
          prev.map((p) =>
            p.inventory_id === data.inventory_id ? { ...data } : p
          )
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEditingInventory(null);
    }
  };
  const handleCancel = () => {
    setEditingInventory(null);
  };

  const handleEdit = async (data: Inventory) => {
    setEditingInventory(data);
  };

  const handleDelete = async (data: Inventory) => {
    try {
      await db.deleteInventory(data.inventory_id);
      setInventory(
        inventory()?.filter((p) => p.inventory_id !== data.inventory_id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-semibold mb-4">Список инвентаря</h1>
      <Table
        columns={productColumns}
        data={inventory}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Show when={editingInventory() !== null}>
        <Form<Inventory>
          initialValues={editingInventory() || {}}
          onSubmit={handleSave}
          onCancel={handleCancel}
          fields={[
            {
              field: "product_id",
              label: "Продукт",
              type: "select",
              options: products()?.map((p) => ({
                value: p.product_id,
                label: p.product_name,
              })),
            },
            {
              field: "quantity",
              label: "Количество",
              type: "number",
            },
            {
              field: "location",
              label: "Место",
              type: "text",
            },
          ]}
        />
      </Show>
    </div>
  );
}
