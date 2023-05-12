import { Injectable } from "@nestjs/common";
import { BasePrefecture } from "./BasePrefecture.service";

@Injectable()
export class FindByPrefCode extends BasePrefecture {
	execute(prefCode: string) {
		return this.repo().findOneBy({ prefCode });
	}
}
