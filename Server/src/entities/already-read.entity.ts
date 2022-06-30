import { Column, Entity } from 'typeorm';

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
}
