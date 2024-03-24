import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardPost, CardPostDocument } from './cardPost.model';
import { Query } from 'express-serve-static-core';

@Injectable()
export class CardPostsService {
  constructor(
    @InjectModel(CardPost.name) private cardPostModel: Model<CardPostDocument>,
  ) {}

  async getAllCardPosts(query: Query): Promise<CardPost[]> {
    console.log(query);
    const keyword = query.keyword
      ? {
          $or: [
            {
              headline: {
                $regex: query.keyword,
                $options: 'i',
              },
            },
            {
              'contents.body.lineName': {
                $regex: query.keyword,
                $options: 'i',
              },
            },
            {
              'contents.body.lineValue': {
                $regex: query.keyword,
                $options: 'i',
              },
            },
          ],
        }
      : {};
    return await this.cardPostModel.find({ ...keyword });
  }

  async createCardPost(cardPost: CardPost): Promise<CardPost> {
    const createdCardPost = new this.cardPostModel(cardPost);
    return await createdCardPost.save();
  }

  async updateContentUrl(
    cardPostId: string,
    contentNumber: number,
    newContentUrl: string,
  ): Promise<CardPost | null> {
    const cardPost = await this.cardPostModel.findById(cardPostId).exec();
    if (!cardPost) {
      return null;
    }

    const contentIndex = cardPost.contents.findIndex(
      (content) => content.contentNumber === contentNumber,
    );
    if (contentIndex === -1) {
      return null;
    }

    cardPost.contents[contentIndex].contentUrl = newContentUrl;
    cardPost.updatedAt = new Date();

    return await cardPost.save();
  }

  async updateLineContent(
    cardPostId: string,
    contentNumber: number,
    lineName: string,
    newValue: string,
  ): Promise<CardPost | null> {
    const cardPost = await this.cardPostModel.findById(cardPostId).exec();
    if (!cardPost) {
      return null;
    }

    const contentIndex = cardPost.contents.findIndex(
      (content) => content.contentNumber === contentNumber,
    );
    if (contentIndex === -1) {
      return null;
    }

    const lineContent = cardPost.contents[contentIndex].body.find(
      (line) => line.lineName === lineName,
    );
    if (!lineContent) {
      return null;
    }

    lineContent.lineValue = newValue;
    cardPost.updatedAt = new Date();

    return await cardPost.save();
  }

  async deleteAll(): Promise<number> {
    const result = await this.cardPostModel.deleteMany({});
    return result.deletedCount;
  }
}
