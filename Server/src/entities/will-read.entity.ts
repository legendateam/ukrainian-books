import { Column, Entity } from 'typeorm';

import { CommonsFields } from './commons-fields.entity';

@Entity()
export class WillRead extends CommonsFields {
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
