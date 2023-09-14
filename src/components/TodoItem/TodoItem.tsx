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
    <div className='flex items-center justify-between gap-[12px] px-[24px] py-[20px]'>
      <Checkbox.Root
        className={`flex h-[20px] w-[20px] items-center justify-center rounded-full border-[1px] border-solid border-[#e3e4f1] text-white ${
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
