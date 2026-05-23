import type { CreateBookingRequest, CreateRoomRequest } from '../api/models/room.model';
import { expect, test } from '../fixtures/custom.fixture';
import { AdminLoginPage } from '../pages/AIT/admin-login.page';
import { AdminReportPage } from '../pages/AIT/admin-report.page';
import { AdminRoomsPage } from '../pages/AIT/admin-rooms.page';

test.describe('AIT - API Create → UI Verify', () => {
  let adminLoginPage: AdminLoginPage;
  let adminRoomsPage: AdminRoomsPage;
  let adminReportPage: AdminReportPage;
  let createdRoomId: number | undefined;
  let createdBookingId: number | undefined;

  test.beforeEach(async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    adminRoomsPage = new AdminRoomsPage(page);
    adminReportPage = new AdminReportPage(page);
    // await adminLoginPage.goToBaseURL();
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
    const roomData: CreateRoomRequest = {
      roomName: `QA-${Date.now()}`,
      type: 'Double',
      accessible: true,
      image: 'https://www.mwtestconsultancy.co.uk/img/room2.jpg',
      description: 'Auto-created room for Playwright testing',
      features: ['WiFi', 'TV', 'Safe'],
      roomPrice: 150,
    };

    const roomResponse = await roomService.createRoom(roomData);
    expect(roomResponse.status).toBe(200);
    expect(roomResponse.body?.success).toBe(true);

    const createdRoom = await roomService.findRoomByName(roomData.roomName);
    expect(createdRoom, `Room "${roomData.roomName}" not found after create`).toBeDefined();
    createdRoomId = createdRoom!.roomid;

    const bookingData: CreateBookingRequest = {
      roomid: createdRoomId,
      firstname: 'Vien',
      lastname: 'Pham',
      depositpaid: true,
      email: 'vien.qa@test.com',
      phone: '01234567890',
      bookingdates: {
        checkin: '2026-06-01',
        checkout: '2026-06-05',
      },
    };

    const bookingResponse = await roomService.createBooking(bookingData);
    expect(bookingResponse.status).toBe(201);
    expect(bookingResponse.body?.bookingid).toBeDefined();
    createdBookingId = bookingResponse.body!.bookingid;

    await adminRoomsPage.navigateToRooms();
    await adminRoomsPage.assertRoomDisplayed(roomData.roomName, roomData.type, roomData.roomPrice);

    await adminReportPage.navigateToReport();
    await adminReportPage.assertBookingDisplayed(`${bookingData.firstname} ${bookingData.lastname}`);
  });
});
