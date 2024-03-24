import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Sheet {
  @Prop({ required: false })
  contentUrl: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  content: string;

  @Prop({ required: true })
  tags: string;

  @Prop({ required: false })
  referenceLink: string;
}

@Schema({ timestamps: true })
export class Card {
  @Prop({ required: true })
  headline: string;

  @Prop({ required: true })
  logoUrl: string;

  @Prop({ required: true })
  tags: string;

  @Prop({ type: [Sheet], required: true })
  sheets: Sheet[];

  createdAt: Date;

  updatedAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);
