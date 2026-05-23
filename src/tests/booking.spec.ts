import { test } from '@playwright/test';
import { BookingHomePage } from '../pages/AIT/booking-home.page';
import { ReservationPage } from '../pages/AIT/reservation.page';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Public booking — reservation validation', () => {
  let bookingHomePage: BookingHomePage;
  let reservationPage: ReservationPage;

  test.beforeEach(async ({ page }) => {
    bookingHomePage = new BookingHomePage(page);
    reservationPage = new ReservationPage(page);
  });

  /** ID: TC001 Tags: Regression, Validation, Booking */
  test('[TC001] @Regression @Validation: Reservation rejects phone shorter than 11 digits', async () => {
    await bookingHomePage.goToRoomsSection();
    await bookingHomePage.clickBookNowForRoom('Single');
    await reservationPage.openReservationForm();
    await reservationPage.submitReservation({
      firstname: 'simmon',
      lastname: 'pham',
      email: 'simonpham268@gmail.com',
      phone: '0905321920',
    });
    await reservationPage.assertValidationError('size must be between 11 and 21');
  });
});
