import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "src/modules/models/client/Client.entity";
import { ProfileResume } from "src/modules/models/client/ProfileResume.entity";
import { AddBookmark } from "./AddBookmark.service";
import { AddLike } from "./AddLike.service";
import { AddTestimonial } from "./AddTestimonial.service";
import { BaseClient } from "./BaseClient.service";
import { CreateClient } from "./CreateClient.service";
import { FindClientByUserId } from "./FindClientByUserId.service";
import { RemoveBookmark } from "./RemoveBookmark.service";
import { RemoveLike } from "./RemoveLike.service";
import { RemoveTestimonial } from "./RemoveTestimonial.service";

@Module({
	imports: [TypeOrmModule.forFeature([Client, ProfileResume])],
	providers: [
		BaseClient,
		CreateClient,
		FindClientByUserId,
		AddLike,
		RemoveLike,
		AddBookmark,
		RemoveBookmark,
		AddTestimonial,
		RemoveTestimonial,
	],
	exports: [
		CreateClient,
		FindClientByUserId,
		AddLike,
		RemoveLike,
		AddBookmark,
		RemoveBookmark,
		AddTestimonial,
		RemoveTestimonial,
	],
})
export class ClientModule {}
