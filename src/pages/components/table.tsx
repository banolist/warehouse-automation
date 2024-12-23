import {
  Accessor,
  createEffect,
  createSignal,
  For,
  Index,
  JSX,
  Resource,
} from "solid-js";

export type TableColumn<T> = {
  title: string;
  field: keyof T;
  render: (item: T) => JSX.Element;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: Resource<T[]>;
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
};

export default function Table<T>({
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
}: TableProps<T>) {
  createEffect(() => console.log(data));
  return (
    <div class="p-4">
      <div class="mb-4 flex justify-end">
        <button class="btn btn-primary" onClick={onAdd}>
          Добавить
        </button>
      </div>
      <table class="table w-full table-zebra">
        <thead>
          <tr>
            <Index each={columns}>{(col) => <th>{col().title}</th>}</Index>
            <th class="text-center">Действия</th>
          </tr>
        </thead>
        <tbody>
          <For each={data()}>
            {(item) => (
              <tr>
                <Index each={columns}>
                  {(col) => <td>{col().render(item)}</td>}
                </Index>
                <td class="text-center">
                  <button
                    class="btn btn-primary mr-2"
                    onClick={() => onEdit(item)}
                  >
                    Редактировать
                  </button>
                  <button class="btn btn-danger" onClick={() => onDelete(item)}>
                    Удалить
                  </button>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
