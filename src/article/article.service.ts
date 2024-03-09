import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import mongoose from 'mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: mongoose.Model<ArticleDocument>,
  ) {}

  async findAll(query: ExpressQuery): Promise<Article[]> {
    console.log(query);

    const resultsPerPage = Number(query.limit) || 8;
    const currentPage = Number(query.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          concepts: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const articles = await this.articleModel
      .find({ ...keyword })
      .limit(resultsPerPage)
      .skip(skip);
    return articles;
  }

  async addOne(article: Article): Promise<Article> {
    const result = await this.articleModel.create(article);
    return result;
  }

  async addMany(articles: Article[]): Promise<number> {
    const result = await this.articleModel.insertMany(articles);
    return result.entries.length;
  }

  async findById(id: string): Promise<Article> {
    const result = await this.articleModel.findById(id);
    return result;
  }

  async deleteById(id: string): Promise<Article> {
    const result = await this.articleModel.findByIdAndDelete(id);
    return result;
  }

  async deleteAll(): Promise<number> {
    const result = await this.articleModel.deleteMany({});
    return result.deletedCount;
  }
}
