import { IsNotEmpty, IsNumber, IsPositive, Max } from 'class-validator';

export class AddRatingDto {
  @IsPositive({ message: 'Ingresa un numero positivo!' })
  @Max(10, { message: 'Ingresa un numero no mayor a 10 !' })
  @IsNotEmpty({ message: 'Ingresa un valor de calificación!' })
  @IsNumber({}, { message: 'Ingresa valor tipo numerico' })
  value: number;
}
