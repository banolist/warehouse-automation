import { createResource, createSignal, Show } from "solid-js";
import Table, { TableColumn } from "./components/table";
import createDatabase from "../app/database";
import { Product } from "../app/types";
import { Form } from "./components/editForm";

const productColumns: TableColumn<Product>[] = [
  {
    title: "Название",
    field: "product_name",
    render: (item: Product) => item.product_name,
  },
  {
    title: "Цена",
    field: "unit_price",
    render: (item: Product) => `$${item.unit_price}`,
  },
  {
    title: "Дата создания",
    field: "created_at",
    render: (item: Product) => new Date(item.created_at).toLocaleDateString(),
  },
  {
    title: "Дата обновления",
    field: "updated_at",
    render: (item: Product) => new Date(item.updated_at).toLocaleDateString(),
  },
];

export default function Products() {
  const db = createDatabase();
  const [products, { mutate: setProducts }] = createResource(db.fetchProducts);
  const [editingProduct, setEditingProduct] = createSignal<Product | null>(
    null
  );
  const [suppliers] = createResource(db.fetchSuppliers);
  const handleAdd = async () => {
    setEditingProduct({
      created_at: new Date(),
      updated_at: new Date(),
      supplier_id: 0,
      description: ``,
      unit_price: 0,
      product_id: 0,
      product_name: ``,
    });
  };

  const handleSave = async (data: Product) => {
    try {
      if (data.product_id === 0) {
        await db.createProduct(data);
        setProducts((prev = []) => [...prev, data]);
      } else {
        await db.saveProduct({
          ...data,
          updated_at: new Date(),
        });
        console.log(data);
        setProducts((prev = []) =>
          prev.map((p) => (p.product_id === data.product_id ? { ...data } : p))
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEditingProduct(null);
    }
  };
  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleEdit = async (data: Product) => {
    setEditingProduct(data);
  };

  const handleDelete = async (data: Product) => {
    try {
      await db.deleteInventory(data.product_id);
      setProducts(products()?.filter((p) => p.product_id !== data.product_id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-semibold mb-4">Список товаров</h1>
      <Table
        columns={productColumns}
        data={products}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Show when={editingProduct() !== null}>
        <Form<Product>
          initialValues={editingProduct() || {}}
          onSubmit={handleSave}
          onCancel={handleCancel}
          fields={[
            {
              label: "Название",
              field: "product_name",
              type: "text",
            },
            {
              label: "Описание",
              field: "description",
              type: "text",
            },
            {
              label: "Цена",
              field: "unit_price",
              type: "number",
            },
            {
              label: "Поставщик",
              field: "supplier_id",
              type: "select",
              options: suppliers()?.map((s) => ({
                value: s.supplier_id,
                label: s.supplier_name,
              })),
            },
          ]}
        />
      </Show>
    </div>
  );
}
