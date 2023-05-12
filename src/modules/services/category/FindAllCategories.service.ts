import { Injectable } from '@nestjs/common';
import { BaseCategory } from './BaseCategory.service';

@Injectable()
export class FindAllCategories extends BaseCategory {
    async execute() {
        return this.repo().find();
    }
}
