import {TDeleteTask} from '../interface/todoUseCases';

export const deleteTask: TDeleteTask = ({apiGateway, options}) => {
  return {
    execute: async () => {
      apiGateway.delete(options.id);

      return {
        success: true,
        data: apiGateway,
      };
    },
  };
};
