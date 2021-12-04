/**
 * This is the store for dummy alert data
 */

import { Alert } from '../models/alert.model';

export class AlertData {
  public static alerts: Alert[] = [
    {
      id: '1',
      message: 'This is dummy alert 1',
      date: new Date('20210102'),
    },
    {
      id: '2',
      message: 'This is dummy alert 2',
      date: new Date('20210203'),
    },
    {
      id: '5',
      message: 'This is dummy alert 3',
      date: new Date('20210304'),
    },
  ];
}
