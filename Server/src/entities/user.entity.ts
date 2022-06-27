import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        type: 'varchar',
        width: 25,
    })
        name: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        email: string;

    @Column({
        type: 'int',
    })
        age: number;

    @Column({
        default: new Date(),
        type: 'timestamp',
    })
        createdAt: string;

    @Column({
        nullable: true,
        type: 'timestamp',
    })
        deletedAt: string;
}
