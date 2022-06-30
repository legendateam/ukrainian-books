import { Column, Entity } from 'typeorm';

@Entity()
export class Favorites {
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
