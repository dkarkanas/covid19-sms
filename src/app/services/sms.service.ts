import { Injectable } from '@angular/core';
import { Action, SmsItem } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  private _availableActions: SmsItem[] =
    [
      {
        action: Action.Medical,
        description: '1. Μετάβαση σε φαρμακείο ή επίσκεψη στον γιατρό, εφόσον αυτό συνιστάται μετά από σχετική επικοινωνία.',
        icon: 'medkit-outline'
      },
      {
        action: Action.SuperMarket,
        description: '2. Μετάβαση σε εν λειτουργία κατάστημα προμηθειών αγαθών πρώτης ανάγκης (σούπερ μάρκετ, μίνι μάρκετ), όπου δεν είναι δυνατή η αποστολή τους.',
        icon: 'storefront-outline',
        activeFrom: { hours: 5, minutes: 0 },
        activeTo: { hours: 21, minutes: 0 }
      },
      {
        action: Action.Bank,
        description: '3. Μετάβαση στην τράπεζα, στο μέτρο που δεν είναι δυνατή η ηλεκτρονική συναλλαγή.',
        icon: 'card-outline',
        activeFrom: { hours: 5, minutes: 0 },
        activeTo: { hours: 21, minutes: 0 }
      },
      {
        action: Action.HelpOthers,
        description: '4. Κίνηση για παροχή βοήθειας σε ανθρώπους που βρίσκονται σε ανάγκη ή συνοδεία ανηλίκων μαθητών από/προς το σχολείο.',
        icon: 'people-outline',
        activeFrom: { hours: 5, minutes: 0 },
        activeTo: { hours: 21, minutes: 0 }
      },
      {
        action: Action.Funeral,
        description: '5. Μετάβαση σε τελετή κηδείας υπό τους όρους που προβλέπει ο νόμος ή μετάβαση διαζευγμένων γονέων ή γονέων που τελούν σε διάσταση που είναι αναγκαία για τη διασφάλιση της επικοινωνίας γονέων και τέκνων, σύμφωνα με τις κείμενες διατάξεις.',
        icon: 'skull-outline',
        activeFrom: { hours: 5, minutes: 0 },
        activeTo: { hours: 21, minutes: 0 }
      },
      {
        action: Action.Excersice,
        description: '6. Σωματική άσκηση σε εξωτερικό χώρο ή κίνηση με κατοικίδιο ζώο, ατομικά ή ανά δύο άτομα, τηρώντας στην τελευταία αυτή περίπτωση την αναγκαία απόσταση 1,5 μέτρου.',
        icon: 'walk-outline'
      },
  ];

  constructor() { }

  getAvailabelActions(): SmsItem[] {
    return this._availableActions
      .map(sms => {
        // fix active
        sms.active = this.smsActionTimeIsInactive(sms);
        return sms;
      });
  }

  public smsActionsHaveInactiveItems(): boolean {
    return this._availableActions
      .filter(sms => sms.active)
      .length > 0;
  }

  private smsActionTimeIsInactive(sms: SmsItem) {
    // null values always active
    if (!sms.activeFrom || !sms.activeTo) {
      return false;
    }

    const now = new Date();

    const from = new Date();
    from.setHours(sms.activeFrom.hours);
    from.setMinutes(sms.activeFrom.minutes);
    from.setSeconds(0);

    const to = new Date();
    to.setHours(sms.activeTo.hours);
    to.setMinutes(sms.activeTo.minutes);
    to.setSeconds(0);

    // NOT between two dates
    return !(now > from && now < to);
  }
}
