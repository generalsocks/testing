import * as bcrypt from 'bcryptjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NetworkService } from '../../services/network.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TimerService } from '../../services/timer.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, RouterModule, MatInputModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit, OnDestroy {
form = new FormGroup({
  username: new FormControl(''), 
  pin: new FormControl('')
}); 



constructor(private router: Router, private cookieService: CookieService, public networkService: NetworkService, private timerService: TimerService) {

}
public static  salt = 2; 
public static password = "something"; 
public static hash =  bcrypt.hash(LoginComponent.password,LoginComponent.salt)!;

onSubmit(){
  console.log("Login clicked");
  console.log(this.form.value);
  if (!this.networkService.networkStatus) {
    if(this.deCrypt(this.form.value.pin!) == true){
      this.router.navigate(['/home']);
    }else{
      swal("Wrong pin");
    }
  }
  else {
    this.router.navigate(['/home']);
  }
}

  enCrypt(pin: string): string {
    const hash = bcrypt.hashSync(pin, 3);
    return hash;
  }

deCrypt(pin: string): boolean{
  let pinUser = this.form.value.pin; 
  return bcrypt.compareSync(pinUser!, localStorage.getItem('pin')!);
}

ngOnInit(): void {
  // console.log(hash);
  this.networkService.checkNetworkStatus();
  this.networkService.networkStatus.valueOf;
} 

ngOnDestroy(): void {
  this.networkService.networkStatus$.unsubscribe();
}

getPin(){
// Generate pin
var pin = Math.floor(1000 + Math.random() * 9000);
swal( "Your pin is: " + pin, "Remember this pin for offline login");
let pinEncrypted = this.enCrypt(pin.toString());
localStorage.setItem('pin', pinEncrypted); 

this.timerService.timer();

}

} 




