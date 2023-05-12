import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserRecord } from "firebase-admin/auth";
import { CreatePhoneCodeVerification } from "src/auth/services/userFirebase/CreatePhoneCodeVerification.service";
import { VerifyPhoneCodeVerification } from "src/auth/services/userFirebase/VerifyPhoneCodeVerification.service";
import { Account } from "src/modules/models/auth/Account.entity";
import { AuthLoginService } from "./auth-login.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { AdminRoleGuard } from "./guards/admin-role.guard";
import { ClientAuthGuard } from "./guards/client-auth.guard";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { Auth } from "./models/auth-login.model";
import { GrantTempAdminRole } from "./services/GrantTempAdminRole.service";
import { SetFirebaseUserPhoneNumber } from "./services/SetUserPhoneNumber.service";
import { UpdateFirebaseUserPhoneNumber } from "./services/UpdateUserPhoneNumber.service";
import { ChangeUserImage } from "./services/user/ChangeUserImage.service";
import { ChangeUserName } from "./services/user/ChangeUserName.service";
import { DeleteUserAccount } from "./services/user/DeleteUserAccount.service";
import { FindByPhoneNumber } from "./services/userFirebase/FindByPhoneNumber.service";

@Resolver()
export class AuthResolver {
	constructor(
		private readonly authLoginService: AuthLoginService,
		private readonly grantTempAdminRole: GrantTempAdminRole,
		private readonly changeName: ChangeUserName,
		private readonly changeImage: ChangeUserImage,
		private readonly deleteUserAccount: DeleteUserAccount,
		private createPhoneCode: CreatePhoneCodeVerification,
		private verifyPhoneCode: VerifyPhoneCodeVerification,
		private setUserPhoneNumber: SetFirebaseUserPhoneNumber,
		private updatePhoneNumber: UpdateFirebaseUserPhoneNumber,
		private findByPhoneNumber: FindByPhoneNumber
	) {}

	@Mutation(() => Auth)
	@UseGuards(GqlAuthGuard)
	async login(@CurrentUser() user: UserRecord) {
		const userId = user.uid;
		return this.authLoginService.login(userId);
	}

	@Query(() => Auth)
	@UseGuards(GqlAuthGuard)
	async whoAmI(@CurrentUser() user: UserRecord) {
		return user;
	}

	@UseGuards(AdminRoleGuard)
	@Query(() => String)
	isAdmin() {
		return "ok";
	}

	@UseGuards(AdminRoleGuard)
	@Mutation(() => String)
	grantAdminRole(
		@Args("email", { type: () => String })
		email: string
	) {
		this.grantTempAdminRole.execute(email);
		return "ok";
	}

	@Mutation(() => String)
	firstAdmin() {
		this.grantTempAdminRole.execute("admin@admin.com");
		return "ok";
	}

	@UseGuards(ClientAuthGuard)
	@Mutation(() => String)
	changeUserName(
		@CurrentUser() account: Account,
		@Args("name", { type: () => String })
		name: string
	) {
		this.changeName.execute(account.userId, name);
		return "ok";
	}

	@UseGuards(ClientAuthGuard)
	@Mutation(() => String)
	changeUserImage(
		@CurrentUser() account: Account,
		@Args("imageUrl", { type: () => String })
		imageUrl: string
	) {
		this.changeImage.execute(account.userId, imageUrl);
		return "ok";
	}

	@UseGuards(ClientAuthGuard)
	@Mutation(() => String)
	deleteAccount(@CurrentUser() account: Account) {
		this.deleteUserAccount.execute(account.userId);
		return "ok";
	}

	@Mutation(() => String)
	async createPhoneCodeVerification(
		@Args("phoneNumber", { type: () => String }) phoneNumber: string,
		@Args("recaptchaToken", { type: () => String }) recaptchaToken: string
	) {
		const founded = await this.findByPhoneNumber.execute(phoneNumber);
		console.log(founded);
		if (founded) throw new Error("Phone number already exist");
		return this.createPhoneCode.execute(phoneNumber, recaptchaToken);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => String)
	async verifyPhoneCodeVerification(
		@CurrentUser() user: UserRecord,
		@Args("sessionInfo", { type: () => String }) sessionInfo: string,
		@Args("phoneNumber", { type: () => String }) phoneNumber: string,
		@Args("code", { type: () => String }) code: string
	) {
		await this.verifyPhoneCode.execute(sessionInfo, phoneNumber, code);
		await this.setUserPhoneNumber.execute(user.uid, phoneNumber);
		return "ok";
	}

	@UseGuards(AdminRoleGuard)
	@Mutation(() => String)
	async updateUserPhoneNumber(
		@Args("uid", { type: () => String }) uid: string,
		@Args("phoneNumber", { type: () => String }) phoneNumber: string
	) {
		await this.updatePhoneNumber.execute(uid, phoneNumber);
		return "ok";
	}
}
