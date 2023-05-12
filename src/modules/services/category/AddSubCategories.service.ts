import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseCategory } from './BaseCategory.service';

@Injectable()
export class AddSubCategories extends BaseCategory {
    async execute(name: string, subCategories: string[]) {
        const category = await this.repo().findOneBy({
            name: { $regex: `^${name}$`, $options: 'i' },
        });

        if (!category) {
            throw new NotFoundException('Category not exists');
        }

        const subs = new Set(category.subCategories);
        subCategories.map((i) => subs.add(i));
        category.subCategories = [...subs];

        return this.repo().save(category);
    }
}
