import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
 // Timer Functionality
 seconds: string = "00";
 minutes: string = "00";
 hours: string = "00";
 counter: number = 0;
 timeoutId: any;

 getFormattedTimeStamp(timestamp: any) {
  return timestamp < 10 ? "0" + timestamp : timestamp;
 }
 

//   timer() {
//     let mcountercal = 0;
//     let currentSeconds = parseInt(this.seconds);
//     let currentMinutes = parseInt(this.minutes);
//     let currentHours = parseInt(this.hours);
//     this.counter =
//       currentHours * 3600000 + currentMinutes * 60000 + currentSeconds * 1000;
//     const startTime = Date.now() - (this.counter || 0);
//     this.timeoutId = setInterval(() => {
//       this.counter = Date.now() - startTime;
//       currentHours = Math.floor(this.counter / 3600000);
//       currentMinutes = Math.floor(this.counter / 60000) - currentHours * 60;
//       mcountercal = Math.floor(this.counter / 60000);
//       currentSeconds = Math.floor(this.counter / 1000) - mcountercal * 60;
//       this.hours = this.getFormattedTimeStamp(currentHours.toString());
//       this.minutes = this.getFormattedTimeStamp(currentMinutes.toString());
//       this.seconds = this.getFormattedTimeStamp(currentSeconds.toString());
//     }, 1000);

//  }

timer() {
  let mcountercal = 0;
  // Set initial values to start from 12 hours down
  let currentSeconds = 0;
  let currentMinutes = 0;
  let currentHours = 12; // Start from 12 hours
  // Total duration in milliseconds (12 hours)
  const totalDuration = currentHours * 3600000 + currentMinutes * 60000 + currentSeconds * 1000;
  const startTime = Date.now();
  this.timeoutId = setInterval(() => {
     // Calculate elapsed time since the start
     const elapsedTime = Date.now() - startTime;
     // Calculate remaining time by subtracting elapsed time from total duration
     const remainingTime = totalDuration - elapsedTime;
     currentHours = Math.floor(remainingTime / 3600000);
     currentMinutes = Math.floor((remainingTime % 3600000) / 60000);
     currentSeconds = Math.floor((remainingTime % 60000) / 1000);
     this.hours = this.getFormattedTimeStamp(currentHours.toString());
     this.minutes = this.getFormattedTimeStamp(currentMinutes.toString());
     this.seconds = this.getFormattedTimeStamp(currentSeconds.toString());
  }, 1000);
 }
 
 

 resetTimer() {
  clearInterval(this.timeoutId);
  this.seconds = "00";
  this.minutes = "00";
  this.hours = "12";
 }

  constructor() { }
}
