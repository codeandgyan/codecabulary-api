import { Nugget } from '../schemas/nugget.schema';
import { ArticleDTO } from './create-article.dto';

export class ArticleResponse {
  articleCount: number;
  articles: ArticleDTO[];
}

export class NuggetResponse {
  nuggetCount: number;
  nuggets: Nugget[];
}
