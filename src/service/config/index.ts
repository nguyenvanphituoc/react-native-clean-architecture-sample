function Config() {
  const default_config = {
    API_URL: 'https://jsonplaceholder.typicode.com',
    VERSION: '',
  } as const;

  return default_config;
}

export const CONFIG = Config();
export type APP_CONFIG = typeof CONFIG;
