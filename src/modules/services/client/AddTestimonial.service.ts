import { Injectable } from "@nestjs/common";
import { Client } from "src/modules/models/client/Client.entity";
import { ProfileResume } from "src/modules/models/client/ProfileResume.entity";
import { BaseClient } from "./BaseClient.service";

@Injectable()
export class AddTestimonial extends BaseClient {
	execute(client: Client, profileResume: ProfileResume) {
		client.testimonials = [...client.testimonials, profileResume];
		return this.repo().save(client);
	}
}
