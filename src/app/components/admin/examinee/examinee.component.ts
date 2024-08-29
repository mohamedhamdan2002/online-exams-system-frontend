import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shard/components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../../../material-module';

@Component({
  selector: 'app-examinee',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './examinee.component.html',
  styleUrl: './examinee.component.css'
})
export class ExamineeComponent {
  users$!: Observable<User[]>;
  // for mat table
  usersList!: User[];
  dataSource: any;
  columnsToDisplay: string[] = ['No', 'fullName', 'nationalId', 'email','Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private userSrv: UserService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    console.log(this.sort);
    console.log(this.dataSource);
    // this.dataSource.sort = this.sort;
  }

  loadUsers() {
    this.userSrv.getAllUsers().subscribe(res => {
      this.usersList = res;
      this.dataSource = new MatTableDataSource<User>(this.usersList);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
    });
  }

  editUser(id: any) {
    // this.openPopup('Edit Category', CategoryFormComponent, id);
  }

  addUser() {
    // this.openPopup('Create Category', CategoryFormComponent);
  }

  deleteUser(id: string, email: string) {
    let confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Delete User',
          message: `Are you sure you want to delete User with email: "${email}"?`
        }
      }
    );
    confirmDialog.afterClosed().subscribe((res)=> {
      if(res) {
        this.userSrv.deleteUser(id).subscribe(()=> {
          this.usersList = this.usersList.filter(user => user.id != id);
          this.dataSource = new MatTableDataSource<User>(this.usersList);
        });
      }
    });
  }

  openPopup(title: any, component: any, id?: any) {
    let _popup = this.dialog.open(component, {
      width:'40%',
      data: {
        title: title,
        id: id
      }
    });
    _popup.afterClosed().subscribe((res) => {
      if(res) {
        this.loadUsers();
      }
    });
  }
}
