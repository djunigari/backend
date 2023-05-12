import { Injectable } from "@nestjs/common";
import { Client } from "src/modules/models/client/Client.entity";
import { BaseClient } from "./BaseClient.service";

@Injectable()
export class RemoveTestimonial extends BaseClient {
	execute(client: Client, profileUid: string) {
		client.testimonials = client.testimonials.filter(
			(i) => i.uid !== profileUid
		);
		return this.repo().save(client);
	}
}
