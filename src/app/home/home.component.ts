import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { ArticleService } from '../services/article.service';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-contant';
import { ArticleDetailsComponent } from '../article-details/article-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  responseMessage: any;
  articles: any;
  searchText: string = '';

  constructor(public themeService: ThemeService,
    public dialog: MatDialog,
    private articleService: ArticleService,
    private snackbarService: SnackbarService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.articleService.getAllPublishedArticle().subscribe({
      next: (res: any) => {
        this.articles = res;
        this.ngxService.stop();
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
    });
  }

  filterdItems(): any {
    return this.articles?.filter(item => item.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  changeTheme(color: any) {
    this.themeService.setTheme(color)
  }

  openLoginForm() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '650px'
    this.dialog.open(LoginComponent, dialogConfig)
  }

  handelViewAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Edit',
      data:values,
    }
    dialogConfig.width = '650px';
    const dialogRef = this.dialog.open(ArticleDetailsComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }

}
