import type { Knex } from "knex";

import { getKnex } from "./knex";
import { asyncLocalStorage } from "./store";

type KnexRepoFn<T, Args extends unknown[]> = (
  knex: Knex,
  ...args: Args
) => Promise<T>;

type UseKnex = <T, Args extends unknown[]>(
  fn: KnexRepoFn<T, Args>
) => (...args: Args) => Promise<T>;

export const useKnex: UseKnex = (fn) => {
  return async (...args) => {
    const store = asyncLocalStorage.getStore();
    const logger = store?.get("logger");

    store?.get("logger")?.debug({ args }, `Starting ${fn.name}`);

    args.push(logger);

    const knex = getKnex();
    try {
      return await fn(knex, ...args);
    } catch (err) {
      logger?.error(err);
      throw err;
    } finally {
      logger?.debug(`Finished ${fn.name}`);
    }
  };
};
