import { Injectable } from "@nestjs/common";
import { BaseProfile } from "./BaseProfile.service";

@Injectable()
export class FindActivedProfileByUid extends BaseProfile {
	execute(uid: string) {
		return this.repo().findOneBy({ uid, disabled: false });
	}
}
