import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobalConstants } from 'src/app/shared/global-contant';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add'
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoryComponent>,
    private snackbarService: SnackbarService,
    public themeService: ThemeService,
    private categoryService: CategoryService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.categoryForm.patchValue(this.dialogData.data);
      this.categoryForm.controls['password'].setValue('password');
    }
  }

  handleSubmit() {
    if (this.dialogAction == "Edit") {
      this.edit();
    } else {
      this.add()
    }
  }

  add() {
    this.ngxService.start();
    var formData = this.categoryForm.value;
    var data = {
      name: formData.name,
    }
    this.categoryService.addNewCategory(data).subscribe({
      next: (res: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddCategory.emit();
        this.responseMessage = res.message;
        this.snackbarService.openSnackBar(this.responseMessage);
      }, error: (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage);
      }
    })
  }

  edit() {
    this.ngxService.start();
    var formData = this.categoryForm.value;
    var data = {
      name: formData.name,
      id: this.dialogData.data.id,
    }
    this.categoryService.updateCategory(data).subscribe({
      next: (res: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.onEditCategory.emit();
        this.responseMessage = res.message;
        this.snackbarService.openSnackBar(this.responseMessage);
      }, error: (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage);
      }
    })
  }
}
