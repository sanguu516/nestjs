import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MovieDetail } from './entities/movie-detail.entity';

@Injectable()
export class MovieService {
  // 레파지토리를 사용하려면 생성자에 @InjectRepository 데코레이터를 사용하여 주입해야 합니다.
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(MovieDetail)
    private movieDetailRepository: Repository<MovieDetail>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movieDetail = await this.movieDetailRepository.save({
      detail: createMovieDto.detail,
    });

    const movie = await this.movieRepository.save({
      title: createMovieDto.title,
      genre: createMovieDto.genre,
      detail: movieDetail,
    });

    return movie;
  }

  async findAll(title?: string) {
    if (!title) {
      return [
        await this.movieRepository.find(),
        await this.movieRepository.count(),
      ];
    }
    if (title) {
      return await this.movieRepository.findAndCount({
        where: { title: Like(`%${title}%`) },
      });
    }
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail'],
    });
    if (!movie) {
      throw new NotFoundException('존재하지 않는 id 입니다.');
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail'],
    });
    if (!movie) {
      throw new NotFoundException('존재하지 않는 id 입니다.');
    }

    const { detail, ...rest } = updateMovieDto;

    await this.movieRepository.update({ id }, rest);

    if (detail) {
      await this.movieDetailRepository.update(
        { id: movie.detail.id },
        { detail },
      );
    }

    const newMovie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail'],
    });

    return newMovie;
  }

  async remove(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail'],
    });
    if (!movie) {
      throw new NotFoundException('존재하지 않는 id 입니다.');
    }
    await this.movieRepository.delete(id);
    await this.movieDetailRepository.delete(movie.detail.id);

    return { message: 'Movie removed successfully' };
  }
}
