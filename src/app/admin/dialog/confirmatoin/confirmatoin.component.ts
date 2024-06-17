import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-confirmatoin',
  templateUrl: './confirmatoin.component.html',
  styleUrls: ['./confirmatoin.component.scss']
})
export class ConfirmatoinComponent implements OnInit {

  onEmitStatusChange = new EventEmitter();
  details:any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  public themeService:ThemeService
){}

  ngOnInit(): void {
    if(this.dialogData){
      this.details = this.dialogData;
    }
  }

  handelChangeAction =()=>{
    this.onEmitStatusChange.emit();
  }
}
