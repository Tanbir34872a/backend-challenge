import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import generateProductCode from './utils/generate-product-code';
import { CreateProductDto } from './dto/create-product.dto';
import { ObjectId } from 'mongodb';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async createProduct(dto: CreateProductDto) {
    const category = await this.categoryRepo.findOneBy({
      _id: new ObjectId(dto.categoryId),
    });
    if (!category) throw new Error('Invalid category');

    const productCode = generateProductCode(dto.name);

    const product = this.productRepo.create({ ...dto, productCode });
    return this.productRepo.save(product);
  }

  async updateProduct(id: string, updates: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ _id: new ObjectId(id) });
    if (!product) throw new Error('Product not found');

    Object.assign(product, updates);
    return this.productRepo.save(product);
  }

  async getProducts(filters: FilterProductDto) {
    const query = {};

    if (filters.categoryId) query['categoryId'] = filters.categoryId;
    if (filters.name) query['name'] = { $regex: filters.name, $options: 'i' };

    const products = await this.productRepo.find(query);
    return products.map((product) => ({
      ...product,
      finalPrice: product.price * (1 - product.discount / 100),
    }));
  }
}
