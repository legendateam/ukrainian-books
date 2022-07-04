import {Router} from "express";

import {ratingsController} from "../controllers";

export const ratingsRouter = Router();
// @ts-ignore
ratingsRouter.post('/', ratingsController.createOne)
