import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobalConstants } from 'src/app/shared/global-contant';
import { CategoryComponent } from '../dialog/category/category.component';
import { ConfirmatoinComponent } from '../dialog/confirmatoin/confirmatoin.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  dispalyColumns: string[] = ['name', 'edit'];
  dataSource: any
  responseMessage: any;

  constructor(private categoryService: CategoryService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData()
  }

  tableData = () => {
    this.categoryService.getAllCategory().subscribe({
      next: (res: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(res);
      }, error: (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message
        }
        else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage);
      }
    })
  }

  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handelAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Add'
    }
    dialogConfig.width = '650px'
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const res = dialogRef.componentInstance.onAddCategory.subscribe({
      next:(res:any)=>{
        this.tableData();
      }
    });
  }

  handelEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Edit',
      data:values,
    };
    dialogConfig.width = '650px'
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const res = dialogRef.componentInstance.onEditCategory.subscribe({
      next:(res:any)=>{
        this.tableData();
      }
    });
  }

  handelDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + values.name + ' category'
    };
    const dialogRef = this.dialog.open(ConfirmatoinComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe({
      next: (res: any) => {
        this.ngxService.start();
        this.deleteProduct(values.id);
        dialogRef.close();
      }
    });
  }

  deleteProduct (id: any) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (res: any) => {
        this.ngxService.stop();
        this.tableData();
        this.responseMessage = res?.message;
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
