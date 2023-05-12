import { Injectable } from "@nestjs/common";
import { Client } from "src/modules/models/client/Client.entity";
import { BaseClient } from "./BaseClient.service";

@Injectable()
export class RemoveBookmark extends BaseClient {
	execute(client: Client, profileUid: string) {
		client.bookmarks = client.bookmarks.filter((i) => i.uid !== profileUid);
		return this.repo().save(client);
	}
}
