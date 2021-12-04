import { Injectable } from '@nestjs/common';
import { AlertData } from 'src/core/constants/alert-data';

@Injectable()
export class AlertService {
  getAllAlerts() {
    return AlertData.alerts;
  }
}
