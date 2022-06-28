import { Column, Entity } from 'typeorm';

import { roleEnum } from '../enums';
import { CommonsFields } from './commons-fields.entity';

@Entity()
export class User extends CommonsFields {
    @Column({
        name: 'nickName',
        type: 'varchar',
        unique: true,
        length: 50,
        nullable: false,
    })
        nickName: string;

    @Column({
        name: 'password',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        password: string;

    @Column({
        name: 'email',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        email :string;

    @Column({
        name: 'role',
        type: 'varchar',
        width: 5,
        nullable: true,
        default: roleEnum.USER,
    })
        role?: string;
}
