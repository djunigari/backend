import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity()
export class PhoneNumberCodeVerification {
    @ObjectIdColumn()
    _id: string;

    @Field(() => String)
    @Column({ unique: true })
    phoneNumber: string;

    @Field(() => String)
    @Column()
    recaptchaToken: string;

    @Field(() => String)
    @Column()
    sessionInfo: string;
}
