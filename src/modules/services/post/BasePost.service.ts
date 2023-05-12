import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/modules/models/Post/Post.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class BasePost {
	constructor(
		@InjectRepository(Post)
		private repository: MongoRepository<Post>
	) {}
	repo() {
		return this.repository;
	}
}
