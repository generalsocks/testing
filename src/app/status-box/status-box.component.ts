import { Component, OnInit } from '@angular/core';

import { PouchdbService } from '../../services/pouchdb.service';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-status-box',
  standalone: true,
  imports: [],
  templateUrl: './status-box.component.html',
  styleUrl: './status-box.component.css'
})
export class StatusBoxComponent implements OnInit  {
  public countIn: number = 0;
  public countOut: number = 0;
  public time: string = "";


  constructor(private pouchDBService: PouchdbService, private timerService: TimerService) {
    
  }

ngOnInit(): void {
  this.pouchDBService.fetchAllDocs(this.pouchDBService.homedb).then(res => {
    console.log("Status Box");
    this.countIn = res.length;
  console.log(res.length); 
  this.time = this.timerService.hours + ':' + this.timerService.minutes + ':' + this.timerService.seconds;
  });
}


}
