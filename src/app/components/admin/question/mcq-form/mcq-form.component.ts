import { Component, Inject, inject } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from '../../../../services/Question.Service';
import { multipleChoiceForCreateOrUpdateViewModel, multipleChoiceQuestion } from '../../../../models/multipleChoiceQuestion';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-mcq-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './mcq-form.component.html',
  styleUrl: './mcq-form.component.css'
})
export class McqFormComponent {
  inputData: any;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private ref: MatDialogRef<McqFormComponent>,
    private formBuilder: FormBuilder,
    private questionSrv: QuestionService
  ) {
    this.form = formBuilder.group({
      title: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
      mark: ['', [Validators.required]],
      optionA: ['', [Validators.required]],
      optionB: ['', [Validators.required]],
      optionC: ['', [Validators.required]],
      optionD: ['', [Validators.required]],
      correctChoice: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.id) {
      this.questionSrv
        .getQuestionById<multipleChoiceQuestion>(
          this.inputData.id,
          environment.methods.MULTIPLE_CHOICE_QUESTIONS
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
    const question = this.form.value as multipleChoiceForCreateOrUpdateViewModel;
    this.questionSrv
      .createQuestion(question, environment.methods.MULTIPLE_CHOICE_QUESTIONS)
      .subscribe(() => {
        this.close(true);
      });
  }
  private edit() {
    const question = this.form.value as multipleChoiceForCreateOrUpdateViewModel;
    this.questionSrv
      .updateQuestion(this.inputData.id ,question, environment.methods.MULTIPLE_CHOICE_QUESTIONS)
      .subscribe(() => {
        this.close(true);
      });
  }
}
