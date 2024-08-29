import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogComponent) {
    this.title = data.title;
    this.message = data.message;
  }
  onConfirm() {
    this.dialogRef.close(true);
  }
  onDismiss() {
    this.dialogRef.close(false);
  }
}
