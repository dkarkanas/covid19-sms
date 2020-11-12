import { Time } from '@angular/common';
import { Action } from './action';

export interface SmsItem {
    icon: string;
    description: string;
    action: Action;
    activeFrom?: Time;
    activeTo?: Time;
    active?: boolean;
}