import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/modules/models/category.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class BaseCategory {
    constructor(
        @InjectRepository(Category)
        private repository: MongoRepository<Category>,
    ) {}
    repo() {
        return this.repository;
    }
}
