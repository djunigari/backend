import { Injectable } from '@nestjs/common';
import { BaseCategory } from './BaseCategory.service';

@Injectable()
export class FindSubCategories extends BaseCategory {
    async execute(name: string) {
        const result = await this.repo().findOneBy({
            name: { $regex: `^${name}$`, $options: 'i' },
        });
        return result.subCategories;
    }
}
