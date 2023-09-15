import heroMobileImg from '@/assets/hero-mobile.png';
import heroImg from '@/assets/hero.png';
import Card from '@/components/Card';
import Filter from '@/components/Filter';
import TodoItem from '@/components/TodoItem';
import useWindowSize from '@/hooks/useWindowSize';
import React, { useMemo, useState } from 'react';
import './App.css';

interface Item {
  id: string;
  value: string;
  checked: boolean;
}

export type Condition = 'all' | 'active' | 'completed';

function App() {
  const [todoList, setTodoList] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [condition, setCondition] = useState<Condition>('all');

  const { width } = useWindowSize();
  const isMobile = width < 768;
  const imgSrc = isMobile ? heroMobileImg : heroImg;

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
    <div className='wrapper'>
      <section className='hero'>
        <img
          className='h-full w-full object-fill'
          src={imgSrc}
          alt='hero picture'
        />
      </section>
      <main className='main w-[100vw] max-w-2xl px-6 py-12 md:py-16'>
        <header>
          <p className='text-2xl tracking-[8px] text-white md:text-4xl'>TODO</p>
        </header>
        <div className='mt-6 md:mt-10'>
          <Card>
            <input
              className='h-12 w-full rounded pl-5 text-base md:h-16 md:text-lg'
              type='text'
              placeholder='Create a new todo...'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => handleAddItem(e)}
            />
          </Card>
          <Card className='mt-4 md:mt-6'>
            <div className='max-h-[600px] overflow-y-auto text-base md:text-lg'>
              {filteredList.length > 0 ? (
                filteredList.map(({ id, value, checked }) => (
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
                ))
              ) : (
                <p className='border-b border-solid border-b-gray-200 px-6 py-4 md:py-5'>
                  There is no item
                </p>
              )}
            </div>
            <div className='flex justify-between px-6 py-4 text-sm text-slate-400 md:text-base'>
              <span>{filteredList.length} items left</span>
              {!isMobile && (
                <Filter condition={condition} setCondition={setCondition} />
              )}
              <button
                onClick={() => clearCompleted()}
                className='hover:text-slate-600'
              >
                Clear Completed
              </button>
            </div>
          </Card>
          {isMobile && (
            <Card className='mt-4 flex items-center justify-center gap-5 py-4 text-base font-bold text-slate-400'>
              <Filter condition={condition} setCondition={setCondition} />
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
