import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Observable, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Category } from '../../../models/category';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../material-module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ConfirmDialogComponent } from '../../../shard/components/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    RouterLink,
    MaterialModule,
    MatSort,
  ],
  templateUrl: './category.component.html',
  styles: ``
})
export class CategoryComponent implements OnInit, AfterViewInit {
  categories$!: Observable<Category[]>;
  // for mat table
  categoriesList!: Category[];
  dataSource: any;
  columnsToDisplay: string[] = ['No', 'Name', 'Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private categorySrv: CategoryService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngAfterViewInit(): void {
    console.log(this.sort);
    console.log(this.dataSource);
    // this.dataSource.sort = this.sort;
  }

  loadCategories() {
    this.categorySrv.getCategories().subscribe(res => {
      this.categoriesList = res.data;
      this.dataSource = new MatTableDataSource<Category>(this.categoriesList);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
    });
  }

  editCategory(id: any) {
    this.openPopup('Edit Category', CategoryFormComponent, id);
  }

  addCategory() {
    this.openPopup('Create Category', CategoryFormComponent);
  }

  deleteCategory(id: string, categoryName: string) {
    let confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Delete Category',
          message: `Are you sure you want to delete category with name: "${categoryName}"?`
        }
      }
    );
    confirmDialog.afterClosed().subscribe((res)=> {
      if(res) {
        this.categorySrv.deleteCategory(id).subscribe(()=> {
          this.categoriesList = this.categoriesList.filter(cat => cat.id != id);
          this.dataSource = new MatTableDataSource<Category>(this.categoriesList);
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
        this.loadCategories();
      }
    });
  }
}
