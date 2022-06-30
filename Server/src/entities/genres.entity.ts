import {
    Column, Entity, ManyToMany,
} from 'typeorm';
import { JoinTable } from 'typeorm/browser';
import { CommonsFields } from './commons-fields.entity';
import { Authors } from './authors.entity';
import { Books } from './books.entity';

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

    @ManyToMany(() => Books)
    @JoinTable()
        books: Books[];
}
