import { Injectable } from "@nestjs/common";
import { Post } from "src/modules/models/Post/Post.entity";
import { BasePost } from "./BasePost.service";

@Injectable()
export class CreatePost extends BasePost {
	async execute(newPost: Post) {
		return this.repo().save(newPost);
	}
}
