import { Component, ElementRef, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { CustomStepperComponent } from '../../../shard/components/custom-stepper/custom-stepper.component';
import { CdkStep, CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { Exam } from '../../../models/exam';
import { multipleChoiceQuestion } from '../../../models/multipleChoiceQuestion';
import { Observable, map } from 'rxjs';
import { trueAndFalseQuestion } from '../../../models/trueAndFalseQuestion';

@Component({
  selector: 'app-user-exam-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CustomStepperComponent,
    CdkStep,
    CdkStepper,
    CdkStepperModule,
    CommonModule,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './user-exam-form.component.html',
  styleUrl: './user-exam-form.component.css',
})
export class UserExamFormComponent implements OnInit {
  mcqQuestions$!: Observable<multipleChoiceQuestion[]>;
  tfQuestions$!: Observable<trueAndFalseQuestion[]>;
  examId: string | null;
  categoryId: string | null;
  exam!: Exam;
  tfForm = this._formBuilder.nonNullable.group({})
  mcqForm = this._formBuilder.nonNullable.group({})
  form = this._formBuilder.nonNullable.group({
    answers: this._formBuilder.array([])
  })
  questionsForms: FormGroup[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _activeRouter: ActivatedRoute,
    private _examService: ExamService
  ) {
    this.examId = this._activeRouter.snapshot.paramMap.get('id');
    this.categoryId = this._activeRouter.snapshot.queryParamMap.get('categoryId');
  }
  get answers() {
    return this.form.get('answers') as FormArray;
  }
  ngOnInit(): void {
    if(this.examId) {
      this._examService.getExamByIdWithQuestions(this.examId).pipe(map((req: any) => {
        this.mcqQuestions$ = this.filterQuestionByType<multipleChoiceQuestion>(req.questions, 'MultipleChoiceQuestionDto');
        this.tfQuestions$ = this.filterQuestionByType<trueAndFalseQuestion>(req.questions, 'TrueAndFalseQuestionDto');
        return req;
      })).subscribe((res) => {
        this.exam = res;
        this.mcqQuestions$.subscribe(questions => {
          questions.forEach(question => {
            // this.mcqForm.addControl(question.id, this._formBuilder.control(''))
            // this.answers.push(this._formBuilder.group({
            //   questionId: question.id,
            //   type: ['MCQ'],
            //   choice: ['']
            // }))
            const formGroup = this._formBuilder.group({
              questionId: [question.id],
              choice: [''],
              type: ['MCQ']
            })
            this.questionsForms.push(formGroup);
          })
        })
        this.tfQuestions$.subscribe(questions => {
          questions.forEach(question => {
            // this.tfForm.addControl(question.id, this._formBuilder.control(''))
            // this.answers.push(this._formBuilder.group({
            //   questionId: question.id,
            //   type: ['Tf'],
            //   value: ['']
            // }))
            const formGroup = this._formBuilder.group({
              questionId: [question.id],
              choice: [''],
              type: ['Tf']
            })
            this.questionsForms.push(formGroup);
          })
        })
      });
    }
  }
  filterQuestionByType<T>(questions: any[], type: string) : Observable<T[]> {
    return new Observable<T[]>(observer => {
      const filteredQuestions: T[] = questions.filter(question => question.$type === type);
      observer.next(filteredQuestions);
      observer.complete();
    })
  }
  choice(elementRef: HTMLInputElement) {
  }
  submitForm() {

  }
}
