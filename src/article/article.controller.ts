import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './schemas/article.schema';
import { ArticleDTO } from './dtos/create-article.dto';
import { ErrorDTO } from './dtos/error.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async getAllArticles(@Query() query: ExpressQuery): Promise<ArticleDTO[]> {
    return await this.articleService.findAll(query);
  }

  @Post('add')
  async addArticle(@Body() articles: ArticleDTO[]): Promise<ArticleDTO[]> {
    const results: ArticleDTO[] = [];
    articles.forEach(async (article) => {
      results.push(await this.articleService.addOne(article));
    });
    return results;
  }

  @Get(':id')
  async getArticleById(@Param('id') id: string): Promise<Article | ErrorDTO> {
    const article = await this.articleService.findById(id);
    if (!article) {
      return { error: '404', message: 'Article not found!' } as ErrorDTO;
    }
    return article;
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string): Promise<Article | ErrorDTO> {
    const article = await this.articleService.deleteById(id);
    if (!article) {
      return { error: '404', message: 'Article not found!' } as ErrorDTO;
    }
    return article;
  }
}
