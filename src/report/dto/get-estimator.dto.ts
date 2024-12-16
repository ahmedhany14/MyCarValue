import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsLatitude,
  IsLongitude,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimatorDto {
  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  @Min(1930)
  @Max(2022)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;
}
