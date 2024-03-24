import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardPostDocument = CardPost & Document;

@Schema()
export class LineContent {
  @Prop({ required: true })
  lineName: string;

  @Prop({ required: true })
  lineValue: string;
}

@Schema()
export class Content {
  @Prop({ required: true, default: 0 })
  contentNumber: number;

  @Prop()
  contentUrl: string;

  @Prop({ type: [LineContent], required: true })
  body: LineContent[];
}

@Schema()
export class CardPost {
  @Prop({ required: true })
  headline: string;

  @Prop({ required: true })
  logoUrl: string;

  @Prop({ type: [Content], required: true })
  contents: Content[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CardPostSchema = SchemaFactory.createForClass(CardPost);
