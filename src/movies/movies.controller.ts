import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AddRatingDto } from './dto/add-rating.dto';
import { Users } from 'src/auth/entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AuthGuard)
  @Post('/add-rating/:id')
  addRating(
    @Request() req: Request,
    @Param('id') id: number,
    @Body() addRatingDto: AddRatingDto,
  ) {
    const { guest_session_id } = req['user'] as Users;
    return this.moviesService.rateMovie(id, guest_session_id, addRatingDto);
  }

  @Get('/add-favorite/:id')
  @UseGuards(AuthGuard)
  addFavorite(@Request() req: Request, @Param('id') id: string) {
    const { id: idUser } = req['user'] as Users;
    return this.moviesService.addFavorite(id, idUser);
  }

  @Get('/favorites')
  getFavorites(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.moviesService.getFavorites({ page, limit });
  }
}
