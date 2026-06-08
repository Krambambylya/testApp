type LogPayload = unknown;

export const logger = {
  debug: (message: string, payload?: LogPayload) => {
    if (__DEV__) {
      console.debug(`[debug] ${message}`, payload);
    }
  },
  error: (message: string, error?: unknown, payload?: LogPayload) => {
    if (__DEV__) {
      console.error(`[error] ${message}`, error, payload);
    }
  },
};
