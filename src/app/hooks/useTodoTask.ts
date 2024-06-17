import React from 'react';
import {useEffect} from 'react';
import {CONFIG} from '../../service/config';
import {RemoteAPIProvider} from '../../service/network/apiClient';
import {todoServiceImplement} from '../implementation/TodoImpl';
import {getAllTasks} from '../../core/usecase/getAllTasks';
import {TodoList} from '../../core/domain/todoList';
//

export function useTodoList() {
  const [todos, setTodos] = React.useState<TodoList>();
  const todoService = React.useMemo(() => {
    const provider = new RemoteAPIProvider({
      baseURL: CONFIG.API_URL,
      version: CONFIG.VERSION,
    });

    const service = todoServiceImplement(provider);

    return service;
  }, []);

  const getListUseCase = React.useCallback(() => {
    return getAllTasks({
      apiGateway: todoService,
      options: undefined,
    });
  }, [todoService]);
  //
  useEffect(() => {
    getListUseCase()
      .execute()
      .then(response => {
        if (response.success) {
          setTodos(response.data);
        }
      });
  }, [getListUseCase]);

  return {todos};
}
