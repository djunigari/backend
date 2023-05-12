import { Injectable } from "@nestjs/common";
import { BaseTestimonial } from "./BaseTestimonial.service";

@Injectable()
export class FindTestimonial extends BaseTestimonial {
	execute(userId: string, profileUid: string) {
		return this.repo().findOneBy({ userId, profileUid });
	}
}
