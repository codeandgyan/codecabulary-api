import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Example {
  @Prop({ isRequired: true })
  snippet: string;

  @Prop({ isRequired: true })
  description: string;
}

@Schema()
export class Analogy {
  @Prop({ isRequired: true })
  para1: string;

  @Prop({ isRequired: true })
  para2: string;
}

@Schema({
  //   id: true,
})
export class Article {
  _id: string;

  @Prop({ isRequired: true })
  category: string;

  @Prop()
  tags: string;

  @Prop({ isRequired: true })
  title: string;

  @Prop({ isRequired: true })
  explanation: string;

  @Prop({ type: Example })
  example: Example;

  @Prop({ type: Analogy })
  analogies: Analogy;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
