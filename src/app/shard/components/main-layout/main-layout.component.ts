import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserHeaderComponent } from '../../../components/user/user-header/user-header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    UserHeaderComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
