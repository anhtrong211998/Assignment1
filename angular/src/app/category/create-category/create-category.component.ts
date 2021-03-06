import { flatten } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDto, CategoryService } from '@proxy/categories';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  private subscription = new Subscription();

  public isShowSelect: boolean = false;

  public form: FormGroup;

  public isReadonly: boolean = false;

  @Input() isRouting: boolean = true;

  @Input() selectItem: any;

  @Input() entityId: string;

  @Input() parentItems: any[];

  @Input() parentCategories: any[];

  @Output() savedEvent: EventEmitter<any> = new EventEmitter();

  @Output() formEvent: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private categoryService: CategoryService, private fb: FormBuilder,
    private router: Router, private activeRoute: ActivatedRoute,
    public bsModalRef: BsModalRef, private appService: AppService,private utilitiesService: UtilitiesService) { }
  ngOnInit(): void {
    if (this.isRouting) {
      this.activeRoute.params.subscribe((params) => {
        //check lead Id here
        this.categoryService.getListParent().subscribe((response) => {
          this.parentCategories = response;
          this.parentItems = this.utilitiesService.UnflatteringForTree(response);

        });

        if (params['id']) {
          this.entityId = params['id'];
          this.subscription.add(this.categoryService.get(this.entityId).subscribe((response) => {
            this.selectItem = response;
            this.buildForm();
          }));
        }
        else {
          this.buildForm();
        }

      });
    }
    else {
      this.buildForm();
    }
  }

// Validate
validation_messages = {
  
  'code': [
    { type: 'required', message: 'Tr?????ng n??y b???t bu???c' },
    { type: 'maxlength', message: 'B???n kh??ng ???????c nh???p qu?? 100 k?? t???' },
    { type: 'pattern', message: 'B???n ph???i nh???p ????ng ?????nh d???ng' }
  ]
};

  // add buildForm method
  buildForm() {
    this.form = this.fb.group({
      'parentId': new FormControl(this.selectItem?.parentId || ''),
      'code': new FormControl(this.selectItem?.code || '', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9-_]+$')
      ])),
      'viName': new FormControl(this.selectItem?.viName),
      'enName': new FormControl(this.selectItem?.enName),
      
      // parentId: [this.selectItem?.parentId || null],
      // code: [this.selectItem?.code || '', Validators.required],
      // viName: [this.selectItem?.viName || null],
      // enName: [this.selectItem?.enName || null],
    });

    this.formEvent.emit(this.form);
  }

  // add save method
  save() {
    if (this.form.invalid) {
      return;
    }
    if (this.isRouting) {
      if (this.selectItem?.id) {
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
  // Add checked method
  onSelect(e) {
    if (e.currentTarget.checked) {
      this.isReadonly = true;
      this.categoryService.getCodeGenerate().subscribe((response) => {
        this.form.controls.code.setValue(response);
      });

    }
    else {
      this.isReadonly = false;
      this.form.controls.code.setValue('');
    }
  }
  
  showSelect() {
    this.isShowSelect = true;
  }

  onEvent(e){
    this.form.controls.parentId.setValue(e.node.data.code);
    this.isShowSelect = false;
    
  }
  // add goBackToList method
  goBackToList() {
    this.appService.load = true;
    this.router.navigateByUrl('/categories');
  }
}
