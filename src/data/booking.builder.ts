import type { CreateBookingRequest } from '../api/models/room.model';

/**
 * Builder for `CreateBookingRequest` payload.
 *
 * Defaults: name `Vien Pham`, deposit paid, dates 7-11 days from today (always future).
 * AIT validation: firstname/lastname 3-30 chars, phone 11-21 chars — defaults respect both.
 *
 * @example
 * const booking = BookingBuilder.create(roomId).name('Test', 'User').dates(3, 5).build();
 */
export class BookingBuilder {
  private data: CreateBookingRequest;

  private constructor(roomid: number) {
    this.data = {
      roomid,
      firstname: 'Vien',
      lastname: 'Pham',
      depositpaid: true,
      bookingdates: BookingBuilder.relativeDates(7, 11),
    };
  }

  static create(roomid: number): BookingBuilder {
    return new BookingBuilder(roomid);
  }

  name(firstname: string, lastname: string): this {
    this.data.firstname = firstname;
    this.data.lastname = lastname;
    return this;
  }

  email(value: string): this {
    this.data.email = value;
    return this;
  }

  phone(value: string): this {
    this.data.phone = value;
    return this;
  }

  depositPaid(value: boolean): this {
    this.data.depositpaid = value;
    return this;
  }

  dates(checkinDaysFromNow: number, checkoutDaysFromNow: number): this {
    this.data.bookingdates = BookingBuilder.relativeDates(checkinDaysFromNow, checkoutDaysFromNow);
    return this;
  }

  build(): CreateBookingRequest {
    return { ...this.data, bookingdates: { ...this.data.bookingdates } };
  }

  private static relativeDates(checkinDaysFromNow: number, checkoutDaysFromNow: number) {
    return {
      checkin: BookingBuilder.iso(checkinDaysFromNow),
      checkout: BookingBuilder.iso(checkoutDaysFromNow),
    };
  }

  private static iso(daysFromNow: number): string {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    return d.toISOString().slice(0, 10);
  }
}
