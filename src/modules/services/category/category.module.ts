import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/modules/models/category.entity';
import { AddSubCategories } from './AddSubCategories.service';
import { BaseCategory } from './BaseCategory.service';
import { CreateCategory } from './CreateCategory.service';
import { DeleteCategory } from './DeleteCategory.service';
import { FindAllCategories } from './FindAllCategories.service';
import { FindCategory } from './FindCategory.service';
import { FindSubCategories } from './FindSubCategories.service';
import { RemoveSubCategories } from './RemoveSubCategories.service';
import { UpdateCategory } from './UpdateCategory.service';
import { UpdateSubCategoriesOfCategory } from './UpdateSubCategoriesOfCategory.service';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [
        BaseCategory,
        FindCategory,
        FindAllCategories,
        CreateCategory,
        UpdateCategory,
        DeleteCategory,
        UpdateSubCategoriesOfCategory,
        FindSubCategories,
        AddSubCategories,
        RemoveSubCategories,
    ],
    exports: [
        TypeOrmModule,
        FindCategory,
        FindAllCategories,
        CreateCategory,
        UpdateCategory,
        DeleteCategory,
        UpdateSubCategoriesOfCategory,
        FindSubCategories,
        AddSubCategories,
        RemoveSubCategories,
    ],
})
export class CategoryModule {}
