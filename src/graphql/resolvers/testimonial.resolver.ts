import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserRecord } from "firebase-admin/auth";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { ClientAuthGuard } from "src/auth/guards/client-auth.guard";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { FindUserById } from "src/auth/services/user/FindUserById.service";
import { Account } from "src/modules/models/auth/Account.entity";
import { ProfileResume } from "src/modules/models/client/ProfileResume.entity";
import { Testimonial } from "src/modules/models/client/Testimonial.entity";
import { TestimonialStatus } from "src/modules/models/enums/TestimonialStatus.enum";
import { TypeProfile } from "src/modules/models/enums/typeProfile.enum";
import { AddTestimonial } from "src/modules/services/client/AddTestimonial.service";
import { FindClientByUserId } from "src/modules/services/client/FindClientByUserId.service";
import { RemoveTestimonial } from "src/modules/services/client/RemoveTestimonial.service";
import { FindProfileByUid } from "src/modules/services/profile/FindProfileByUid.service";
import { DeleteTestimonial } from "src/modules/services/testimonial/DeleteTestimonial.service";
import { FindTestimonial } from "src/modules/services/testimonial/FindTestimonial.service";
import { FindTestimonialByParams } from "src/modules/services/testimonial/FindTestimonialByParams.service";
import { SaveTestimonial } from "src/modules/services/testimonial/SaveTestimonial.service";
import { PaginatedTestimonial } from "../response/PaginatedTestimonial";

@Resolver(() => Testimonial)
export class TestimonialResolver {
	constructor(
		private find: FindTestimonial,
		private findByParams: FindTestimonialByParams,
		private findUser: FindUserById,
		private save: SaveTestimonial,
		private remove: DeleteTestimonial,
		private addTestimonial: AddTestimonial,
		private removeToClient: RemoveTestimonial,
		private findClientByUserId: FindClientByUserId,
		private findProfile: FindProfileByUid
	) {}

	@UseGuards(ClientAuthGuard)
	@Mutation(() => Testimonial)
	async saveTestimonial(
		@CurrentUser() account: Account,
		@Args("profileUid", { type: () => String }) profileUid: string,
		@Args("content", { type: () => String }) content: string
	) {
		const userId = account.userId;

		const user = await this.findUser.execute(userId);

		const founded = await this.find.execute(String(userId), profileUid);
		if (founded)
			return this.save.execute({
				...founded,
				status: TestimonialStatus.WAITING,
				content,
				userName: user.name || user.email,
			});

		const newTestimonial = new Testimonial();
		newTestimonial.userId = String(userId);
		newTestimonial.profileUid = profileUid;
		newTestimonial.content = content;
		newTestimonial.userName = user.name || user.email;
		newTestimonial.status = TestimonialStatus.WAITING;
		const testimonial = await this.save.execute(newTestimonial);

		const client = await this.findClientByUserId.execute(userId);
		if (client.testimonials.some((p) => p.uid === profileUid))
			return testimonial;

		const profile = await this.findProfile.execute(profileUid);
		const profileResume = new ProfileResume();
		profileResume.uid = profileUid;
		profileResume.imageUrl = profile.imageUrl;
		profileResume.displayName = profile.displayName;

		await this.addTestimonial.execute(client, profileResume);

		return testimonial;
	}

	@UseGuards(ClientAuthGuard)
	@Mutation(() => String)
	async removeTestimonial(
		@CurrentUser() account: Account,
		@Args("profileUid", { type: () => String }) profileUid: string
	) {
		const userId = account.userId;

		const founded = await this.find.execute(String(userId), profileUid);
		if (!founded) return "ok";
		await this.remove.execute(founded);

		const client = await this.findClientByUserId.execute(userId);
		if (!client.testimonials.some((p) => p.uid === profileUid)) return "ok";

		await this.removeToClient.execute(client, profileUid);
		return "ok";
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Testimonial)
	async changeTestimonialStatus(
		@CurrentUser() user: UserRecord,
		@Args("userId", { type: () => String }) userId: string,
		@Args("status", { type: () => String }) status: string
	) {
		const founded = await this.find.execute(userId, user.uid);
		if (!founded) throw new Error("Testimonial do not exist!");

		return this.save.execute({
			...founded,
			status: TestimonialStatus[status?.toUpperCase()],
		});
	}

	@Query(() => Testimonial, { nullable: true })
	testimonial(
		@Args("userId", { type: () => String }) userId: string,
		@Args("profileUid", { type: () => String }) profileUid: string
	) {
		return this.find.execute(userId, profileUid);
	}

	@Query(() => PaginatedTestimonial)
	async testimonials(
		@Args("profileUid", { type: () => String, nullable: true })
		profileUid: string,
		@Args("take", { type: () => Number, nullable: true, defaultValue: 10 })
		take?: number,
		@Args("skip", { type: () => Number, nullable: true, defaultValue: 0 })
		skip?: number
	) {
		const profile = await this.findProfile.execute(profileUid);
		let status = null;

		if (profile.typeProfile === TypeProfile.FREE) {
			status = null;
		} else {
			status = TestimonialStatus.APPROVED;
		}

		return this.findByParams.execute(
			{
				profileUid,
				status,
			},
			take,
			skip
		);
	}

	@UseGuards(ClientAuthGuard)
	@Query(() => PaginatedTestimonial)
	async clientTestimonials(
		@CurrentUser() account: Account,
		@Args("take", { type: () => Number, nullable: true, defaultValue: 10 })
		take?: number,
		@Args("skip", { type: () => Number, nullable: true, defaultValue: 0 })
		skip?: number
	) {
		const userId = account.userId;
		return this.findByParams.execute({ userId }, take, skip);
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => PaginatedTestimonial)
	async profileTestimonialsByStatus(
		@CurrentUser() user: UserRecord,
		@Args("status", { type: () => String, defaultValue: false })
		status: string,
		@Args("take", { type: () => Number, nullable: true, defaultValue: 10 })
		take?: number,
		@Args("skip", { type: () => Number, nullable: true, defaultValue: 0 })
		skip?: number
	) {
		let testimonialStatus = null;

		if (status) {
			testimonialStatus = TestimonialStatus[status?.toUpperCase()];
		}

		return this.findByParams.execute(
			{
				profileUid: user.uid,
				status: testimonialStatus,
			},
			take,
			skip
		);
	}
}
