import { Component } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.css'
})
export class HeaderMenuComponent {
  constructor(
    private authSrv: AuthService,
    private dialog: MatDialog,
    private router: Router) {
  }
  logout() {
    let confirm = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: "Logout",
          message: "Are you sure you want to logout?"
        }
      });
    confirm.afterClosed().subscribe((res) => {
      if(res){
        this.authSrv.logout();
        this.router.navigateByUrl('/login');
      }
    });

  }
}
