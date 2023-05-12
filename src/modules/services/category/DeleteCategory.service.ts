import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseCategory } from './BaseCategory.service';

@Injectable()
export class DeleteCategory extends BaseCategory {
    async execute(name: string) {
        const category = await this.repo().findOneBy({
            name: { $regex: `^${name}$`, $options: 'i' },
        });
        if (!category) {
            throw new NotFoundException('Category not exists');
        }
        return this.repo().delete({ name: category.name });
    }
}
