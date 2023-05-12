import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseCategory } from './BaseCategory.service';

@Injectable()
export class RemoveSubCategories extends BaseCategory {
    async execute(name: string, removeSubCategories: string[]) {
        const category = await this.repo().findOneBy({
            name: { $regex: `^${name}$`, $options: 'i' },
        });

        if (!category) {
            throw new NotFoundException('Category not exists');
        }

        category.subCategories = category.subCategories.filter(
            (item) =>
                !removeSubCategories.some(
                    (r) => r.toLocaleLowerCase() === item.toLocaleLowerCase(),
                ),
        );
        return this.repo().save(category);
    }
}
