import { Users } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('favorite_movies')
export class FavoriteMovies {
  @PrimaryColumn('text')
  id: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  favorite: boolean;

  @ManyToOne(() => Users, (user) => user.favorite_movies)
  user: string;
}
