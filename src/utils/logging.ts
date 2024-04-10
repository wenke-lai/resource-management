import { ConsoleFunc, LoggerConfigType } from "./logging.types";

const enum LogLevel {
  Debug,
  Info,
  Waring,
  Error,
}

const Styles = ["gray", "deepskyblue", "orange", "red"];

const Methods = ["debug", "info", "warn", "error"] as ConsoleFunc[];

class Interceptor {
  private handlers: Array<Function | null>;

  constructor() {
    this.handlers = [];
  }

  // Add a interceptor
  public use(handle: Function) {
    if (typeof handle === "function") {
      this.handlers.push(handle);
      return;
    }
    console.warn("Interceptor must be a function, get", typeof handle);
  }

  // Remove a interceptor
  public eject(id: number) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  // Clear all interceptors
  public clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  // Execute all interceptors
  forEach(config: LoggerConfigType) {
    this.handlers.forEach((handle) => {
      if (handle === null) return;
      handle(config);
    });
  }
}

class Logging {
  private config: LoggerConfigType = {};
  public interceptors: { before: Interceptor; after: Interceptor };

  constructor(namespace = "root") {
    this.config.namespace = namespace;
    this.interceptors = {
      before: new Interceptor(),
      after: new Interceptor(),
    };
  }

  public getLogger(namespace: string) {
    return new Logging(namespace);
  }

  // Log formatter
  private format(level: LogLevel, args: unknown[]) {
    // todo: convert the returns from list to object
    return [
      `%c${this.config.namespace}`,
      `color: ${Styles[level]};`,
      JSON.stringify(args),
    ];
  }

  // Log handler
  private handler(level: LogLevel, args: unknown[]) {
    const out = console[Methods[level]] as Function;

    this.interceptors.before.forEach(this.config);
    out(...this.format(level, args));
    this.interceptors.after.forEach(this.config);
  }

  public debug(...args: unknown[]) {
    this.handler(LogLevel.Debug, args);
    return this;
  }

  public info(...args: unknown[]) {
    this.handler(LogLevel.Info, args);
    return this;
  }

  public warning(...args: unknown[]) {
    this.handler(LogLevel.Waring, args);
    return this;
  }

  public error(...args: unknown[]) {
    this.handler(LogLevel.Error, args);
    return this;
  }

  public report() {
    this.warning(".report() does not support yet");
  }

  public group(name: string) {
    console.group(name);
  }

  public groupEnd() {
    console.groupEnd();
  }
}

// singleton pattern
export default new Logging();
