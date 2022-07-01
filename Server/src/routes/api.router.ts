import {
    Request, Response, NextFunction, Router,
} from 'express';

import { userRouter } from './user.router';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../error';
import {
    alreadyReadRepository,
    authorRepository,
    bookRepository,
    commentRepository,
    favoritesRepository, genreRepository, likeRepository, ratingRepository,
    willReadRepository,
} from '../repositories';

export const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.post('/willRead', async (req, res) => {
    try {
        const willReadPromise = await willReadRepository.createOne(req.body);
        res.json(willReadPromise);
    } catch (e) {
        console.log(e);
    }
});
apiRouter.post('/authors', async (req, res) => {
    try {
        const willReadPromise = await authorRepository.createOne(req.body);
        res.json(willReadPromise);
    //
    } catch (e) {
        console.log(e);
    }
});
apiRouter.post('/books', async (req, res) => {
    //
    try {
        const willReadPromise = await bookRepository.createOne(req.body);
        res.json(willReadPromise);
    } catch (e) {
        console.log(e);
    }
});
apiRouter.post('/comments', async (req, res) => {
    try {
        const willReadPromise = await commentRepository.createOne(req.body);
        res.json(willReadPromise);
    } catch (e) {
        console.log(e);
    }
});
apiRouter.post('/favorites', async (req, res) => {
    try {
        const willReadPromise = await favoritesRepository.createOne(req.body);
        res.json(willReadPromise);
    } catch (e) {
        console.log(e);
    }
});
apiRouter.post('/genres', async (req, res) => {
    try {
        const willReadPromise = await genreRepository.createOne(req.body);
        res.json(willReadPromise);
    } catch (e) {
        console.log(e);
    }
});
apiRouter.post('/likes', async (req, res) => {
    try {
        const willReadPromise = await likeRepository.createOne(req.body);
        res.json(willReadPromise);
    //
    } catch (e) {
        console.log(e);
    }
});
apiRouter.post('/ratings', async (req, res) => {
    try {
        const willReadPromise = await ratingRepository.createOne(req.body);
        res.json(willReadPromise);
    } catch (e) {
        console.log(e);
    }
});
apiRouter.post('/alreadyread', async (req, res) => {
    try {
        const willReadPromise = await alreadyReadRepository.createOne(req.body);
        res.json(willReadPromise);
    } catch (e) {
        console.log(e);
    }
});

// @ts-ignore
apiRouter.use('*', (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        error: err?.error || HttpMessageEnum.INTERNAL_SERVER_ERROR,
        status: err?.status || HttpStatusEnum.INTERNAL_SERVER_ERROR,
    });
});
