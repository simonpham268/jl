import { HTTP_STATUS } from '../../constants';
import { BookingBuilder, RoomBuilder } from '../../data';
import { expect, test } from '../../fixtures/custom.fixture';
import { AdminReportPage } from '../../pages/AIT/admin-report.page';
import { AdminRoomsPage } from '../../pages/AIT/admin-rooms.page';

test.describe('AIT - API Create → UI Verify', () => {
  let adminRoomsPage: AdminRoomsPage;
  let adminReportPage: AdminReportPage;
  let createdRoomId: number | undefined;
  let createdBookingId: number | undefined;

  test.beforeEach(async ({ page }) => {
    adminRoomsPage = new AdminRoomsPage(page);
    adminReportPage = new AdminReportPage(page);
  });

  test.afterEach(async ({ roomService }) => {
    if (createdBookingId) {
      await roomService.deleteBooking(createdBookingId);
      createdBookingId = undefined;
    }
    if (createdRoomId) {
      await roomService.deleteRoom(createdRoomId);
      createdRoomId = undefined;
    }
  });

  /** ID: TC001 Tags: Smoke, API-UI-Verify, Booking */
  test('[TC001] @Smoke @Regression: Create room and booking via API, verify on Admin UI', async ({ roomService }) => {
    const roomData = RoomBuilder.create()
      .type('Double')
      .accessible(true)
      .price(150)
      .image('https://www.mwtestconsultancy.co.uk/img/room2.jpg')
      .description('Auto-created room for Playwright testing')
      .features('WiFi', 'TV', 'Safe')
      .build();

    const roomResponse = await roomService.createRoom(roomData);
    expect(roomResponse.status).toBe(HTTP_STATUS.OK);
    expect(roomResponse.body?.success).toBe(true);

    const createdRoom = await roomService.findRoomByName(roomData.roomName);
    expect(createdRoom, `Room "${roomData.roomName}" not found after create`).toBeDefined();
    createdRoomId = createdRoom!.roomid;

    const bookingData = BookingBuilder.create(createdRoomId)
      .name('Vien', 'Pham')
      .email('vien.qa@test.com')
      .phone('01234567890')
      .dates(7, 11)
      .build();

    const bookingResponse = await roomService.createBooking(bookingData);
    expect(bookingResponse.status).toBe(HTTP_STATUS.CREATED);
    expect(bookingResponse.body?.bookingid).toBeDefined();
    createdBookingId = bookingResponse.body!.bookingid;

    await adminRoomsPage.navigateToRooms();
    await adminRoomsPage.assertRoomDisplayed(roomData.roomName, roomData.type, roomData.roomPrice);

    await adminReportPage.navigateToReport();
    await adminReportPage.assertBookingDisplayed(`${bookingData.firstname} ${bookingData.lastname}`);
  });
});
