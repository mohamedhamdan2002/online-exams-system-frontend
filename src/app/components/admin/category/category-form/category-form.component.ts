import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material-module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryCreateOrUpdate } from '../../../../models/CategoryCreateOrUpdate';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  templateUrl: './category-form.component.html',
  styles: ``
})
export class CategoryFormComponent implements OnInit {
  inputData: any;
  categoryObj: CategoryCreateOrUpdate = {} as CategoryCreateOrUpdate;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private service: CategoryService,
    private ref: MatDialogRef<CategoryFormComponent>) {
  }
  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.id) {
      this.setCategory(this.inputData.id);
    }
  }
  setCategory(id: any) {
    this.service.getCategoryById(id).subscribe(res => {
      this.categoryObj = { ...res.data } as CategoryCreateOrUpdate;
    });
  }
  onSubmit() {
    if (this.inputData.id)
      this.edit();
    else
      this.create();
  }
  onClose(saved: boolean) {
    this.ref.close(saved);
  }
  private edit() {
    this.service.updateCategory(this.inputData.id, this.categoryObj).subscribe(() => {
      this.onClose(true);
    });
  }
  private create() {
    this.service.addCategory(this.categoryObj).subscribe(res => {
      if (res) {
        this.onClose(true);
      }
    });
  }
}
