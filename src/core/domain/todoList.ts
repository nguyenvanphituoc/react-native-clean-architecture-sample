import {TodoItem, parseTodoItem} from './todoItem';

export class TodoList {
  private todos: TodoItem[] = [];

  create(todo: TodoItem) {
    this.todos.push(todo);
  }

  read(id: number): TodoItem | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  update(id: number, title: string, completed: boolean) {
    const todo = this.read(id);
    if (todo) {
      todo.changeTitle(title);
      completed !== todo.completed && todo.toggleCompleted();
    }
  }

  delete(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  get list(): ReadonlyArray<TodoItem> {
    return this.todos;
  }
}

export const parseTodoList = (data: any): TodoList => {
  const todoList = new TodoList();
  for (const todo in data) {
    let item = data[todo];
    todoList.create(parseTodoItem(item));
  }
  return todoList;
};
