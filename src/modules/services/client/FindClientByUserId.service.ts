import { Injectable } from "@nestjs/common";
import { BaseClient } from "./BaseClient.service";

@Injectable()
export class FindClientByUserId extends BaseClient {
	execute(userId: string) {
		return this.repo().findOneBy({ userId });
	}
}
