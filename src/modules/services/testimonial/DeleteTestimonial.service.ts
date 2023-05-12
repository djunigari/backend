import { Injectable } from "@nestjs/common";
import { Testimonial } from "src/modules/models/client/Testimonial.entity";
import { BaseTestimonial } from "./BaseTestimonial.service";

@Injectable()
export class DeleteTestimonial extends BaseTestimonial {
	execute(testimonial: Testimonial) {
		return this.repo().delete(testimonial);
	}
}
