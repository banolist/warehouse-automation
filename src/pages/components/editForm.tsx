import { createSignal, For, Index } from "solid-js";

export type FormField<T> = {
  label: string;
  field: keyof T;
  type: "text" | "number" | "select" | "date"; // Добавьте другие типы, если нужно
  options?: { value: string | number; label: string }[]; // Для select
};

export type FormProps<T> = {
  fields: FormField<T>[];
  initialValues: Partial<T>;
  onSubmit: (values: T) => void;
  onCancel: () => void;
};

export function Form<T>({
  fields,
  initialValues,
  onSubmit,
  onCancel,
}: FormProps<T>) {
  let formRef: HTMLFormElement | null = null;
  const [formValues, setFormValues] = createSignal<Partial<T>>(initialValues);

  const handleChange = (field: keyof T, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSubmit(formValues() as T);
  };

  return (
    <form
      ref={(el) => (formRef = el)}
      class="space-y-4 p-4"
      onSubmit={handleSubmit}
    >
      <For each={fields}>
        {(field) => (
          <div class="form-control">
            <label class="label">
              <span class="label-text">{field.label}</span>
            </label>
            {field.type === "select" && field.options ? (
              <select
                class="select select-bordered"
                value={formValues()[field.field] as string | number}
                onInput={(e) =>
                  handleChange(
                    field.field,
                    (e.target as HTMLSelectElement).value
                  )
                }
              >
                {field.options.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                class="input input-bordered"
                value={formValues()[field.field] as string | number}
                onInput={(e) =>
                  handleChange(
                    field.field,
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            )}
          </div>
        )}
      </For>
      <div class="flex justify-end space-x-4">
        <button type="button" class="btn btn-outline" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" class="btn btn-primary">
          Сохранить
        </button>
      </div>
    </form>
  );
}
