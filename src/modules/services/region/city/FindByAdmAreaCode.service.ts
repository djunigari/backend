import { Injectable } from "@nestjs/common";
import { BaseCity } from "./BaseCity.service";

@Injectable()
export class FindByAdmAreaCode extends BaseCity {
	execute(admAreaCode: string) {
		return this.repo().findOneBy({ admAreaCode });
	}
}
