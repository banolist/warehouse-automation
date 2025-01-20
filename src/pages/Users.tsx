import { createResource, createSignal, Show } from "solid-js";
import Table, { TableColumn } from "./components/table";

import createDatabase from "../app/database";
import { User } from "../app/types";
import { Form } from "./components/editForm";

const productColumns: TableColumn<User>[] = [
  {
    title: "ID",
    field: "user_id",
    render: (item: User) => item.user_id,
  },
  {
    title: "Имя",
    field: "username",
    render: (item: User) => item.username,
  },
  {
    title: "Роль",
    field: "role",
    render: (item: User) => item.role,
  },
  {
    title: "Дата создания",
    field: "created_at",
    render: (item: User) => new Date(item.created_at).toLocaleDateString(),
  },
  {
    title: "Дата обновления",
    field: "updated_at",
    render: (item: User) => new Date(item.updated_at).toLocaleDateString(),
  },
];

export default function Users() {
  //   const [products, setProducts] = createSignal<Product[]>([]);
  const db = createDatabase();
  const [users, { mutate: setUsers }] = createResource(db.fetchUsers);
  const [editingUser, setEditingUser] = createSignal<User | null>(null);

  const handleAdd = async () => {
    setEditingUser({
      created_at: new Date(),
      updated_at: new Date(),
      user_id: 0,
      username: ``,
      password: ``,
      role: "Manager",
    });
  };
  users();

  const handleSave = async (user: User) => {
    try {
      if (user.user_id === 0) {
        const id = await db.createUser(user);
        setUsers((prev = []) => [...prev, {...user, user_id: id}]);
      } else {
        await db.saveUser({
          ...user,
          created_at: new Date(),
          updated_at: new Date(),
        });
        console.log(user);
        setUsers((prev = []) =>
          prev.map((p) => (p.user_id === user.user_id ? { ...user } : p))
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEditingUser(null);
    }
  };
  const handleCancel = () => {
    setEditingUser(null);
  };

  const handleEdit = async (data: User) => {
    setEditingUser(data);
    // const updatedProducts = users()?.map((p) =>
    //   p.userId === product.userId
    //     ? { ...p, username: "Измененный пользователь" }
    //     : p
    // );
    // setUsers(updatedProducts);
  };

  const handleDelete = async (data: User) => {
    try {
      await db.deleteUser(data.user_id);
      setUsers(users()?.filter((p) => p.user_id !== data.user_id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-semibold mb-4">Список Пользователей</h1>
      <Table
        columns={productColumns}
        data={users}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Show when={editingUser() !== null}>
        <Form<User>
          initialValues={editingUser() || {}}
          onSubmit={handleSave}
          onCancel={handleCancel}
          fields={[
            {
              label: "Имя",
              field: "username",
              type: "text",
            },
            {
              label: "Роль",
              field: "role",
              type: "select",
              options: [
                { value: "Admin", label: "Admin" },
                { value: "Manager", label: "Manager" },
                { value: "WarehouseStaff", label: "WarehouseStaff" },
              ],
            },
            {
              label: "Пароль",
              field: "password",
              type: "text",
            },
          ]}
        />
      </Show>
    </div>
  );
}
