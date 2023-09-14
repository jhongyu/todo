import React, { useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

interface Item {
  id: string;
  value: string;
  checked: boolean;
}

function App() {
  const [todoList, setTodoList] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState('');

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
    <main className="px-[24px] py-[48px] w-[100vw] max-w-[450px]">
      <header>
        <p className="tracking-[8px] text-[length:24px]">TODO</p>
      </header>
      <div className="mt-[25px]">
        <input
          className="bg-white rounded-[5px] w-full h-[48px] pl-[20px]"
          type="text"
          placeholder="Create a new todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => handleAddItem(e)}
        />
        {todoList.length > 0 && (
          <div className="mt-[16px] rounded-[5px] bg-white drop-shadow-[0_35px_50px_rgba(194,195,214,0.5)]">
            <div>
              {todoList.map(({ id, value, checked }) => (
                <div
                  key={id}
                  className="border-b-[1px] border-solid border-[e3e4f1]"
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
            <div className="px-[24px] py-[20px] flex justify-between">
              <span>{todoList.length} items left</span>
              <button onClick={() => clearCompleted()}>Clear Completed</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
