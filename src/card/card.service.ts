import { Injectable } from '@nestjs/common';
import { Card, CardDocument } from './card.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import { CardInput, CardUpdateInput, SheetInput } from './card.dto';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async getCards(query: Query): Promise<Card[]> {
    const resultsPerPage = Number(query.limit) || 8;
    const currentPage = Number(query.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

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
              tags: {
                $regex: query.keyword,
                $options: 'i',
              },
            },
            {
              'sheets.title': {
                $regex: query.keyword,
                $options: 'i',
              },
            },
            {
              'sheets.tags': {
                $regex: query.keyword,
                $options: 'i',
              },
            },
          ],
        }
      : {};

    const cards = await this.cardModel
      .find({ ...keyword })
      .limit(resultsPerPage)
      .skip(skip);
    return cards;
  }

  async createCard(card: CardInput): Promise<Card> {
    const createdCard = await this.cardModel.create(card);
    return createdCard;
  }

  async updateCard(cardId: string, cardInput: CardUpdateInput) {
    const updateQuery = {
      $set: {
        headline: cardInput.headline,
        logoUrl: cardInput.logoUrl,
        tags: cardInput.tags,
      },
    };

    return await this.cardModel.updateOne({ _id: cardId }, updateQuery);
  }

  async updateSheet(sheetId: string, sheet: SheetInput) {
    const updateQuery = {
      $set: {
        'sheets.$[sheetItem].contentUrl': sheet.contentUrl ?? '',
        'sheets.$[sheetItem].title': sheet.title,
        'sheets.$[sheetItem].tags': sheet.tags,
        'sheets.$[sheetItem].referenceLink': sheet.referenceLink ?? '',
      },
    };

    const options = {
      arrayFilters: [{ 'sheetItem._id': sheetId }],
    };

    return await this.cardModel.updateOne({}, updateQuery, options);
  }

  async deleteAll(): Promise<number> {
    const result = await this.cardModel.deleteMany({});
    return result.deletedCount;
  }
}
