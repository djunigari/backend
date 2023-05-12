import { Injectable } from "@nestjs/common";
import { Post } from "src/modules/models/Post/Post.entity";
import { BasePost } from "./BasePost.service";

@Injectable()
export class UpdatePost extends BasePost {
	async execute(oldPost: Post, newPost: Post) {
		return this.repo().save({
			...oldPost,
			...newPost,
		});
	}
}
