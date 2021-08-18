import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateMessageComponent } from './validate-message.component';



@NgModule({
  declarations: [
    ValidateMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ValidateMessageComponent
  ]
})
export class ValidateMessageModule { }
