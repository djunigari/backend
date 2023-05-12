import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PageInfo } from "src/graphql/response/PageInfo";
import { Testimonial } from "src/modules/models/client/Testimonial.entity";
import { BaseTestimonial } from "./BaseTestimonial.service";
import { DeleteTestimonial } from "./DeleteTestimonial.service";
import { FindTestimonial } from "./FindTestimonial.service";
import { FindTestimonialByParams } from "./FindTestimonialByParams.service";
import { SaveTestimonial } from "./SaveTestimonial.service";

@Module({
	imports: [TypeOrmModule.forFeature([Testimonial, PageInfo])],
	providers: [
		BaseTestimonial,
		SaveTestimonial,
		FindTestimonial,
		FindTestimonialByParams,
		DeleteTestimonial,
	],
	exports: [
		SaveTestimonial,
		FindTestimonial,
		FindTestimonialByParams,
		DeleteTestimonial,
	],
})
export class TestimonialModule {}
