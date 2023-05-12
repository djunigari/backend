import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/modules/models/auth/Account.entity";
import { PhoneNumber } from "src/modules/models/auth/PhoneNumber.entity";
import { User } from "src/modules/models/auth/User.entity";
import { UserPhoneNumberHistory } from "src/modules/models/auth/UserPhoneNumberHistory.entity";
import { PhoneNumberCodeVerification } from "src/modules/models/PhoneNumberCodeVerification.entity";
import { AuthLoginService } from "./auth-login.service";
import { AuthResolver } from "./auth.resolver";
import { FirebaseService } from "./firebase/firebase.service";
import { FindAccountByUserId } from "./services/account/FindAccountByUserId.service";
import { AuthenticationService } from "./services/Authentication.service";
import { GrantTempAdminRole } from "./services/GrantTempAdminRole.service";
import { CreatePhoneNumber } from "./services/phoneNumber/CreatePhoneNumber.service";
import { CreateUserPhoneNumberHistory } from "./services/phoneNumber/CreateUserPhoneNumberHistory.service";
import { DeletePhoneNumber } from "./services/phoneNumber/DeletePhoneNumber.service";
import { DeletePhoneNumberByUid } from "./services/phoneNumber/DeletePhoneNumberByUid.service";
import { FindPhoneNumber } from "./services/phoneNumber/FindPhoneNumber.service";
import { FindPhoneNumberByUid } from "./services/phoneNumber/FindPhoneNumberByUid.service";
import { SetFirebaseUserPhoneNumber } from "./services/SetUserPhoneNumber.service";
import { UpdateFirebaseUserPhoneNumber } from "./services/UpdateUserPhoneNumber.service";
import { ChangeUserImage } from "./services/user/ChangeUserImage.service";
import { ChangeUserName } from "./services/user/ChangeUserName.service";
import { DeleteUserAccount } from "./services/user/DeleteUserAccount.service";
import { FindUserById } from "./services/user/FindUserById.service";
import { CreatePhoneCodeVerification } from "./services/userFirebase/CreatePhoneCodeVerification.service";
import { FindByPhoneNumber } from "./services/userFirebase/FindByPhoneNumber.service";
import { VerifyPhoneCodeVerification } from "./services/userFirebase/VerifyPhoneCodeVerification.service";
import { ClientAuthStrategy } from "./strategies/client-auth.strategy";
import { FirebaseAdminRoleStrategy } from "./strategies/firebase-admin-role.strategy";
import { FirebaseAuthStrategy } from "./strategies/firebase-auth.strategy";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Account,
			User,
			PhoneNumberCodeVerification,
			UserPhoneNumberHistory,
			PhoneNumber,
		]),
		PassportModule,
	],
	providers: [
		FirebaseService,
		FirebaseAuthStrategy,
		FirebaseAdminRoleStrategy,
		ClientAuthStrategy,
		AuthLoginService,
		AuthResolver,
		AuthenticationService,
		GrantTempAdminRole,
		UpdateFirebaseUserPhoneNumber,
		SetFirebaseUserPhoneNumber,
		FindAccountByUserId,
		FindUserById,
		ChangeUserName,
		ChangeUserImage,
		DeleteUserAccount,
		CreatePhoneCodeVerification,
		VerifyPhoneCodeVerification,
		FindByPhoneNumber,
		CreatePhoneNumber,
		CreateUserPhoneNumberHistory,
		FindPhoneNumber,
		FindPhoneNumberByUid,
		DeletePhoneNumber,
		DeletePhoneNumberByUid,
	],
	exports: [
		UpdateFirebaseUserPhoneNumber,
		SetFirebaseUserPhoneNumber,
		FindUserById,
		ChangeUserName,
		ChangeUserImage,
		DeleteUserAccount,
		CreatePhoneCodeVerification,
		VerifyPhoneCodeVerification,
		FindByPhoneNumber,
		CreatePhoneNumber,
		CreateUserPhoneNumberHistory,
		FindPhoneNumber,
		FindPhoneNumberByUid,
		DeletePhoneNumber,
		DeletePhoneNumberByUid,
	],
})
export class AuthModule {}
