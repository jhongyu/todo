import Card from '@/components/Card';
import Filter from '@/components/Filter';
import HeroImage from '@/components/HeroImage';
import Theme from '@/components/Theme';
import TodoList from '@/components/TodoList';
import useWindowSize from '@/hooks/useWindowSize';
import { OnDragEndResponder } from '@hello-pangea/dnd';
import React, { useMemo, useState } from 'react';
import './App.css';

export interface Item {
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

  const filteredList = useMemo(() => {
    if (condition === 'all') {
      return todoList;
    } else if (condition === 'active') {
      return todoList.filter((todo) => !todo.checked);
    } else {
      return todoList.filter((todo) => todo.checked);
    }
  }, [todoList, condition]);

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

  const handleDragEnd: OnDragEndResponder = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    const nextTodoList = [...todoList];
    const [removed] = nextTodoList.splice(source.index, 1);
    nextTodoList.splice(destination.index, 0, removed);

    setTodoList(nextTodoList);
  };

  return (
    <div className='wrapper'>
      <HeroImage />
      <main className='main w-[100vw] max-w-2xl px-6 py-12 md:py-16'>
        <header className='flex justify-between text-white'>
          <p className='text-2xl tracking-[8px] md:text-4xl'>TODO</p>
          <Theme />
        </header>
        <div className='mt-6 md:mt-10'>
          <Card>
            <input
              className='h-12 w-full rounded bg-[--content-background] pl-5 text-base text-[color:--text1] md:h-16 md:text-lg'
              type='text'
              placeholder='Create a new todo...'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => handleAddItem(e)}
            />
          </Card>
          <Card className='mt-4 md:mt-6'>
            <div className='max-h-[560px] overflow-y-auto text-base text-[color:--text1] md:text-lg'>
              <TodoList
                list={filteredList}
                setTodoList={setTodoList}
                handleDragEnd={handleDragEnd}
              />
            </div>
            <div className='flex justify-between px-6 py-4 text-sm text-[color:--text2] md:text-base'>
              <span>{filteredList.length} items left</span>
              {!isMobile && (
                <Filter condition={condition} setCondition={setCondition} />
              )}
              <button
                onClick={() => clearCompleted()}
                className='hover:text-[color:--text1]'
              >
                Clear Completed
              </button>
            </div>
          </Card>
          {isMobile && (
            <Card className='mt-4 flex items-center justify-center gap-5 py-4 text-base font-bold text-[color:--text2]'>
              <Filter condition={condition} setCondition={setCondition} />
            </Card>
          )}
        </div>
        <p className='mt-8 text-center text-sm text-[color:--text2] md:text-base'>
          Drag and drop to reorder list
        </p>
      </main>
    </div>
  );
}

export default App;
