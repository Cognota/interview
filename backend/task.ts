import { Request, Response } from "express";
import { useKnex } from "./db";
import type { Knex } from "knex";

export const getUserTasks = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  if (!userId) {
    res.status(400).send("Missing userId");
    return;
  }

  try {
    const tasks = await getTasks(userId);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

const getTasks = useKnex(async (knex: Knex, userId: string) => {
  return knex.select("*").from("tasks").where("userId", userId);
});
