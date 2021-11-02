import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Constants } from 'src/app/app.constants';
import { SmsService } from 'src/app/services/sms.service';
import { SmsItem, SmsText, User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage implements OnInit {

  smsActions: SmsItem[];
  missingDetails = false;
  loading = true;
  user: User;
  inactiveSmsActions = false;

  constructor(
    private storage: Storage,
    private smsService: SmsService
  ) { }

  ngOnInit() {
    this.smsActions = this.smsService.getAvailableActions();
    this.inactiveSmsActions =  this.smsService.smsActionsHaveInactiveItems();
  }

  // ionic specific event
  async ionViewWillEnter() {
    this.loading = true;

    this.user = await this.getUser();
    this.missingDetails = this.invalidUser();

    this.loading = false;
  }

  /**
   * Allow SMS Action only if the user details are not missing
   */
  validateSmsAction() {
    return !this.missingDetails;
  }

  /**
   * Generate the SMS text in the "href" form
   * @param smsItem The sms item
   */
  generateSms(smsItem: SmsItem): string {

    if (this.missingDetails) {
      return '';
    }

    const sms = new SmsText(this.user, smsItem);
    return `sms:${Constants.smsNumber}?&body=${sms.toText()}`;
  }

  invalidUser(): boolean {
    return this.user === null || !this.user.address.length || !this.user.name.length;
  }

  async getUser(): Promise<User> {
    return this.storage.get(Constants.storageKeys.user);
  }
}
