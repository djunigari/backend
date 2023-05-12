import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/models/auth/User.entity";
import { MongoRepository } from "typeorm";
import { ObjectID } from "mongodb";

@Injectable()
export class ChangeUserName {
	constructor(
		@InjectRepository(User)
		private repo: MongoRepository<User>
	) {}

	async execute(userId: ObjectID, name: string) {
		const founded = await this.repo.findOneBy({
			_id: userId,
		});
		if (!founded) throw new Error("User do not exist");

		await this.repo.save({ ...founded, name });
		return "ok";
	}
}
