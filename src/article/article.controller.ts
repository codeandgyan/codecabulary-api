import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './schemas/article.schema';
import { ArticleDTO } from './dtos/create-article.dto';
import { ErrorDTO } from './dtos/error.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ArticleResponse } from './dtos/response.dto';
import { MongooseError } from 'mongoose';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async getAllArticles(@Query() query: ExpressQuery): Promise<ArticleResponse> {
    const articles = await this.articleService.findAll(query);
    return {
      articleCount: articles.length,
      articles: articles,
    } as ArticleResponse;
  }

  @Post('add')
  async addArticle(@Body() articles: Article[]): Promise<number> {
    // const results: ArticleDTO[] = [];
    // articles.forEach(async (article) => {
    //   results.push(await this.articleService.addOne(article));
    // });
    // return results;
    const addedArticleCount = await this.articleService.addMany(articles);
    return addedArticleCount;
  }

  @Get(':id')
  async getArticleById(@Param('id') id: string): Promise<Article> {
    const article = await this.articleService.findById(id);
    if (!article) {
      throw new NotFoundException('Article not found!');
    }
    return article;
  }

  @Delete('delete/:id')
  async deleteArticle(@Param('id') id: string): Promise<Article> {
    try {
      const article = await this.articleService.deleteById(id);

      if (!article) {
        throw new NotFoundException('Article not found!');
      }
      return article;
    } catch (error) {
      if(error as MongooseError) {
        console.log(error);
        throw new NotFoundException('Article not found!');
      }
      throw new InternalServerErrorException("Error occurred while deleting the data")
    }
  }

  @Delete('delete')
  async deleteAllArticles(@Query() query: ExpressQuery): Promise<number> {
    const deletedCount = this.articleService.deleteAll();
    return deletedCount;
  }
}
