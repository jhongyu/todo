import React, { useMemo, useState } from 'react';
import './App.css';
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
    <main className='w-[100vw] max-w-[450px] px-[24px] py-[48px]'>
      <header>
        <p className='text-[length:24px] tracking-[8px]'>TODO</p>
      </header>
      <div className='mt-[25px]'>
        <input
          className='h-[48px] w-full rounded-[5px] bg-white pl-[20px]'
          type='text'
          placeholder='Create a new todo...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => handleAddItem(e)}
        />
        {filteredList.length > 0 && (
          <div className='mt-[16px] rounded-[5px] bg-white drop-shadow-[0_35px_50px_rgba(194,195,214,0.5)]'>
            <div className='max-h-[600px] overflow-y-auto'>
              {filteredList.map(({ id, value, checked }) => (
                <div
                  key={id}
                  className='border-b-[1px] border-solid border-[e3e4f1]'
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
            <div className='flex justify-between px-[24px] py-[20px]'>
              <span>{filteredList.length} items left</span>
              <button onClick={() => clearCompleted()}>Clear Completed</button>
            </div>
          </div>
        )}
        <div className='mt-[16px] flex items-center justify-center gap-[18px] rounded-[5px] bg-white py-[16px] text-[length:14px] font-bold text-[color:#9495a5] drop-shadow-[0_35px_50px_rgba(194,195,214,0.5)]'>
          <button
            className={`${condition === 'all' && 'text-[color:#3a7cfd]'}`}
            onClick={() => setCondition('all')}
          >
            All
          </button>
          <button
            className={`${condition === 'active' && 'text-[color:#3a7cfd]'}`}
            onClick={() => setCondition('active')}
          >
            Active
          </button>
          <button
            className={`${condition === 'completed' && 'text-[color:#3a7cfd]'}`}
            onClick={() => setCondition('completed')}
          >
            Completed
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
