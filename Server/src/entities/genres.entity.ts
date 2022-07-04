import {
    Column, Entity, ManyToMany, JoinTable,
} from 'typeorm';

import { Authors } from './authors.entity';
import { Books } from './books.entity';
import { CommonsFields } from './commons-fields.entity';

@Entity()
export class Genres extends CommonsFields {
    @Column({
        name: 'name',
        type: 'varchar',
        width: 50,
        unique: true,
        nullable: false,
    })
        name: string;

    @ManyToMany(() => Authors)
    @JoinTable()
        authors: Authors[];

    @ManyToMany(() => Books, (book) => book.genres)
    @JoinTable()
        books: Books[];
}
