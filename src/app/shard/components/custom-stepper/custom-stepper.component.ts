import { Component, Input, input } from '@angular/core';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { MaterialModule } from '../../../material-module';

@Component({
  selector: 'app-custom-stepper',
  standalone: true,
  imports: [
    MaterialModule,
    NgTemplateOutlet,
    CdkStepperModule,
    CommonModule
  ],
  templateUrl: './custom-stepper.component.html',
  styleUrl: './custom-stepper.component.css',
  providers:[ { provide: CdkStepper, useExisting: CustomStepperComponent }]
})
export class CustomStepperComponent extends CdkStepper {
  @Input() stepCount: number = 0;
  onClick(index: number) {
    this.selectedIndex = index;
  }
}
