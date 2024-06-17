import {IAPIProvider, TargetType, Task} from '../../service/network/type';

export const getFullPath = (path?: string, payload?: Record<string, any>) => {
  let pathWithPayload = '';

  if (path && payload) {
    // building path with payload
    pathWithPayload = path
      ?.split('/')
      .map(p => {
        /**
        {{data}}
        {{props.hello}}
      */
        const matchingPlaceHolder = /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm;
        const matches = p.match(matchingPlaceHolder);
        if (!matches) {
          return p;
        }

        const placeholder = matches.shift() as string; // %{what}
        const key: string = placeholder.replace(matchingPlaceHolder, '$1'); // key = what
        const value = payload[key];

        return value;
      })
      .join('/');

    return pathWithPayload;
  }
  return path ?? '';
};

export const withTarget = async (
  apiProvider: IAPIProvider,
  target: TargetType,
) => {
  let requestMed:
    | typeof apiProvider.get
    | typeof apiProvider.post
    | typeof apiProvider.postForm
    | undefined;

  switch (target.task) {
    case Task.UPLOAD:
      requestMed = apiProvider.postForm;
      break;
    case Task.DOWNLOAD:
      requestMed = apiProvider.get;
      break;
    default:
      switch (target.method) {
        case 'POST':
        case 'PUT':
        case 'DELETE':
          requestMed = apiProvider.post;
          break;
        case 'GET':
          requestMed = apiProvider.get;
          break;
        default:
          break;
      }
      break;
  }

  if (requestMed) {
    return requestMed(
      target.path,
      Object.assign(target, {accessToken: 'your credential here'}),
    );
  }
  return Promise.reject(new Error('Invalid request method'));
};
