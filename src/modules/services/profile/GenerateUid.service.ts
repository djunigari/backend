import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConfig } from "src/modules/models/AppConfig.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class GenerateUid {
	constructor(
		@InjectRepository(AppConfig)
		private repo: MongoRepository<AppConfig>
	) {}

	async execute() {
		let config = await this.repo.findOneBy({ name: "lastIdGenerated" });

		if (!config) {
			const appConfig = new AppConfig();
			appConfig.name = "lastIdGenerated";
			appConfig.value = "0";

			config = await this.repo.save(appConfig);
		}

		const id = Number(config.value) + 1;

		config.value = String(id).padStart(6, "0");
		await this.repo.save(config);
		return "cat-" + config.value;
	}
}
