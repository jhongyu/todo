import React, { useMemo, useState } from 'react';
import './App.css';
import Card from './components/Card';
import TodoItem from './components/TodoItem';

interface Item {
  id: string;
  value: string;
  checked: boolean;
}

type Condition = 'all' | 'active' | 'completed';

function App() {
  const [todoList, setTodoList] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [condition, setCondition] = useState<Condition>('all');

  const filteredList = useMemo(() => {
    if (condition === 'all') {
      return todoList;
    } else if (condition === 'active') {
      return todoList.filter((todo) => !todo.checked);
    } else {
      return todoList.filter((todo) => todo.checked);
    }
  }, [todoList, condition]);

  const toggleItemCheck = (value: boolean, id: string) => {
    const nextTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          checked: value,
        };
      }
      return todo;
    });
    setTodoList(nextTodoList);
  };

  const handleRemoveItem = (id: string) => {
    const nextTodoList = todoList.filter((todo) => !(todo.id === id));
    setTodoList(nextTodoList);
  };

  const handleAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const nextTodoList = [
        ...todoList,
        {
          id: crypto.randomUUID(),
          value: inputValue,
          checked: false,
        },
      ];
      setTodoList(nextTodoList);
      setInputValue('');
    }
  };

  const clearCompleted = () => {
    const nextTodoList = todoList.filter((todo) => !todo.checked);
    setTodoList(nextTodoList);
  };

  return (
    <main className='w-[100vw] max-w-[540px] px-6 py-12'>
      <header>
        <p className='text-2xl tracking-[8px] text-white md:text-4xl'>TODO</p>
      </header>
      <div className='mt-6'>
        <Card>
          <input
            className='h-12 w-full rounded pl-5 text-base md:text-lg'
            type='text'
            placeholder='Create a new todo...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) => handleAddItem(e)}
          />
        </Card>
        {filteredList.length > 0 && (
          <Card className='mt-4'>
            <div className='max-h-[600px] overflow-y-auto text-base md:text-lg'>
              {filteredList.map(({ id, value, checked }) => (
                <div
                  key={id}
                  className='border-b border-solid border-b-gray-200'
                >
                  <TodoItem
                    id={id}
                    checked={checked}
                    onChange={(value) => toggleItemCheck(value, id)}
                    removeItem={(id) => handleRemoveItem(id)}
                  >
                    {value}
                  </TodoItem>
                </div>
              ))}
            </div>
            <div className='flex justify-between px-6 py-4 text-sm text-slate-400 md:text-base'>
              <span>{filteredList.length} items left</span>
              <button
                onClick={() => clearCompleted()}
                className='hover:text-slate-600'
              >
                Clear Completed
              </button>
            </div>
          </Card>
        )}
        <Card className='mt-4 flex items-center justify-center gap-5 py-4 text-base font-bold text-slate-400'>
          <button
            className={`${
              condition === 'all' ? 'text-blue-500' : 'hover:text-slate-600'
            }`}
            type='button'
            onClick={() => setCondition('all')}
          >
            All
          </button>
          <button
            className={`${
              condition === 'active' ? 'text-blue-500' : 'hover:text-slate-600'
            }`}
            type='button'
            onClick={() => setCondition('active')}
          >
            Active
          </button>
          <button
            className={`${
              condition === 'completed'
                ? 'text-blue-500'
                : 'hover:text-slate-600'
            }`}
            type='button'
            onClick={() => setCondition('completed')}
          >
            Completed
          </button>
        </Card>
      </div>
    </main>
  );
}

export default App;
