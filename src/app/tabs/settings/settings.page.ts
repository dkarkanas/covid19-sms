import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { ThemeService } from 'src/app/services/theme.service';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: User;
  darkMode: boolean;

  constructor(private storage: Storage, private theme: ThemeService) { }

  async ngOnInit() {
    this.darkMode = await this.storage.get(Constants.storageKeys.darkTheme) || false;
    this.user = await this.storage.get(Constants.storageKeys.user) || {} as User;
  }

  toggleTheme() {
    this.storage.set(Constants.storageKeys.darkTheme, this.darkMode);

    if (this.darkMode) {
      this.theme.enableDark();
    }
    else {
      this.theme.enableLight();
    }
  }

  userEvent() {
    this.storage.set(Constants.storageKeys.user, this.user);
  }
}
