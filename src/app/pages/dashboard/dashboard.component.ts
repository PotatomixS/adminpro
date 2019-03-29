import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxCalendarComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxcalendar';
import { DateService } from 'src/app/services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  @ViewChild('myCalendar') myCalendar: jqxCalendarComponent;

  horas:string[]=[
  "7:00","7:20","7:40",
  "8:00","8:20","8:40",
  "9:00","9:20","9:40",
  "10:00","10:20","10:40",
  "11:00","11:20","11:40",
  "12:00","12:20","12:40"
  ];

  habilitadas:boolean[]=[true,true,true,true];
  
  constructor(
    public router: Router,
    public _dateService: DateService
  ){
    
  }
  myCalendarEvent(event: any): void {
      let date = event.args.date;
      this._dateService.pedirHoras(date.getDate(), (date.getMonth()+1), date.getFullYear(), "Dentista")
        .subscribe((resp:any) => console.log(resp));
      //this.router.navigate(['/dashboard']);

  }

  ngOnInit() {
  }

}
