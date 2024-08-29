import { Component, computed, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
}
@Component({
  selector: 'app-sidbar',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgClass,
    NgIf,
    NgFor
  ],
  templateUrl: './sidbar.component.html',
  styleUrl: './sidbar.component.css'
})
export class SidbarComponent {
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '280px');
  authSrv = inject(AuthService);
  adminMenuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'list_alt', label: 'Categories', route: '/admin/categories' },
    { icon: 'assignment_turned_in', label: 'Exams', route: '/admin/exams' },
    { icon: 'class', label: 'Questions', route: '/admin/questions' },
    { icon: 'group', label: 'Users', route: '/admin/users' },
  ]);
  userMenuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/user/dashboard' },
    { icon: 'assignment_turned_in', label: 'Exams', route: '/user/exams' },
  ]);
  isAdmin = signal<boolean>(this.authSrv.user?.roles != undefined && this.authSrv.user?.roles.includes('admin'));

}
