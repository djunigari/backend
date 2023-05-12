import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
    @Field()
    totalCount: number;
    @Field()
    startCursor: number;
    @Field()
    endCursor: number;
    @Field()
    take: number;
    @Field()
    skip: number;
    @Field()
    hasNextPage: boolean;
    @Field()
    hasPreviousPage: boolean;
}
