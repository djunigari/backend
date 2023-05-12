import { Injectable } from "@nestjs/common";
import { BasePost } from "./BasePost.service";

@Injectable()
export class FindPostBySlug extends BasePost {
	execute(slug: string) {
		return this.repo().findOneBy({ slug });
	}
}
