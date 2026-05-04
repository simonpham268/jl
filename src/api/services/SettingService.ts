import type { ApiClient } from '../base/ApiClient';
import type { ApiResponse } from '../base/ApiResponse';
import { SETTING_ENDPOINTS, SELLING_RATE_ENDPOINTS } from '../endpoints/setting.endpoints';
import type { SystemDetailSettings, SellingRateRequest } from '../models/Setting';

export class SettingService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
    this.client.setHeader('content-type', 'application/x-www-form-urlencoded');
  }

  /**
   * Update system settings (Settings > System Detail).
   * Pass only the fields you want to set — unspecified fields keep their current values on the server.
   */
  async updateSystemDetail(settings: SystemDetailSettings): Promise<ApiResponse<void>> {
    return this.client.post<void>(SETTING_ENDPOINTS.UPDATE_SYSTEM_DETAIL, {
      form: settings as Record<string, string | number | boolean>,
    });
  }

  /**
   * Edit a selling rate record.
   */
  async editSellingRate(data: SellingRateRequest): Promise<ApiResponse<void>> {
    return this.client.post<void>(SELLING_RATE_ENDPOINTS.EDIT, {
      form: data as unknown as Record<string, string | number | boolean>,
    });
  }
}
