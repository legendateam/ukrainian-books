import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonsFields } from './commons-fields.entity';
import { Comments } from './comments.entity';
import { Users } from './users.entity';

@Entity()
export class Likes extends CommonsFields {
    @Column({
        name: 'like',
        type: 'boolean',
        default: false,
        nullable: false,
    })
        like?: boolean;

    @Column({
        name: 'disLike',
        type: 'boolean',
        default: false,
        nullable: false,
    })
        disLike?: boolean;

    @Column({
        name: 'userId',
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        name: 'commentId',
        type: 'int',
        nullable: false,
        unique: true,
    })
        commentId: number;

    @ManyToOne(() => Comments, (comment) => comment.likes)
    @JoinColumn({ name: 'commentId' })
        comment: Comments;

    @ManyToOne(() => Users, (user) => user.likes)
    @JoinColumn({ name: 'userId' })
        user: Users;
}