import { InjectRepository } from '@nestjs/typeorm';
import { AddRatingDto } from './dto/add-rating.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FavoriteMovies } from './entities/favorite-movies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(FavoriteMovies)
    private readonly favoriteMoviesRepositoty: Repository<FavoriteMovies>,
  ) {}

  async rateMovie(
    id_movie: number,
    guest_session_id: string,
    addRatingDto: AddRatingDto,
  ) {
    const { value } = addRatingDto;
    const url = `${process.env.TMDB_API_BASE_URL}/movie/${id_movie}/rating?api_key=${process.env.TMDB_APY_KEY}&guest_session_id=${guest_session_id}`;

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });
      const data = await resp.json();

      if (!data.success) throw new BadRequestException(data.status_message);
      if (data.status_code === 12)
        return { message: 'Calificación actualizada' };

      return {
        message: 'Calificación registrada',
      };
    } catch (error) {}
  }

  async addFavorite(id_movie: string) {
    const movie = this.favoriteMoviesRepositoty.create({
      id: id_movie,
      favorite: true,
    });
    await this.favoriteMoviesRepositoty.save(movie);
    return movie;
  }
}
