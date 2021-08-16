import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDto, CategoryService } from '@proxy/categories';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  @Input() isRouting: boolean = true; // add this line

  @Input() selectItem :any; // declare selectedBook

  public form: FormGroup; // add this line

  @Input() entityId: string;

  @Input() parentItems: any[];

  private subscription = new Subscription();

  @Output() savedEvent: EventEmitter<any> = new EventEmitter();

  @Output() formEvent: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private categoryService: CategoryService, private fb: FormBuilder,
    private router: Router, private activeRoute: ActivatedRoute,
    public bsModalRef: BsModalRef, private appService: AppService) { }


  ngOnInit(): void {
    if(this.isRouting){
      this.activeRoute.params.subscribe((params) => {
        //check lead Id here
        this.categoryService.getListParent().subscribe((response) => {
          this.parentItems = response
        });

        if (params['id']) {
          this.entityId = params['id'];        
          this.subscription.add(this.categoryService.get(this.entityId).subscribe((response) => {
            this.selectItem = response;
            this.buildForm();
          }));
        }
        else{
          this.buildForm();
        }
        
      });
    }
    else{
      this.buildForm();
    }
  }
  // add buildForm method
  buildForm() {
    console.log(this.selectItem?.parentId);
    this.form = this.fb.group({
      parentId: [this.selectItem?.parentId || null],
      code: [this.selectItem?.code || '', Validators.required],
      name: [this.selectItem?.name || null, Validators.required],
    });

    this.formEvent.emit(this.form);
  }

  // add save method
  save() {
    if (this.form.invalid) {
      return;
    }
    if (this.isRouting) {
      if (this.selectItem.id) {
        this.categoryService
          .update(this.selectItem.id, this.form.value)
          .subscribe(() => {
            this.appService.load = true;
            this.router.navigateByUrl('/categories');
          });
      }
      else {
        this.categoryService.create(this.form.value).subscribe(() => {
          this.appService.load = true;
          this.router.navigateByUrl('/categories');
        });
      }
    }
    else {
      this.savedEvent.emit(this.form.value);
    }


  }

  // add goBackToList method
  goBackToList() {
    this.appService.load = true;
    this.router.navigateByUrl('/categories');
  }
}
