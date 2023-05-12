import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class AppConfig {
    @ObjectIdColumn()
    _id: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    value?: string;
}
