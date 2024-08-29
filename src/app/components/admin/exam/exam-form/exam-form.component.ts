import { Component, DoCheck, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout'
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { multipleChoiceQuestion } from '../../../../models/multipleChoiceQuestion';
import { trueAndFalseQuestion } from '../../../../models/trueAndFalseQuestion';
import { Category } from '../../../../models/category';
import { ExamService } from '../../../../services/exam.service';
import { CategoryService } from '../../../../services/category.service';
import { ExamForCreate } from '../../../../models/exam-for-create';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './exam-form.component.html',
  styleUrl: './exam-form.component.css'
})
export class ExamFormComponent implements DoCheck, OnInit{
  GeneralInfoForm = this._formBuilder.nonNullable.group({
    title: '',
    totalMarks: '',
    term: '',
    date: '',
    duration: '',
    level: ''
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  questionType = this._formBuilder.control('');
  categoryId = this._formBuilder.control('');
  categoryList: Category[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private examService: ExamService,
    private categorySrv: CategoryService,
    private datePipe: DatePipe
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

  }
  ngOnInit(): void {
    this.categorySrv.getCategories().subscribe(
      (res) => {
        if(res.succeeded)
          this.categoryList = res.data as Category[];
    });
  }
  ngDoCheck(): void {
    // console.log(this.selection.selected);
  }

  // realated to question
  displayedColumns: string[] = ['select', 'position', 'title', 'mark', 'level'];
  dataSource = new MatTableDataSource<any>();
  mcqDataSource = new MatTableDataSource<any>();
  tfDataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  tfSelection = new SelectionModel<any>(true, []);
  mcqSelection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(type: string) {
    let numSelected: number;
    let numRows : number;
    if(type == 'MCQ') {
      numSelected = this.mcqSelection.selected.length;
      numRows = this.mcqDataSource.data.length;
    }
    else {
      numSelected = this.tfSelection.selected.length;
      numRows = this.tfDataSource.data.length;
    }
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows(type: string) {
    if (this.isAllSelected(type)) {
      if(type == 'MCQ')
        this.mcqSelection.clear();
      else
        this.tfSelection.clear();
      return;
    }
    if(type == 'MCQ')
      this.mcqSelection.select(...this.mcqDataSource.data);
    else
      this.tfSelection.select(...this.tfDataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(type: string, row?: any): string {
    if (!row) {
      return `${this.isAllSelected(type) ? 'deselect' : 'select'} all`;
    }
    let label: any;
    if(type == 'MCQ')
      label = `${this.mcqSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    else
      label = `${this.tfSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    return label;
  }

  openDailog() {
    const type = this.questionType.value;
    const dialog = this.dialog.open(TableDialogComponent, {
      width: '80%',
      data: {
        type:  type,
        title:  `${type} Questions`
      }
    });
    dialog.afterClosed().subscribe(
      (res) => {
        if(type == 'MCQ') {
          this.mcqDataSource = new MatTableDataSource<multipleChoiceQuestion>(res);
          this.mcqSelection.select(res);

        }
        else {
          this.tfDataSource = new MatTableDataSource<trueAndFalseQuestion>(res);
          this.tfSelection.select(res);
        }
      }
    );

  }
  isContainData(type: string) {
    let length: number;
    if(type == 'MCQ')
      length = this.mcqDataSource.data.length;
    else
      length = this.tfDataSource.data.length;
    return length > 0;
  }
  save() {
    // let data: string[] = ['1', "mohamed", 'Hemdan'];
    // console.log(data);
    // console.log(this.categoryId.value)
    // console.log(this.GeneralInfoForm.value);
    // console.log(this.tfSelection.selected);
    // console.log(this.mcqSelection.selected);
    let obj = {...this.GeneralInfoForm.value} as ExamForCreate
    obj.date = this.datePipe.transform(obj.date,'yyyy-MM-dd') ||'';
    const categoryId = this.categoryId.value;
    let tfqIds: string[] = [];
    let mcqIds: string[] = [];
    if(this.tfSelection.selected.length > 0)
      tfqIds = this.tfSelection.selected[0].map((obj: trueAndFalseQuestion) => obj.id);
    if(this.mcqSelection.selected.length > 0)
      mcqIds = this.mcqSelection.selected[0].map((obj: multipleChoiceQuestion) => obj.id);
    obj.questions = [...tfqIds, ...mcqIds];
    console.log(obj)
    if(categoryId){
      this.examService.addExam(categoryId, obj).subscribe(
        () => {

        }
      );
    }
  }
}
