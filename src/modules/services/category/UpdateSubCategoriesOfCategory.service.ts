import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseCategory } from './BaseCategory.service';

@Injectable()
export class UpdateSubCategoriesOfCategory extends BaseCategory {
    async execute(name: string, subCategories: string[]) {
        const category = await this.repo().findOneBy({
            name: { $regex: `^${name}$`, $options: 'i' },
        });

        if (!category) {
            throw new NotFoundException('Category not exists');
        }

        const uniqueSubs = new Map();
        for (const sub of subCategories) {
            uniqueSubs.set(sub.toLocaleLowerCase(), sub);
        }

        category.subCategories = [...uniqueSubs.values()].sort((a, b) =>
            a < b ? -1 : 1,
        );

        return this.repo().save(category);
    }
}
