export type TResponseData<T> = {
  success: boolean;
  data: T;
  status?: string;
  message?: string;
};

export interface IUseCase<T> {
  execute: () => Promise<TResponseData<T>>;
}

export type TCreateUseCaseOptions<Payload = void, Gateway = void> = {
  apiGateway: Gateway;
  options: Payload;
};
