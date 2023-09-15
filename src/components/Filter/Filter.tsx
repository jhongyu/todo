import { Condition } from '@/App';
import React from 'react';

interface FilterProps {
  condition: Condition;
  setCondition: React.Dispatch<React.SetStateAction<Condition>>;
}

function Filter({ condition, setCondition }: FilterProps) {
  return (
    <div className='flex gap-4'>
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
          condition === 'completed' ? 'text-blue-500' : 'hover:text-slate-600'
        }`}
        type='button'
        onClick={() => setCondition('completed')}
      >
        Completed
      </button>
    </div>
  );
}

export default Filter;
