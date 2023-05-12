import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Category {
    @ObjectIdColumn()
    _id: string;

    @Field(() => String)
    @Column({ unique: true })
    name: string;

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    subCategories?: string[];
}
