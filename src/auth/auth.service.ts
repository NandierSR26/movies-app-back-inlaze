import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  login() {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const userGuestSessionId = await this.createGuessSession();
      const user = this.usersRepository.create({
        ...userData,
        guest_session_id: userGuestSessionId,
        password: bcrypt.hashSync(password, 10),
      });

      await this.usersRepository.save(user);
      console.log({ user });

      return {
        user,
      };
    } catch (error) {}
  }

  checkToken() {}

  private async createGuessSession() {
    let guest_session_id: string = '';

    const resp = await fetch(
      `${process.env.TMDB_API_BASE_URL}/authentication/guest_session/new?api_key=${process.env.TMDB_APY_KEY}`,
    );
    const data = await resp.json();
    guest_session_id = data.guest_session_id;

    fetch(
      `${process.env.TMDB_API_BASE_URL}/guest_session/${guest_session_id}/rated/movies?api_key=${process.env.TMDB_APY_KEY}`,
    );

    return guest_session_id;
  }
}
