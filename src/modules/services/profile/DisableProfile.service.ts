import { Injectable } from '@nestjs/common';
import { BaseProfile } from './BaseProfile.service';

@Injectable()
export class DisableProfile extends BaseProfile {
    async execute(uid: string) {
        const profile = await this.repo().findOneBy({ uid });
        if (!profile) {
            console.log(`Profile not founded from uid: ${uid}`);
            return;
        }
        return this.repo().save({ ...profile, disabled: true });
    }
}
