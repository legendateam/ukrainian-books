import { Column, Entity } from 'typeorm';

import { CommonsFields } from './commons-fields.entity';

@Entity()
export class Ratings extends CommonsFields {
    @Column({
        name: 'rate',
        type: 'int',
        nullable: false,
        update: true,
    })
        rate: number;

    @Column({
        name: 'userId',
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        name: 'bookId',
        type: 'int',
        nullable: false,
        unique: true,
    })
        bookId: number;
}
