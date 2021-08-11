import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDto, CategoryService } from '@proxy/categories';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {


  selectedItem = {} as CategoryDto; // declare selectedBook
  form: FormGroup; // add this line
  public entityId: string;

  constructor(private categoryService: CategoryService,private fb: FormBuilder,private router: Router,private activeRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.entityId = params['id'];
      console.log(this.entityId);
    })
    if (this.entityId) {
      this.categoryService.get(this.entityId).subscribe((response) => {
        this.selectedItem = response;
        this.buildForm();
      });
    } else {
      this.selectedItem = {} as CategoryDto;
      this.buildForm();
    }
    
  }

  // add buildForm method
  buildForm() {

    this.form = this.fb.group({
      code: [this.selectedItem.code || '', Validators.required],
      name: [this.selectedItem.name || null, Validators.required]
    });
  }

  // add save method
  saveData() {
    if (this.form.invalid) {
      return;
    }
      this.categoryService.create(this.form.value).subscribe(() => {
        this.form.reset();
        this.router.navigateByUrl('/categories');
      });
  }
  goBackToList() {
    this.router.navigateByUrl('/categories');
  }
}
