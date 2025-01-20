import { createResource, createSignal, Show } from "solid-js";
import Table, { TableColumn } from "./components/table";
import createDatabase from "../app/database";
import { Form } from "./components/editForm";
import { Supplier } from "../app/types";

const productColumns: TableColumn<Supplier>[] = [
  {
    title: "ID",
    field: "supplier_id",
    render: (item) => item.supplier_id,
  },
  {
    title: "Название",
    field: "supplier_name",
    render: (item) => item.supplier_name,
  },
  {
    title: "Контактное лицо",
    field: "contact_name",
    render: (item) => item.contact_name,
  },
  {
    title: "Телефон",
    field: "phone",
    render: (item) => item.phone,
  },
  {
    title: "Email",
    field: "email",
    render: (item) => item.email,
  },
  {
    title: "Адрес",
    field: "address",
    render: (item) => item.address,
  },
];

export default function Supplers() {
  const db = createDatabase();
  const [products, { mutate: setProducts }] = createResource(db.fetchSuppliers);
  const [editingProduct, setEditingProduct] = createSignal<Supplier | null>(
    null
  );
  const handleAdd = async () => {
    setEditingProduct({
      supplier_id: 0,
      supplier_name: ``,
      contact_name: ``,
      phone: ``,
      email: ``,
      address: ``,
      created_at: new Date(),
      updated_at: new Date(),
    });
  };

  const handleSave = async (data: Supplier) => {
    try {
      if (data.supplier_id === 0) {
        const id = await db.createSupplier(data);
        setProducts((prev = []) => [...prev, { ...data, supplier_id: id }]);
      } else {
        await db.saveSupplier({
          ...data,
          updated_at: new Date(),
        });
        console.log(data);
        setProducts((prev = []) =>
          prev.map((p) =>
            p.supplier_id === data.supplier_id ? { ...data } : p
          )
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

  const handleEdit = async (data: Supplier) => {
    setEditingProduct(data);
  };

  const handleDelete = async (data: Supplier) => {
    try {
      await db.deleteSupplier(data.supplier_id);
      setProducts(
        products()?.filter((p) => p.supplier_id !== data.supplier_id)
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-semibold mb-4">Список Поставщиков</h1>
      <Table
        columns={productColumns}
        data={products}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Show when={editingProduct() !== null}>
        <Form<Supplier>
          initialValues={editingProduct() || {}}
          onSubmit={handleSave}
          onCancel={handleCancel}
          fields={[
            {
              field: "supplier_name",
              label: "Название",
              type: "text",
            },
            {
              field: "contact_name",
              label: "Контактное лицо",
              type: "text",
            },
            {
              field: "phone",
              label: "Телефон",
              type: "text",
            },
            {
              field: "email",
              label: "Email",
              type: "text",
            },
            {
              field: "address",
              label: "Адрес",
              type: "text",
            },
          ]}
        />
      </Show>
    </div>
  );
}
