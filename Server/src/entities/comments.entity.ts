import { Column, Entity } from 'typeorm';

import { CommonsFields } from './commons-fields.entity';

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
        bookId: number

    @Column({
        name: 'text',
        type: 'text',
        nullable: false,
    })
        text: string;
}
