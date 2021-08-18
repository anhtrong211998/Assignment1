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

  public strCode: string = '';

  public strParent: string = '';

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
    { type: 'required', message: 'Trường này bắt buộc' },
    { type: 'maxlength', message: 'Bạn không được nhập quá 100 kí tự' },
    { type: 'pattern', message: 'Bạn phải nhập đúng định dạng' }
  ]
};

  // add buildForm method
  buildForm() {
    this.strCode = this.selectItem?.code ? this.selectItem?.code : '';
    this.strParent = this.selectItem?.parentId  ? this.selectItem?.parentId  : '';
    this.form = this.fb.group({
      'parentId': new FormControl(this.strParent),
      'code': new FormControl(this.strCode, Validators.compose([
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
        this.strCode = response
      });

    }
    else {
      this.isReadonly = false;
      this.strCode = '';
    }
  }
  
  showSelect() {
    this.isShowSelect = true;
  }

  onEvent(e){
    this.strParent = e.node.data.code;
    this.isShowSelect = false;
    
  }
  // add goBackToList method
  goBackToList() {
    this.appService.load = true;
    this.router.navigateByUrl('/categories');
  }
}
