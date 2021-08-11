import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { CategoryDto, CategoryService, DeleteMutiCategoryDto, GetCategoryListDto } from '@proxy/categories';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';

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

  isModalOpen = false; // add this line

  form: FormGroup; // add this line

  selectedItem = {} as CategoryDto; // declare selectedBook

  parentCategories=[] as CategoryDto[];

  checkedItems = [];

  public filter: string = '';

  input = {} as GetCategoryListDto;

  selectedItems = {} as DeleteMutiCategoryDto;

  constructor(public readonly list: ListService<GetCategoryListDto>, private categoryService: CategoryService, 
    private fb: FormBuilder, private confirmation: ConfirmationService,private router: Router) { }

  ngOnInit() {
    // this.input.maxResultCount = 5;
    const categroyStreamCreator = (query) => this.categoryService.getList({ ...query, ...this.input });
    this.list.hookToQuery(categroyStreamCreator).subscribe((response) => {
      this.category = response;
    });
    this.getParents();
  }

  getParents(){
    this.input.parentId = '';
    this.categoryService.getListParent().subscribe((response) => {
      this.parentCategories = response
      console.log(response);
    });
  }

  createNew() {
    this.selectedItem = {} as CategoryDto; // reset the selected book
    this.buildForm(); // add this line
    this.isModalOpen = true;
  }

  // Add editBook method
  edit(id: string) {
    this.categoryService.get(id).subscribe((response) => {
      this.selectedItem = response;
      this.buildForm();
      this.isModalOpen = true;
    });
  }
  // add buildForm method
  buildForm() {

    this.form = this.fb.group({
      code: [this.selectedItem.code || '', Validators.required],
      name: [this.selectedItem.name || null, Validators.required],
      parentId: [this.selectedItem.parentId]
    });
  }

  // add save method
  save() {
    if (this.form.invalid) {
      return;
    }

    if (this.selectedItem.id) {
      this.categoryService
        .update(this.selectedItem.id, this.form.value)
        .subscribe(() => {
          this.isModalOpen = false;
          this.form.reset();
          this.list.get();
          this.getParents();
        });
    } else {
      this.categoryService.create(this.form.value).subscribe(() => {
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
        this.getParents();
      });
    }
  }

  // Add a delete method
  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.categoryService.delete(id).subscribe(() => {
          this.list.get();
          this.getParents();
        });
      }
    });
  }

  onSelect(row, e) {
    // console.log(this.category.items.filter(x => x.checked))

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

  showEdit(id: string) {
    this.router.navigateByUrl('/categories/Edit/' + id);
  }

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
