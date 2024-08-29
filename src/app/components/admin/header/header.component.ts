import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { SidbarComponent } from '../sidebar/sidbar.component';
import { CommonModule } from '@angular/common';
import { HeaderMenuComponent } from '../../../shard/components/header-menu/header-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MaterialModule,
    SidbarComponent,
    RouterOutlet,
    CommonModule,
    HeaderMenuComponent
  ],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  isDisplaySideBar: boolean = false;

  showSideBar(){
    this.isDisplaySideBar = !this.isDisplaySideBar;
  }
}
