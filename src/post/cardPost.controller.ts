import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { CardPostsService } from './cardPost.service';
import { CardPost } from './cardPost.model';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('card-posts')
export class CardPostsController {
  constructor(private readonly cardPostsService: CardPostsService) {}

  @Get()
  async getAllCardPosts(
    @Query() query: ExpressQuery,
  ): Promise<{ cardPostCount: number; cardPost: CardPost[] }> {
    const cardPost = await this.cardPostsService.getAllCardPosts(query);
    const cardPostCount = cardPost.length;
    return { cardPostCount, cardPost };
  }

  @Post()
  async createCardPost(@Body() cardPost: CardPost): Promise<CardPost> {
    return await this.cardPostsService.createCardPost(cardPost);
  }

  @Patch('/:id/content/:contentNumber/url')
  async updateContentUrl(
    @Param('id') cardPostId: string,
    @Param('contentNumber') contentNumber: number,
    @Body('contentUrl') newContentUrl: string,
  ): Promise<CardPost | null> {
    return await this.cardPostsService.updateContentUrl(
      cardPostId,
      contentNumber,
      newContentUrl,
    );
  }

  @Patch('/:id/content/:contentNumber/line/:lineName')
  async updateLineContent(
    @Param('id') cardPostId: string,
    @Param('contentNumber') contentNumber: number,
    @Param('lineName') lineName: string,
    @Body('newValue') newValue: string,
  ): Promise<CardPost | null> {
    return await this.cardPostsService.updateLineContent(
      cardPostId,
      contentNumber,
      lineName,
      newValue,
    );
  }

  @Delete()
  async deleteAllArticles(@Query() query: ExpressQuery): Promise<number> {
    const deletedCount = this.cardPostsService.deleteAll();
    return deletedCount;
  }
}
