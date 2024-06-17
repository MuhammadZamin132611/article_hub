import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public themeService:ThemeService,
    public dialog:MatDialog
  ){}

  changeTheme(color:any){
    this.themeService.setTheme(color)
  }

  openLoginForm(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '550px'
    this.dialog.open(LoginComponent, dialogConfig)
  }

  
}
