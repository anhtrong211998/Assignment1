import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateCategoryComponent } from './create-category/create-category.component'; // add this line

@NgModule({
  declarations: [
    CategoryComponent,
    CreateCategoryComponent
  ],
  imports: [
    SharedModule,
    CategoryRoutingModule,
    NgbDatepickerModule
  ]
})
export class CategoryModule { }
