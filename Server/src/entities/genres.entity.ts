import { Column, Entity } from 'typeorm';
import { CommonsFields } from './commons-fields.entity';

@Entity()
export class GenresEntity extends CommonsFields {
    @Column({
        name: 'name',
        type: 'varchar',
        width: 50,
        unique: true,
        nullable: false,
    })
        name: string;
}
