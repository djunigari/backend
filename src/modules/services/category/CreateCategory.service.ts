import { Injectable } from '@nestjs/common';
import { BaseCategory } from './BaseCategory.service';

@Injectable()
export class CreateCategory extends BaseCategory {
    async execute(name: string, subCategories?: string[]) {
        if (
            await this.repo().findOneBy({
                name: { $regex: `^${name}$`, $options: 'i' },
            })
        ) {
            throw new Error('Category already exists');
        }

        const subs = [...new Set(subCategories)];

        return this.repo().save({
            name,
            subCategories: subs,
        });
    }
}
