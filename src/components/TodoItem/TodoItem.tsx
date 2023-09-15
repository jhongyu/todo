import * as Checkbox from '@radix-ui/react-checkbox';
import { ReactNode } from 'react';
import { FiCheck as CheckIcon, FiX as ClearIcon } from 'react-icons/fi';

interface TodoItemProps {
  id: string;
  children: ReactNode;
  checked: boolean;
  onChange: (value: boolean) => void;
  removeItem: (id: string) => void;
}

function TodoItem({
  id,
  children,
  checked,
  onChange,
  removeItem,
}: TodoItemProps) {
  return (
    <div className='flex items-center justify-between gap-3 px-6 py-4'>
      <Checkbox.Root
        className={`flex h-5 w-5 items-center justify-center rounded-full border border-solid border-gray-200 text-white ${
          checked && 'border-0 bg-gradient-to-r from-[#55DDFF] to-[#C058F3]'
        }`}
        id={id}
        checked={checked}
        onCheckedChange={onChange}
      >
        <Checkbox.Indicator className='flex h-full w-full items-center justify-center'>
          <CheckIcon size={12} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label
        className={`flex-1 cursor-pointer ${
          checked && 'text-gray-500 line-through'
        }`}
        htmlFor={id}
      >
        {children}
      </label>
      <button onClick={() => removeItem(id)}>
        <ClearIcon size={16} />
      </button>
    </div>
  );
}

export default TodoItem;
