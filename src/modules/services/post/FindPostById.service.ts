import { Injectable } from "@nestjs/common";
import { BasePost } from "./BasePost.service";

@Injectable()
export class FindPostById extends BasePost {
	execute(id: string) {
		return this.repo().findOneBy({ id });
	}
}
