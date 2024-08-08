import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Ingresa un correo!' })
  @IsEmail({}, { message: 'Ingresa un correo valido!' })
  email: string;

  @IsNotEmpty({ message: 'Ingresa una contraseña!' })
  password: string;
}
