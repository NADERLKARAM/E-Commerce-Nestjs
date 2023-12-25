import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  sold: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  priceAfterDiscount: number;

  @IsNotEmpty()
  @IsArray()
  colors: string[];

  @IsOptional()
  @IsNumber()
  ratingsAverage: number;

  @IsOptional()
  @IsNumber()
  ratingsQuantity: number;

}