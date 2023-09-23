import { type Item } from '@/App';
import TodoItem from '@/components/TodoItem';
import {
  DragDropContext,
  Draggable,
  Droppable,
  type OnDragEndResponder,
} from '@hello-pangea/dnd';

interface TodoListProps {
  list: Item[];
  setTodoList: React.Dispatch<React.SetStateAction<Item[]>>;
  handleDragEnd: OnDragEndResponder;
}

function TodoList({ list, setTodoList, handleDragEnd }: TodoListProps) {
  const toggleItemCheck = (value: boolean, id: string) => {
    const nextTodoList = list.map((todo) => {
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
    const nextTodoList = list.filter((todo) => !(todo.id === id));
    setTodoList(nextTodoList);
  };

  if (list.length === 0) {
    return (
      <p className='border-b border-solid border-b-[color:--border] px-6 py-4 md:py-5'>
        There is no item
      </p>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {list.map(({ id, value, checked }, index) => (
              <Draggable key={id} index={index} draggableId={id}>
                {(provided, snapshot) => (
                  <div
                    className={`border-b border-solid border-b-[color:--border] ${
                      snapshot.isDragging && 'bg-[color:--secondary]'
                    }`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;
