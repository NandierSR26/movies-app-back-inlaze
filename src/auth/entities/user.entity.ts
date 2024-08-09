import { FavoriteMovies } from 'src/movies/entities/favorite-movies.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
  })
  password: string;

  @Column({
    type: 'text',
  })
  guest_session_id: string;

  @OneToMany(() => FavoriteMovies, (movie) => movie.user)
  favorite_movies: FavoriteMovies;
}
