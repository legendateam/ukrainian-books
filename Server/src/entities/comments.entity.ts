import {
    Column, Entity, ManyToOne, OneToMany,
} from 'typeorm';

import { JoinColumn } from 'typeorm/browser';
import { CommonsFields } from './commons-fields.entity';
import { Users } from './users.entity';
import { Books } from './books.entity';
import { Likes } from './likes.entity';

@Entity()
export class Comments extends CommonsFields {
    @Column({
        name: 'userId',
        type: 'int',
        nullable: false,
    })
        userId: string;

    @Column({
        name: 'bookId',
        type: 'int',
        nullable: false,
    })
        bookId: number;

    @Column({
        name: 'text',
        type: 'text',
        nullable: false,
    })
        text: string;

    @ManyToOne(() => Users, (users) => users.comments)
    @JoinColumn({ name: 'userId' })
        user: Users;

    @ManyToOne(() => Books, (books) => books.comments)
    @JoinColumn({ name: 'bookId' })
        book: Books;

    @OneToMany(() => Likes, (likes) => likes.comment)
        likes: Likes[];
}
