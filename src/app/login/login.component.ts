import * as bcrypt from 'bcryptjs';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, RouterModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
form = new FormGroup({
  username: new FormControl(''), 
  pin: new FormControl('')
}); 



constructor(private router: Router, private cookieService: CookieService){

}
public static  salt = 2; 
public static password = "something"; 
public static hash =  bcrypt.hash(LoginComponent.password,LoginComponent.salt)!;

onSubmit(){
  console.log("Login clicked");
  console.log(this.form.value);

  this.router.navigate(['/home']);
}

enCrypt(){
 console.log(LoginComponent.hash);
}

deCrypt(){
const salt = 2; 
const password = "something"; 
const hash = bcrypt.hashSync(password, salt); 
console.log("Decrypting");
console.log(bcrypt.compareSync("fekarvb", hash));
}

ngOnInit(): void {
  // console.log(hash);
} 

getPin(){
// Generate pin
var pin = Math.floor(1000 + Math.random() * 9000);
swal( "Your pin is: " + pin, "Remember this pin for offline login");
}

} 




