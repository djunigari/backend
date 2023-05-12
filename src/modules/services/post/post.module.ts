import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "src/modules/models/Post/Post.entity";
import { BasePost } from "./BasePost.service";
import { CreatePost } from "./CreatePost.service";
import { DeletePost } from "./DeletePost.service";
import { FindPostById } from "./FindPostById.service";
import { FindPostBySlug } from "./FindPostBySlug.service";
import { FindPostsByParams } from "./FindPostsByParams.service";
import { UpdatePost } from "./UpdatePost.service";

@Module({
	imports: [TypeOrmModule.forFeature([Post])],
	providers: [
		BasePost,
		CreatePost,
		UpdatePost,
		DeletePost,
		FindPostById,
		FindPostBySlug,
		FindPostsByParams,
	],
	exports: [
		CreatePost,
		UpdatePost,
		DeletePost,
		FindPostById,
		FindPostBySlug,
		FindPostsByParams,
	],
})
export class PostModule {}
