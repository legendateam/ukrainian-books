import { Column, Entity } from 'typeorm';

import { CommonsFields } from './commons-fields.entity';

@Entity()
export class BooksEntity extends CommonsFields {
    @Column({
        name: 'name',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        name: string;

    @Column({
        name: 'description',
        type: 'varchar',
        width: 2000,
        nullable: false,
        unique: true,
    })
        description: string;

    @Column({
        name: 'fileText',
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        fileText: string;

    @Column({
        name: 'cover',
        type: 'varchar',
        width: 255,
        nullable: true,
        default: null,
        unique: true,
    })
        cover?: string;

    @Column({
        name: 'fileAudio',
        type: 'varchar',
        width: 255,
        nullable: true,
        unique: true,
        default: null,
    })
        fileAudio?: string;
}
