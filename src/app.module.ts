import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { FirebaseModule } from "./auth/firebase/firebase.module";
import { GraphqlModule } from "./graphql/graphql.module";
import { ServerModule } from "./modules/services/server.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";
import { StripeModule } from "@golevelup/nestjs-stripe";
import { applyRawBodyOnlyTo } from "@golevelup/nestjs-webhooks";

@Module({
	imports: [
		ServerModule,
		FirebaseModule,
		AuthModule,
		GraphqlModule,
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (config: ConfigService) => ({
				type: "mongodb",
				url: config.get<string>("mongodb.url"),
				ssl: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				entities: ["dist/**/*.entity{.ts,.js}"],
				// Only enable this option if your application is in development,
				// otherwise use TypeORM migrations to sync entity schemas:
				// https://typeorm.io/#/migrations
				synchronize: true,
				logging: true,
			}),
			inject: [ConfigService],
		}),
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			imports: [ConfigModule],
			driver: ApolloDriver,
			useFactory: async (config: ConfigService) => ({
				autoSchemaFile: join(process.cwd(), "src/schema.gql"),
				// debug: process.env.NODE_ENV === "development", //false for production
				// playground: process.env.NODE_ENV === "development", //false for production
				debug: true, //false for production
				playground: true, //false for production

				cors: {
					origin: [
						"https://www.empresa.catalogojapao.com",
						"https://www.catalogojapao.com",
						"https://olajapao.com",
					],
					credentials: true,
				},
			}),
			inject: [ConfigService],
		}),
		StripeModule.forRootAsync(StripeModule, {
			imports: [ConfigModule],
			useFactory: async (config: ConfigService) => ({
				apiKey: config.get<string>("stripe.apiKey"),
				webhookConfig: {
					stripeWebhookSecret: config.get<string>(
						"stripe.stripeWebhookSecret"
					),
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [StripeModule],
	exports: [],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		applyRawBodyOnlyTo(consumer, {
			method: RequestMethod.ALL,
			path: "stripe/webhook",
		});
	}
}
