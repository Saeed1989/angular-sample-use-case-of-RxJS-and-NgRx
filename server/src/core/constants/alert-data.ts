/**
 * This is the store for dummy alert data
 */

import { Alert } from '../models/alert.model';

export class AlertData {
  public static alerts: Alert[] = [
    {
      id: '1',
      message: 'This is dummy alert 1',
      date: new Date('2021/01/02'),
    },
    {
      id: '2',
      message: 'This is dummy alert 2',
      date: new Date('2021/02/03'),
    },
    {
      id: '5',
      message: 'This is dummy alert 3',
      date: new Date('2021/03/04'),
    },
  ];
}
