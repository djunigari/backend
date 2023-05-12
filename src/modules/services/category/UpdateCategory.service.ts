import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseCategory } from './BaseCategory.service';

@Injectable()
export class UpdateCategory extends BaseCategory {
    async execute(oldName: string, name: string) {
        const category = await this.repo().findOneBy({
            name: { $regex: `^${oldName}$`, $options: 'i' },
        });

        if (!category) {
            throw new NotFoundException('Category not exists');
        }
        category.name = name;
        return this.repo().save(category);
    }
}
