import {
  Body,
  Controller,
  Param,
  Post,
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
}
