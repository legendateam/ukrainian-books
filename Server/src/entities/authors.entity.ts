import { Column, Entity } from 'typeorm';

import { CommonsFields } from './commons-fields.entity';

@Entity()
export class AuthorsEntity extends CommonsFields {
    @Column({
        name: 'firstName',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        firstName: string;

    @Column({
        name: 'lastName',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        lastName: string;

    @Column({
        name: 'firstName',
        type: 'varchar',
        width: 255,
        unique: true,
        nullable: true,
    })
        pseudonym?: string;

    @Column({
        name: 'dateBirthday',
        type: 'timestamp',
        nullable: false,
    })
        dateBirthday: string;

    @Column({
        name: 'dateDeath',
        type: 'timestamp',
        nullable: true,
        default: null,
    })
        dateDeath?: string;

    @Column({
        name: 'country',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        country: string;

    @Column({
        name: 'age',
        type: 'int',
        nullable: false,
    })
        age: number;

    @Column({
        name: 'biography',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        biography: string;

    @Column({
        name: 'photo',
        type: 'varchar',
        width: 255,
        nullable: true,
        default: null,
        unique: true,
    })
        photo?: string;
}
