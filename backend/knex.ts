import knex, { type Knex } from "knex";

let db: Knex | null = null;

export function getKnex() {
  if (!db) {
    db = knex({
      connection: process.env.DB_URL,
      client: "pg",
    });
  }

  return db;
}

export function closeKnex() {
  db?.destroy();
  db = null;
}
