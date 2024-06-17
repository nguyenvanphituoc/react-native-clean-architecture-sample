export class TodoItem {
  id: number;
  title: string;
  completed: boolean;

  constructor(id: number, title: string, completed: boolean = false) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  changeTitle(newTitle: string) {
    if (newTitle.length === 0) {
      throw new Error('Title cannot be empty');
    }
    if (newTitle === this.title) {
      return;
    }
    if (newTitle.length > 30) {
      throw new Error('Title is too long');
    }
    this.title = newTitle;
  }
}

export const parseTodoItem = (data: any): TodoItem => {
  return new TodoItem(
    data.id || Math.floor(Math.random() * 1000),
    data.title || 'Unknown Task',
    data.completed || false,
  );
};
