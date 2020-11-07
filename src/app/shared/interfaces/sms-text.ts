import { SmsItem } from './sms-item';
import { User } from './user';

export class SmsText {
    user: User;
    sms: SmsItem;

    constructor(user: User, sms: SmsItem) {
        this.user = user;
        this.sms = sms;
    }

    toText(): string {
        return `${this.sms.action} ${this.user.name} ${this.user.address}`;
    }
}