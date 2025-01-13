import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;

    // Check if the category already exists
    const existingCategory = await this.categoryRepo.findOneBy({ name });
    if (existingCategory) {
      throw new Error('Category with this name already exists.');
    }

    // Create and save the new category
    const category = this.categoryRepo.create(createCategoryDto);
    return this.categoryRepo.save(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepo.findOneBy({
      _id: new ObjectId(id),
    });
    if (!category) {
      throw new Error('Category not found.');
    }
    return category;
  }

  // async getCategoryById(id: string): Promise<Category> {
  //   try {
  //     console.log(`Received ID: ${id}`);

  //     // Check if the ID is a valid ObjectId
  //     if (!ObjectId.isValid(id)) {
  //       console.error('Invalid ObjectId format:', id);
  //       throw new Error('Invalid category ID format.');
  //     }

  //     // Convert the string ID to an ObjectId
  //     const objectId = new ObjectId(id);
  //     console.log(`Converted to ObjectId: ${objectId}`);

  //     // Attempt to find the category directly
  //     let category = await this.categoryRepo.findOneBy({
  //       _id: objectId, // Use `_id` field for MongoDB
  //     });

  //     console.log(`Direct Query Result: ${JSON.stringify(category)}`);

  //     // If the category is not found, attempt to fetch all categories and filter manually
  //     if (!category) {
  //       console.warn(
  //         'Category not found directly. Attempting to retrieve all categories.',
  //       );

  //       const allCategories = await this.categoryRepo.find();
  //       console.log(`All Categories: ${JSON.stringify(allCategories)}`);

  //       // Filter the category from the list
  //       category = allCategories.find((cat) => cat._id.toString() === id);

  //       console.log(`Filtered Category: ${JSON.stringify(category)}`);
  //       if (!category) {
  //         console.warn('Category not found after filtering.');
  //         throw new Error('Category not found.');
  //       }
  //     }

  //     console.log('Found Category:', JSON.stringify(category));
  //     return category;
  //   } catch (error) {
  //     console.error('Error in getCategoryById:', error.message, error.stack);
  //     throw new Error(error.message || 'An unknown error occurred.');
  //   }
  // }
}
