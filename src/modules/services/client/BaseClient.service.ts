import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "src/modules/models/client/Client.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class BaseClient {
	constructor(
		@InjectRepository(Client)
		private repository: MongoRepository<Client>
	) {}
	repo() {
		return this.repository;
	}
}
