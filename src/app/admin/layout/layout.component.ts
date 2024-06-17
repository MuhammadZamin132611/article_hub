import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { ConfirmatoinComponent } from '../dialog/confirmatoin/confirmatoin.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private router: Router,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void { }

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout'
    };
    const dialogRef = this.dialog.open(ConfirmatoinComponent, dialogConfig);
    const response = dialogRef.componentInstance.onEmitStatusChange.subscribe((response: any) => {
      dialogRef.close();
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    })


  }
  changeTheme(color: any) {
    this.themeService.setTheme(color);
  }

}
