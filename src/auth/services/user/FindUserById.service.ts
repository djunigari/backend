import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/models/auth/User.entity";
import { MongoRepository } from "typeorm";
import { ObjectID } from "mongodb";

@Injectable()
export class FindUserById {
	constructor(
		@InjectRepository(User)
		private repo: MongoRepository<User>
	) {}

	execute(userId: string) {
		return this.repo.findOneBy({ _id: new ObjectID(userId) });
	}
}
