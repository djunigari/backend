import { Field, ObjectType } from "@nestjs/graphql";
import { Testimonial } from "src/modules/models/client/Testimonial.entity";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { PageInfo } from "./PageInfo";

@ObjectType()
export class PaginatedTestimonial {
	@Field(() => PageInfo)
	pageInfo: PageInfo;

	@Field(() => [Testimonial])
	list: Testimonial[];
}
