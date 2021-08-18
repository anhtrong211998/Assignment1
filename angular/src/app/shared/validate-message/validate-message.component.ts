import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validate-message',
  templateUrl: './validate-message.component.html',
  styleUrls: ['./validate-message.component.scss']
})
export class ValidateMessageComponent implements OnInit {

  @Input() entityForm: FormGroup;
  @Input() fieldName: string;
  @Input() validationMessages: any;
  constructor() { }

  ngOnInit(): void {
  }

}
