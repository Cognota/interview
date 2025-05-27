import { AsyncLocalStorage } from "async_hooks";
import { RequestHandler } from "express";
import { Logger } from "pino";

export type ContextKeys = {
  logger: Logger;
};

export type ContextKey = keyof ContextKeys;

export type Context = Map<ContextKey, ContextKeys[ContextKey]>;

export const asyncLocalStorage = new AsyncLocalStorage<Context>();

export const attachLogsToStore: RequestHandler = (req, _, next) => {
  asyncLocalStorage.run(new Map(), () => {
    const s = asyncLocalStorage.getStore();
    s?.set("logger", req.log as unknown as Logger);

    next();
  });
};
