export class ArticleDTO {
  readonly category: string;
  readonly tags: string;
  readonly title: string;
  readonly explanation: string;
  readonly example: ExampleDTO;
}

export class ExampleDTO {
  snippet: string;
  description: string;
}
