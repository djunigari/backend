import { Injectable } from '@nestjs/common';
import { BaseCategory } from './BaseCategory.service';

@Injectable()
export class FindCategory extends BaseCategory {
    async execute(name: string) {
        return this.repo().findOneBy({
            name: { $regex: `^${name}$`, $options: 'i' },
        });
    }
}
