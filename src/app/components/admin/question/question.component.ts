import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { trueAndFalseQuestion } from '../../../models/trueAndFalseQuestion';
import { multipleChoiceQuestion } from '../../../models/multipleChoiceQuestion';
import { QuestionService } from '../../../services/Question.Service';
import { environment } from '../../../../environments/environment.development';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { RouterLink, TitleStrategy } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Dialog } from '@angular/cdk/dialog';
import { McqFormComponent } from './mcq-form/mcq-form.component';
import { MatDialog } from '@angular/material/dialog';
import { TfqFormComponent } from './tfq-form/tfq-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../../shard/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    NgClass,
    MaterialModule,
    NgIf
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  currentTab = signal<number>(1);
  mcqDataSource: any;
  tfDataSource: any;
  columnsToDisplay: string[] = ['No', 'Title', 'Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tfList: trueAndFalseQuestion[] = [];
  mcqList: multipleChoiceQuestion[] = [];
  trueAndFalseQuestions$!: Observable<trueAndFalseQuestion[]>;
  multipleChoiceQuestions$!: Observable<multipleChoiceQuestion[]>;
  constructor(
    private questionService: QuestionService,
    private dialog: MatDialog
    ) {
  }
  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.loadMcqQuestions();
    this.loadTfQuestions();
  }
  loadMcqQuestions() {
    this.questionService.getQuestions<multipleChoiceQuestion>(environment.methods.MULTIPLE_CHOICE_QUESTIONS)
    .subscribe(
      (res) => {
        this.mcqList = res;
        this.mcqDataSource = new MatTableDataSource<multipleChoiceQuestion>(this.mcqList);
      }
    );
  }
  loadTfQuestions() {
    this.questionService.getQuestions<trueAndFalseQuestion>(environment.methods.TRUE_AND_FALSE_QUESTIONS)
    .subscribe(
      (res) => {
        this.tfList = res;
        this.tfDataSource = new MatTableDataSource<trueAndFalseQuestion>(this.tfList);
      }
    );
  }
  // onDelete(questionId: string, questionType: string) {
  //   let wConfirm = confirm("are you sure that you want to delete this question?");
  //   if(wConfirm) {
  //     let endPointName = questionType == 'MCQ' ?
  //                       environment.methods.MULTIPLE_CHOICE_QUESTIONS :
  //                       environment.methods.TRUE_AND_FALSE_QUESTIONS;
  //     this.questionService.deleteQuestion(questionId, endPointName).subscribe( () => {
  //       this.getQuestions();
  //     });
  //   }
  // }
  addQuestion(type: string) {
    let component: any;
    let title = `Create ${type} Question`;
    if(type == 'MCQ')
      component = McqFormComponent;
    else
      component = TfqFormComponent;
    this.openDialog(title, component)
  }
  editQuestion(type: string, id: string) {
    let component: any;
    let title = `Edit ${type} Question`;
    if(type == 'MCQ')
      component = McqFormComponent;
    else
      component = TfqFormComponent;
    this.openDialog(title, component, id);
  }
  openDialog(title: any, component: any, id?: any) {
    let _popup = this.dialog.open(component, {
      width:'40%',
      data: {
        title: title,
        id: id
      }
    });
    _popup.afterClosed().subscribe((res) => {
      if(res) {
        if(component  == TfqFormComponent)
          this.loadTfQuestions();
        else
          this.loadMcqQuestions();
      }
    });
  }
  curTab(index: any) {
    this.currentTab = index;
  }

  deleteQuestion(id: string, questionTitle: string, type: string) {
    let confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Delete Question',
          message: `Are you sure you want to delete Question with name: "${questionTitle}"?`
        }
      }
    );
    confirmDialog.afterClosed().subscribe((res)=> {
      if(res) {
        if(type == 'MCQ')
          this.deleteMCQ(id);
        else
          this.deleteTF(id);
      }
    });
  }
  private deleteMCQ(id: string) {
    this.questionService.deleteQuestion(id, environment.methods.MULTIPLE_CHOICE_QUESTIONS).subscribe(()=> {
      this.mcqList = this.mcqList.filter(q => q.id != id);
      this.mcqDataSource = new MatTableDataSource<multipleChoiceQuestion>(this.mcqList);
    });
  }
  private deleteTF(id: string) {
    this.questionService.deleteQuestion(id, environment.methods.TRUE_AND_FALSE_QUESTIONS).subscribe(()=> {
      this.tfList = this.tfList.filter(q => q.id != id);
      this.tfDataSource = new MatTableDataSource<trueAndFalseQuestion>(this.tfList);
    });
  }
}
