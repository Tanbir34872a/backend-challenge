import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Get,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.updateProduct(id, dto);
  }

  @Get()
  async getProducts(@Query() filters: FilterProductDto) {
    return this.productService.getProducts(filters);
  }
}
