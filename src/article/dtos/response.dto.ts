import { ArticleDTO } from "./create-article.dto";

export class ArticleResponse {
    articleCount: number;
    articles: ArticleDTO[];
}