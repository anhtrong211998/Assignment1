import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'; // add this line

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    SharedModule,
    CategoryRoutingModule,
    NgbDatepickerModule
  ]
})
export class CategoryModule { }
