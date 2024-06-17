import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { AppUserService } from '../services/app-user.service';
import { ThemeService } from '../services/theme.service';
import { GlobalConstants } from '../shared/global-contant';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any=FormGroup;
  responseMessage:any;

  constructor(
    private fb:FormBuilder, 
    private router:Router,
    private appUserService:AppUserService,
    private snakbarService:SnackbarService, 
    private ngxServices:NgxUiLoaderService,
    public themeService:ThemeService,
    private dialogRef: MatDialogRef<LoginComponent>,
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null,[Validators.required]]
    })
  }

  handelSubmit=()=>{
    this.ngxServices.start();
    this.dialogRef.close();
    var formData = this.loginForm.value;
    var data ={
      email:formData.email,
      password:formData.password
    };
    this.appUserService.login(data).subscribe({
      next: (res:any)=>{
        this.ngxServices.stop();
        localStorage.setItem("token",res.token);
        this.router.navigate(['/articleHub/dashboard']);
        this.responseMessage = res.message;
      },error:(error:any)=>{
        this.ngxServices.stop();
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snakbarService.openSnackBar(this.responseMessage)
      }
    })
  }

  onBack(){
    this.router.navigate(['/']);
  }
}
