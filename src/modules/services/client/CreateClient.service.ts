import { Injectable } from "@nestjs/common";
import { Client } from "src/modules/models/client/Client.entity";
import { BaseClient } from "./BaseClient.service";

@Injectable()
export class CreateClient extends BaseClient {
	execute(userId: string) {
		const client = new Client();
		client.userId = userId;
		return this.repo().save(client);
	}
}
