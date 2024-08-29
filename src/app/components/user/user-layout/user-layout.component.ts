import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { SidbarComponent } from '../../admin/sidebar/sidbar.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    UserHeaderComponent,
    SidbarComponent
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
