import { Column, Entity } from 'typeorm';

import { CommonsFields } from './commons-fields.entity';

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
}
