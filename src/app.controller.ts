import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

interface Movie {
  id: number;
  name: string;
}

@Controller('movie')
export class AppController {
  private moviees: Movie[] = [
    {
      id: 1,
      name: '해리포터',
    },
    {
      id: 2,
      name: '오션',
    },
  ];
  private idCounter = 3;

  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies() {
    return this.moviees;
  }

  @Get(':id')
  getmovie(@Param('id') movieId: string) {
    const movie = this.moviees.find((movie) => movie.id === +movieId);
    if (!movie) {
      throw new NotFoundException('존재하지 않는 id 입니다.');
    }
    return movie;
  }

  @Post()
  postMovie(@Body('name') name: string) {
    const movie: Movie = {
      id: this.idCounter++,
      name: name,
    };
    this.moviees.push(movie);
    return movie;
  }

  @Patch(':id')
  updateMovie(@Param('id') movieId: string, @Body('name') name: string) {
    const movie = this.moviees.find((movie) => movie.id === +movieId);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 id 입니다.');
    }

    Object.assign(movie, { name });
    return movie;
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    const movieIndex = this.moviees.findIndex((movie) => movie.id === +movieId);
    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 id 입니다.');
    }
    this.moviees.splice(movieIndex, 1);
    return this.moviees;
  }
}
