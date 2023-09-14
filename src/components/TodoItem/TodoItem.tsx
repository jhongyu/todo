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
    <div className="px-[24px] py-[20px] flex justify-between gap-[12px] items-center">
      <Checkbox.Root
        className={`w-[20px] h-[20px] flex justify-center items-center rounded-full text-white border-[#e3e4f1] border-solid border-[1px] ${
          checked && 'bg-gradient-to-r from-[#55DDFF] to-[#C058F3] border-0'
        }`}
        id={id}
        checked={checked}
        onCheckedChange={onChange}
      >
        <Checkbox.Indicator className="w-full h-full flex justify-center items-center">
          <CheckIcon size={12} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label
        className={`flex-1 cursor-pointer ${
          checked && 'text-[color:#d1d2da] line-through'
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
