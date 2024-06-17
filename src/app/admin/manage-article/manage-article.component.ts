import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ArticleService } from 'src/app/services/article.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobalConstants } from 'src/app/shared/global-contant';
import { ConfirmatoinComponent } from '../dialog/confirmatoin/confirmatoin.component';
import { ArticleComponent } from '../dialog/article/article.component';
import { ViewArticleComponent } from '../dialog/view-article/view-article.component';

@Component({
  selector: 'app-manage-article',
  templateUrl: './manage-article.component.html',
  styleUrls: ['./manage-article.component.scss']
})
export class ManageArticleComponent implements OnInit {
  dispalyedColumns: string[] = ['title', 'categoryName', 'status', 'publication_date', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    public themeService: ThemeService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.articleService.getAllArticle().subscribe({
      next: (res: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(res);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handelAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = '650px'
    const dialogRef = this.dialog.open(ArticleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const res = dialogRef.componentInstance.onAddArticle.subscribe({
      next: (res: any) => {
        this.tableData();
      }
    });
  }

  handelViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'View',
      data:values,
    };
    dialogConfig.width = '750px'
    const dialogRef = this.dialog.open(ViewArticleComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
  }

  handelEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Edit',
      data:values,
    };
    dialogConfig.width = '650px'
    const dialogRef = this.dialog.open(ArticleComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const res = dialogRef.componentInstance.onEditArticle.subscribe({
      next:(res:any)=>{
        this.tableData();
      }
    });
  }

  onDelete(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + value.title + ' article'
    }
    const dialogRef = this.dialog.open(ConfirmatoinComponent, dialogConfig);
    const res = dialogRef.componentInstance.onEmitStatusChange.subscribe({
      next: (res: any) => {
        this.ngxService.start();
        this.deleteProduct(value.id);
        dialogRef.close();
      }
    })
  }

  deleteProduct(id: any) {
    this.articleService.deleteArticle(id).subscribe({
      next: (res: any) => {
        this.ngxService.stop();
        this.tableData();
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
