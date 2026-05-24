import type { CreateRoomRequest, RoomType } from '../api/models/room.model';

/**
 * Builder for `CreateRoomRequest` payload.
 *
 * Defaults: `Single` room, non-accessible, price 100, name `QA-<timestamp>`.
 * Override defaults via chain methods. Always end with `.build()`.
 *
 * @example
 * const room = RoomBuilder.create().type('Double').price(150).features('WiFi').build();
 */
export class RoomBuilder {
  private data: CreateRoomRequest;

  private constructor(roomName: string) {
    this.data = {
      roomName,
      type: 'Single',
      accessible: false,
      roomPrice: 100,
    };
  }

  static create(roomName?: string): RoomBuilder {
    return new RoomBuilder(roomName ?? `QA-${Date.now()}`);
  }

  type(value: RoomType): this {
    this.data.type = value;
    return this;
  }

  accessible(value: boolean): this {
    this.data.accessible = value;
    return this;
  }

  price(value: number): this {
    this.data.roomPrice = value;
    return this;
  }

  image(url: string): this {
    this.data.image = url;
    return this;
  }

  description(text: string): this {
    this.data.description = text;
    return this;
  }

  features(...values: string[]): this {
    this.data.features = values;
    return this;
  }

  build(): CreateRoomRequest {
    return { ...this.data };
  }
}
