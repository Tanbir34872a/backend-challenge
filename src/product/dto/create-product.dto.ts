import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  discount?: number;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsEnum(['In Stock', 'Stock Out'])
  @IsOptional()
  status?: 'In Stock' | 'Stock Out';

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
