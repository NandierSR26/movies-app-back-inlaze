import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Ingresa un nombre!' })
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Ingresa un correo valido!' })
  @IsNotEmpty({ message: 'Ingresa un correo!' })
  email: string;

  @IsNotEmpty({ message: 'Ingresa una contraseña!' })
  @MinLength(6, { message: 'Ingresa una contraseña de al menos 6 caracteres' })
  @IsString()
  password: string;
}
