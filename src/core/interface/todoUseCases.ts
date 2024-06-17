import {TodoList} from '../domain/todoList';
import {IUseCase, TCreateUseCaseOptions} from './AbstractionUseCase';
import {ITodoService} from './repositories';

// create new task interface
export type TGetAllTask = ({
  apiGateway,
}: TCreateUseCaseOptions<unknown, ITodoService>) => IUseCase<TodoList>;

export type TCreateTask = ({
  apiGateway,
  options,
}: TCreateUseCaseOptions<{title: string}, TodoList>) => IUseCase<TodoList>;

export type TUpdateTask = ({
  apiGateway,
  options,
}: TCreateUseCaseOptions<
  {id: number; title: string; completed: boolean},
  TodoList
>) => IUseCase<TodoList>;

export type TDeleteTask = ({
  apiGateway,
  options,
}: TCreateUseCaseOptions<{id: number}, TodoList>) => IUseCase<TodoList>;
