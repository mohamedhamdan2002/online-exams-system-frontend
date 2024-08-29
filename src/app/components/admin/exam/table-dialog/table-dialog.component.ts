import { Component, DoCheck, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from '../../../../services/Question.Service';
import { multipleChoiceQuestion } from '../../../../models/multipleChoiceQuestion';
import { environment } from '../../../../../environments/environment.development';
import { trueAndFalseQuestion } from '../../../../models/trueAndFalseQuestion';

@Component({
  selector: 'app-table-dialog',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './table-dialog.component.html',
  styleUrl: './table-dialog.component.css'
})
export class TableDialogComponent implements OnInit {
// realated to question
displayedColumns: string[] = ['select', 'position', 'title', 'marks', 'difficulty'];
dataSource = new MatTableDataSource<any>();
selection = new SelectionModel<any>(true, []);
inputData: any;
constructor(
  @Inject(MAT_DIALOG_DATA) private data: any,
  private ref: MatDialogRef<TableDialogComponent>,
  private questionService: QuestionService) {
}
  // ngDoCheck(): void {
  //   console.log("on ng do check : ");
  //   console.log(this.selection);
  // }

  ngOnInit(): void {
    this.inputData = this.data;
    if(this.inputData.type == 'MCQ')
      this.loadMcqQuestions();
    else
      this.loadTFQuestions();
  }
  loadMcqQuestions() {
    this.questionService.getQuestions<multipleChoiceQuestion>(environment.methods.MULTIPLE_CHOICE_QUESTIONS)
    .subscribe(
      (res) => {
        // this.mcqList = res;
        this.dataSource = new MatTableDataSource<multipleChoiceQuestion>(res);
      }
    );
  }
  loadTFQuestions() {
    this.questionService.getQuestions<trueAndFalseQuestion>(environment.methods.TRUE_AND_FALSE_QUESTIONS)
    .subscribe(
      (res) => {
        // this.mcqList = res;
        this.dataSource = new MatTableDataSource<trueAndFalseQuestion>(res);
      }
    );
  }

/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
toggleAllRows() {
  if (this.isAllSelected()) {
    this.selection.clear();
    return;
  }

  this.selection.select(...this.dataSource.data);
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: any): string {
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}
save() {
  // console.log(this.selection.selected);
  this.ref.close(this.selection.selected);
}
close() {
  this.ref.close(false);
}
}
