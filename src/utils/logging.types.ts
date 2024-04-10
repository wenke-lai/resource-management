export type ConsoleFunc = keyof typeof console;

export type LoggerConfigType = {
  namespace?: string;
};

export type LoggingInterceptorFuncType = (config: LoggerConfigType) => void;
