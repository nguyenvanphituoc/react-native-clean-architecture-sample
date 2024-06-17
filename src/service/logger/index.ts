class _Logger {
  static instance: _Logger;
  private isDev: boolean;
  private appID: string;

  constructor(APP_ID: string) {
    if (!_Logger.instance) {
      _Logger.instance = this;
    }

    // Determine if the current environment is development
    this.isDev = __DEV__;
    this.appID = APP_ID;

    return _Logger.instance;
  }

  log(message: any, ...optionalParams: any[]) {
    if (this.isDev) {
      console.log(message, ...optionalParams);
    }
  }

  error(message: any, ...optionalParams: any[]) {
    if (this.isDev) {
      console.error(message, ...optionalParams);
    }
  }

  warn(message: any, ...optionalParams: any[]) {
    if (this.isDev) {
      console.warn(message, ...optionalParams);
    }
  }
  // group
  group(groupTitle: string) {
    if (this.isDev) {
      console.group(groupTitle);
    }
  }

  groupCollapsed(groupTitle: string) {
    if (this.isDev) {
      console.groupCollapsed(groupTitle);
    }
  }

  groupEnd() {
    if (this.isDev) {
      console.groupEnd();
    }
  }
  // info
  info(message: any, ...optionalParams: any[]) {
    if (this.isDev) {
      console.info(message, ...optionalParams);
    }
  }
  // Similarly, you can implement other console methods like info, debug, etc.
}

export const Logger = new _Logger('sg.vinova.jurong.app');
