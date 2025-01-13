import { IsString, IsOptional } from 'class-validator';

export class FilterProductDto {
  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
