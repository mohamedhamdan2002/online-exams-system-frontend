import { Component } from '@angular/core';
import { UserHeaderComponent } from '../../../components/user/user-header/user-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UserHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
