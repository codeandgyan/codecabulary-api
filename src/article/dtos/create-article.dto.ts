export class ArticleDTO {
  readonly _id: string;
  readonly topic: string;
  readonly tags: string;
  readonly concept: string;
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
