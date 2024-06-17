import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppUserService } from 'src/app/services/app-user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobalConstants } from 'src/app/shared/global-contant';
import { ManageUsersComponent } from '../dialog/manage-users/manage-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dispalyedColumn: string[] = ['name', 'email', 'status', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private appuserService: AppUserService,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }
  tableData() {
    this.appuserService.getAllAppuser().subscribe({
      next: (res: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(res);
      }, error: (error: any) => {
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
    const dialogRef = this.dialog.open(ManageUsersComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const res = dialogRef.componentInstance.onAddUser.subscribe({
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
    const dialogRef = this.dialog.open(ManageUsersComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const res = dialogRef.componentInstance.onEditUser.subscribe({
      next:(res:any)=>{
        this.tableData();
      }
    });
  }

  onChange(status: any, id: any) {
    this.ngxService.start();
    var data = {
      id: id,
      status: status.toString()
    }
    this.appuserService.updateUserStatus(data).subscribe({
      next: (res: any) => {
        this.ngxService.stop();
        this.responseMessage = res?.message;
        this.snackbarService.openSnackBar(this.responseMessage)
        this.tableData();
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
