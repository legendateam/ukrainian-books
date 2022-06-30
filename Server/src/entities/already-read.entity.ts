import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { Users } from './users.entity';
import { Books } from './books.entity';

@Entity()
export class AlreadyRead {
    @Column({
        name: 'userId',
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        name: 'bookId',
        type: 'int',
        unique: true,
        nullable: false,
    })
        bookId: number;

    @ManyToOne(() => Users, (user) => user.alreadyRead)
    @JoinColumn({ name: 'userId' })
        user: Users;

    @ManyToOne(() => Books, (books) => books.alreadyRead)
    @JoinColumn({ name: 'bookId' })
        book: Books;
}
