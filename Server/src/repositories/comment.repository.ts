import { AppDataSource } from '../ormconfig';

import { Comments } from '../entities';
import { IComment } from '../interfaces/comment.interface';

class CommentRepository {
    commentRepository;

    constructor() {
        this.commentRepository = AppDataSource.getRepository(Comments);
    }

    public async createOne(comment: IComment): Promise<IComment> {
        return this.commentRepository.save(comment);
    }

    public async getOneByEmailOrNickName(): Promise<IComment[] | null> {
        return this.commentRepository.find();
    }
}

export const commentRepository = new CommentRepository();
