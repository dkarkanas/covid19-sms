import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Constants } from 'src/app/app.constants';
import { SmsItem, SmsText, User } from 'src/app/shared/interfaces';
import { SmsActions } from './sms-actions.data';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

declare var SMS: any;

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage implements OnInit {


  smsActions: SmsItem[];
  missingDetails: boolean = false;
  user: User;

  constructor(
    private storage: Storage,
    private androidPermissions: AndroidPermissions
  ) { }

  ngOnInit() {
    this.smsActions = SmsActions.getAvailabelActions();
  }

  async sendSms(smsItem: SmsItem): Promise<void> {

    this.missingDetails = false;
    this.user = await this.getUser();

    if (this.validateUser()) {
      this.missingDetails = true;
      return;
    }

    const sms = new SmsText(this.user, smsItem);

    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
      SMS.sendSMS(Constants.smsNumber, sms.toText());
    });
  }


  validateUser(): boolean {
    return this.user === null || !this.user.address.length || !this.user.name.length;
  }

  async getUser(): Promise<User> {
    return this.storage.get(Constants.storageKeys.user);
  }

}
