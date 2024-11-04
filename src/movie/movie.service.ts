import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class MovieService {
  // 레파지토리를 사용하려면 생성자에 @InjectRepository 데코레이터를 사용하여 주입해야 합니다.
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.movieRepository.save(createMovieDto);

    return movie;
  }

  findAll(title?: string) {
    if (!title) {
      return this.movieRepository.find();
    }
    if (title) {
      return this.movieRepository.find({
        where: { title: Like(`%${title}%`) },
      });
    }
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
    });
    if (!movie) {
      throw new NotFoundException('존재하지 않는 id 입니다.');
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({
      where: { id },
    });
    if (!movie) {
      throw new NotFoundException('존재하지 않는 id 입니다.');
    }

    await this.movieRepository.update({ id }, updateMovieDto);

    const newMovie = await this.movieRepository.findOne({
      where: { id },
    });

    return newMovie;
  }

  async remove(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
    });
    if (!movie) {
      throw new NotFoundException('존재하지 않는 id 입니다.');
    }
    await this.movieRepository.remove(movie);
    return { message: 'Movie removed successfully' };
  }
}
