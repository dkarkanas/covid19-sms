import { Action } from 'src/app/shared/interfaces/action';
import { SmsItem } from 'src/app/shared/interfaces/sms-item';

export class SmsActions {
    private static _availableActions: SmsItem[] =
        [
            {
                action: Action.Medical,
                description: '1. Μετάβαση σε φαρμακείο ή επίσκεψη στον γιατρό, εφόσον αυτό συνιστάται μετά από σχετική επικοινωνία.',
                icon: 'medkit-outline'
            },
            {
                action: Action.SuperMarket,
                description: '2. Μετάβαση σε εν λειτουργία κατάστημα προμηθειών αγαθών πρώτης ανάγκης (σούπερ μάρκετ, μίνι μάρκετ), όπου δεν είναι δυνατή η αποστολή τους.',
                icon: 'storefront-outline'
            },
            {
                action: Action.Bank,
                description: '3. Μετάβαση στην τράπεζα, στο μέτρο που δεν είναι δυνατή η ηλεκτρονική συναλλαγή.',
                icon: 'card-outline'
            },
            {
                action: Action.HelpOthers,
                description: '4. Κίνηση για παροχή βοήθειας σε ανθρώπους που βρίσκονται σε ανάγκη ή συνοδεία ανηλίκων μαθητών από/προς το σχολείο.',
                icon: 'people-outline'
            },
            {
                action: Action.Funeral,
                description: '5. Μετάβαση σε τελετή κηδείας υπό τους όρους που προβλέπει ο νόμος ή μετάβαση διαζευγμένων γονέων ή γονέων που τελούν σε διάσταση που είναι αναγκαία για τη διασφάλιση της επικοινωνίας γονέων και τέκνων, σύμφωνα με τις κείμενες διατάξεις.',
                icon: 'skull-outline'
            },
            {
                action: Action.Excersice,
                description: '6. Σωματική άσκηση σε εξωτερικό χώρο ή κίνηση με κατοικίδιο ζώο, ατομικά ή ανά δύο άτομα, τηρώντας στην τελευταία αυτή περίπτωση την αναγκαία απόσταση 1,5 μέτρου.',
                icon: 'walk-outline'
            },
        ];

    public static getAvailabelActions(): SmsItem[] {
        return this._availableActions;
    }
}