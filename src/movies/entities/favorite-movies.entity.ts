import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('favorite_movies')
export class FavoriteMovies {
  @PrimaryColumn('text')
  id: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  favorite: boolean;
}
