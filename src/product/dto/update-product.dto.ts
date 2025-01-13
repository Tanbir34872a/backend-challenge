import {
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  IsEnum,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  discount?: number;

  @IsEnum(['In Stock', 'Stock Out'])
  @IsOptional()
  status?: 'In Stock' | 'Stock Out';
}
