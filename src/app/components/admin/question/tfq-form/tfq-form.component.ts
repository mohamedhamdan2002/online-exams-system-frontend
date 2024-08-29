import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from '../../../../services/Question.Service';
import { trueAndFalseForCreationViewModel, trueAndFalseQuestion } from '../../../../models/trueAndFalseQuestion';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-tfq-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './tfq-form.component.html',
  styleUrl: './tfq-form.component.css'
})
export class TfqFormComponent {
  inputData: any;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private ref: MatDialogRef<TfqFormComponent>,
    private questionSrv: QuestionService,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      title: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
      mark: ['', [Validators.required]],
      correctAnswer: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.id) {
      this.questionSrv
        .getQuestionById<trueAndFalseQuestion>(
          this.inputData.id,
          environment.methods.TRUE_AND_FALSE_QUESTIONS
        )
        .subscribe((res) => {
          this.form.patchValue(res);
        });
    }
  }
  close(saved: boolean) {
    this.ref.close(saved);
  }
  save() {
    console.log(this.form.value);
    if(this.inputData.id)
      this.edit();
    else
      this.create();
  }

  private create() {
    const question = this.form.value as trueAndFalseForCreationViewModel;
    this.questionSrv
      .createQuestion(question, environment.methods.TRUE_AND_FALSE_QUESTIONS)
      .subscribe(() => {
        this.close(true);
      });
  }
  private edit() {
    const question = this.form.value as trueAndFalseForCreationViewModel;
    this.questionSrv
      .updateQuestion(this.inputData.id ,question, environment.methods.TRUE_AND_FALSE_QUESTIONS)
      .subscribe(() => {
        this.close(true);
      });
  }
}
