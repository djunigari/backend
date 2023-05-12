import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [FirebaseService, ConfigService],
    exports: [FirebaseService],
})
export class FirebaseModule {}
