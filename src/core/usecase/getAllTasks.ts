import {TodoList, parseTodoList} from '../domain/todoList';
import {TGetAllTask} from '../interface/todoUseCases';

// create new task interface
export const getAllTasks: TGetAllTask = ({apiGateway}) => {
  return {
    execute: async () => {
      const response = await apiGateway.getTasks();

      if (response) {
        const todoList = parseTodoList(response);
        return {
          success: true,
          data: todoList,
        };
      }

      return {
        success: false,
        data: new TodoList(),
        message: 'No data found',
      };
    },
  };
};
