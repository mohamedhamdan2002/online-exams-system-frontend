import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shard/components/confirm-dialog/confirm-dialog.component';
import { HeaderMenuComponent } from '../../../shard/components/header-menu/header-menu.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeaderMenuComponent,
    CommonModule,
    AsyncPipe
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  authSrv = inject(AuthService);
}
