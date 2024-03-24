import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardPostsController } from './cardPost.controller';
import { CardPostsService } from './cardPost.service';
import { CardPost, CardPostSchema } from './cardPost.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CardPost.name, schema: CardPostSchema },
    ]),
  ],
  controllers: [CardPostsController],
  providers: [CardPostsService],
})
export class CardPostModule {}
