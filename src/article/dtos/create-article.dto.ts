export class ArticleDTO {
  readonly _id: string;
  readonly category: string;
  readonly tags: string;
  readonly title: string;
  readonly explanation: string;
  readonly example: ExampleDTO;
  readonly analogies: AnalogyDTO;
}

export class ExampleDTO {
  snippet: string;
  description: string;
}

export class AnalogyDTO {
  para1: string;
  para2: string;
}
