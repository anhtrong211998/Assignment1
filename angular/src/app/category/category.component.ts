import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { CategoryDto, CategoryService, DeleteMutiCategoryDto, GetCategoryListDto } from '@proxy/categories';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { AppService } from '../shared/services/app.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [
    ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter } // add this line
  ],
})
export class CategoryComponent implements OnInit {
  category = { items: [], totalCount: 0 } as PagedResultDto<CategoryDto>;
   // Default
   public bsModalRef: BsModalRef;

  public selectedItem = {} as CategoryDto; 

  public parentCategories=[] as CategoryDto[];

  public checkedItems = [];

  public input = {} as GetCategoryListDto;

  public selectedItems = {} as DeleteMutiCategoryDto;

  public currentPage: number = 1;

  public pageSize: number = 5;

  constructor(public readonly list: ListService<GetCategoryListDto>, private categoryService: CategoryService, 
    private fb: FormBuilder, private confirmation: ConfirmationService,private router: Router,
    private modalService: BsModalService, private appService: AppService) { }

  ngOnInit() {

    this.loadData()
  }

  // load data method
  loadData(){
    this.input.maxResultCount = this.pageSize;
    this.input.skipCount = (this.currentPage - 1) * this.pageSize;
    // console.log(this.input.skipCount);
    const categroyStreamCreator = (query) => this.categoryService.getList({ ...query, ...this.input });
    this.list.hookToQuery(categroyStreamCreator).subscribe((response) => {
      this.category = response;
    });
    this.getParents();
  }

  // add get parent of categories
  getParents(){
    this.input.parentId = '';
    this.categoryService.getListParent().subscribe((response) => {
      this.parentCategories = response
    });
  }

  // add new method
  createNew() {
    const initialState = {
      isModalOpen: true,
      parentItems: this.parentCategories
    };
    this.bsModalRef = this.modalService.show(CreateCategoryComponent,
      {
        initialState: initialState,
        class: 'modal-lg',
        backdrop: 'static'
      });
    this.bsModalRef.content.savedEvent.subscribe((response) => {
      this.bsModalRef.hide();
      this.appService.load = true;
      this.loadData();
      this.selectedItem = {} as CategoryDto; // reset the selected book
    });
    
  }

  // Add edit method
  edit(id: string) {
    const initialState = {
      isModalOpen: true,
      parentItems: this.parentCategories,
      entityId: id
    };
    this.bsModalRef = this.modalService.show(CreateCategoryComponent,
      {
        initialState: initialState,
        class: 'modal-lg',
        backdrop: 'static'
      });
    this.bsModalRef.content.savedEvent.subscribe((response) => {
      this.bsModalRef.hide();
      this.appService.load = true;
      this.loadData();
      this.selectedItem = {} as CategoryDto; // reset the selected book
    });
  }

  // Add a delete method
  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.categoryService.delete(id).subscribe(() => {
          this.appService.load = true;
          this.loadData();
        });
      }
    });
  }

  // Add checked method
  onSelect(row, e) {
    if (e.currentTarget.checked) {
      this.checkedItems.push(row.id);
    }
    else {
      this.checkedItems.forEach((element, index) => {
        console.log(element)
        if (element == row.id) {
          this.checkedItems.splice(index, 1);
        }
      });
    }
  }

  // Add change page method
  onPageChange(e){
    this.currentPage = e.page;
    this.loadData();
 
    // this.input.maxResultCount = this.pageSize;
    // this.input.skipCount = (this.currentPage - 1) * this.pageSize;
    // this.list.get();
  }

  // go to edit page
  showEdit(id: string) {
    this.router.navigateByUrl('/categories/Edit/' + id);
  }

  // delete multi method
  deleteMulti() {
    this.selectedItems.id = this.checkedItems;
    console.log(this.selectedItems.id)

    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.categoryService.deleteMany(this.selectedItems).subscribe(() => this.list.get());
      }
    });
  }
}
