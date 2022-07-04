import {Router} from "express";

import {likesController} from "../controllers";

export const likesRouter = Router();
// @ts-ignore
likesRouter.post('/', likesController.createOne)
