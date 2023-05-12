import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Testimonial } from "src/modules/models/client/Testimonial.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class BaseTestimonial {
	constructor(
		@InjectRepository(Testimonial)
		private repository: MongoRepository<Testimonial>
	) {}
	repo() {
		return this.repository;
	}
}
