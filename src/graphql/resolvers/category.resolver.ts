import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { Category } from 'src/modules/models/category.entity';
import { AddSubCategories } from 'src/modules/services/category/AddSubCategories.service';
import { CreateCategory } from 'src/modules/services/category/CreateCategory.service';
import { DeleteCategory } from 'src/modules/services/category/DeleteCategory.service';
import { FindAllCategories } from 'src/modules/services/category/FindAllCategories.service';
import { FindCategory } from 'src/modules/services/category/FindCategory.service';
import { RemoveSubCategories } from 'src/modules/services/category/RemoveSubCategories.service';
import { UpdateCategory } from 'src/modules/services/category/UpdateCategory.service';
import { UpdateSubCategoriesOfCategory } from 'src/modules/services/category/UpdateSubCategoriesOfCategory.service';

@Resolver(() => Category)
export class CategoryResolver {
    constructor(
        private find: FindCategory,
        private findAll: FindAllCategories,
        private create: CreateCategory,
        private update: UpdateCategory,
        private remove: DeleteCategory,
        private updateSubCategories: UpdateSubCategoriesOfCategory,
        private addSubCategories: AddSubCategories,
        private removeSubCategories: RemoveSubCategories,
    ) {}

    @UseGuards(AdminRoleGuard)
    @Mutation(() => Category)
    updateCategoryName(
        @Args('name', { type: () => String }) name: string,
        @Args('newName') newName: string,
    ) {
        return this.update.execute(name, newName);
    }

    @UseGuards(AdminRoleGuard)
    @Mutation(() => Category)
    newCategory(
        @Args('name') name: string,
        @Args('subCategories', { type: () => [String], nullable: true })
        subCategories?: string[],
    ) {
        return this.create.execute(name, subCategories);
    }

    @UseGuards(AdminRoleGuard)
    @Mutation(() => String)
    async deleteCategory(@Args('name') name: string) {
        const res = await this.remove.execute(name);
        return `name:{${name}}, category deleted - quantity of deleted: ${res.affected}`;
    }

    @UseGuards(AdminRoleGuard)
    @Mutation(() => Category)
    updateSubCategoriesOfCategory(
        @Args('name') name: string,
        @Args('subCategories', { type: () => [String], nullable: true })
        subCategories?: string[],
    ) {
        return this.updateSubCategories.execute(name, subCategories);
    }

    @UseGuards(AdminRoleGuard)
    @Mutation(() => Category)
    async addSubCategoriesToCategory(
        @Args('name', { type: () => String }) name: string,
        @Args('subCategories', { type: () => [String] })
        subCategories: string[],
    ) {
        try {
            const res = await this.addSubCategories.execute(
                name,
                subCategories,
            );
            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @UseGuards(AdminRoleGuard)
    @Mutation(() => Category)
    removeSubCategoriesToCategory(
        @Args('name', { type: () => String }) name: string,
        @Args('subCategories', { type: () => [String] })
        subCategories: string[],
    ) {
        return this.removeSubCategories.execute(name, subCategories);
    }

    @Query(() => Category)
    async category(@Args('name', { type: () => String }) name: string) {
        const founded = await this.find.execute(name);
        if (!founded) throw new NotFoundException('Category does not exist!');
        return founded;
    }

    @Query(() => [Category])
    categories() {
        return this.findAll.execute();
    }

    @Query(() => String)
    memoryUsed() {
        const used = process.memoryUsage().heapUsed / (1024 * 1024);
        console.log(used);
        const total = process.memoryUsage().heapTotal / (1024 * 1024);
        console.log(total);
        console.log(process.memoryUsage());
        return process.memoryUsage().heapUsed;
    }
}
