import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateCategoryComponent } from './create-category/create-category.component'; // add this line
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { TreeModule } from '@circlon/angular-tree-component';

@NgModule({
  declarations: [
    CategoryComponent,
    CreateCategoryComponent
  ],
  imports: [
    SharedModule,
    CategoryRoutingModule,
    NgbDatepickerModule,
    TreeModule,
    ModalModule.forRoot()
  ],
  providers: [
    BsModalService,
    BsModalRef
  ]
})
export class CategoryModule { }
