import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = (req as Request & { validated?: any }).validated;
    const id = validated?.params?.id ?? req.params.id;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = (req as Request & { validated?: any }).validated;
    const body = validated?.body ?? req.body;
    const user = await userService.createUser(body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = (req as Request & { validated?: any }).validated;
    const query = validated?.query ?? req.query;
    const result = await userService.listUsers(query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
