import {TUpdateTask} from '../interface/todoUseCases';

export const updateTask: TUpdateTask = ({apiGateway, options}) => {
  return {
    execute: async () => {
      apiGateway.update(options.id, options.title, options.completed);

      return {
        success: true,
        data: apiGateway,
      };
    },
  };
};
