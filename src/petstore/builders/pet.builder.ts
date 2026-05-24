import type { Category, CreatePetRequest, PetStatus, Tag } from '../models/pet.model';

/**
 * Builder for `CreatePetRequest` payload.
 *
 * Defaults: id = `Date.now()`, name = `QA-<id>`, status `available`,
 * 1 placeholder photo URL, no category, no tags.
 *
 * `id` is auto-generated as `Date.now()` to stay within JS safe-integer range
 * (Petstore-generated IDs are int64 and lose precision through JSON.parse).
 *
 * @example
 * const pet = PetBuilder.create().category('Dog').tag('friendly').status('sold').build();
 */
export class PetBuilder {
  private data: CreatePetRequest;
  private tagBuf: Tag[] = [];

  private constructor(id: number) {
    this.data = {
      id,
      name: `QA-${id}`,
      photoUrls: ['https://example.com/qa-pet.jpg'],
      status: 'available',
    };
  }

  static create(id?: number): PetBuilder {
    return new PetBuilder(id ?? Date.now());
  }

  name(value: string): this {
    this.data.name = value;
    return this;
  }

  photoUrls(...urls: string[]): this {
    this.data.photoUrls = urls;
    return this;
  }

  category(name: string, id = 1): this {
    const cat: Category = { id, name };
    this.data.category = cat;
    return this;
  }

  tag(name: string, id = this.tagBuf.length + 1): this {
    this.tagBuf.push({ id, name });
    this.data.tags = [...this.tagBuf];
    return this;
  }

  status(value: PetStatus): this {
    this.data.status = value;
    return this;
  }

  build(): CreatePetRequest {
    return {
      ...this.data,
      photoUrls: [...this.data.photoUrls],
      ...(this.data.category ? { category: { ...this.data.category } } : {}),
      ...(this.data.tags ? { tags: this.data.tags.map(t => ({ ...t })) } : {}),
    };
  }
}
