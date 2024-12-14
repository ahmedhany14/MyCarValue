import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsLatitude,
    IsLongitude,
    Min,
    Max
} from 'class-validator'

export class CreateReportDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number

    @IsNotEmpty()
    @IsString()
    make: string

    @IsNotEmpty()
    @IsString()
    model: string


    @IsNotEmpty()
    @IsNumber()
    @Min(1930)
    @Max(2022)
    year: number

    @IsLongitude()
    lng: number


    @IsLatitude()
    lat: number
}