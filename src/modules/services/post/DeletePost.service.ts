import { Injectable } from "@nestjs/common";
import { BasePost } from "./BasePost.service";

@Injectable()
export class DeletePost extends BasePost {
	execute(slug: string) {
		return this.repo().delete({ slug });
	}
}
