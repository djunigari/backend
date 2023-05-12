import { Injectable } from "@nestjs/common";
import { Client } from "src/modules/models/client/Client.entity";
import { BaseClient } from "./BaseClient.service";

@Injectable()
export class RemoveLike extends BaseClient {
	execute(client: Client, profileUid: string) {
		client.likes = client.likes.filter((i) => i.uid !== profileUid);
		return this.repo().save(client);
	}
}
