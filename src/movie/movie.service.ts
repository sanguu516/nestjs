import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  private moviees: Movie[] = [
    {
      id: 1,
      title: '해리포터',
    },
    {
      id: 2,
      title: '오션',
    },
  ];
  private idCounter = 3;

  constructor() {
    const movie1 = new Movie();

    movie1.title = '해리포터';
    movie1.id = 1;
  }

  create(createMovieDto: CreateMovieDto) {
    const movie: Movie = {
      id: createMovieDto.id++,
      title: createMovieDto.title,
    };
    this.moviees.push(movie);
    return movie;
  }

  findAll() {
    return this.moviees;
  }

  findOne(id: number) {
    const movie = this.moviees.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException('존재하지 않는 id 입니다.');
    }
    return movie;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = this.moviees.find((movie) => movie.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 id 입니다.');
    }

    Object.assign(movie, { name });
    return movie;
  }

  remove(id: number) {
    const movieIndex = this.moviees.findIndex((movie) => movie.id === +id);
    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 id 입니다.');
    }
    this.moviees.splice(movieIndex, 1);
    return this.moviees;
  }
}
