import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AuthGuard } from '../auth.guard';
import { NavbarComponent } from '../navbar/navbar.component';
import { NetworkService } from '../../services/network.service';
import PouchDB from 'pouchdb';
import { RouterOutlet } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, HttpClientModule, NavbarComponent],
  providers: [AuthGuard],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})



export class HomeComponent implements OnInit, OnDestroy {
  title = 'sw_pouch_app 3';
  datestamp = this.DateSA();
  pouchdb!: any; //PouchDB.Database;
  // networkStatus: boolean = false;
  // networkStatus$: Subscription = Subscription.EMPTY;
  
  userForm!: FormGroup;
  dropDownData!:any;

  constructor(private _fb: FormBuilder,
    private _http:HttpClient, private networkService: NetworkService
  ) {
    this.pouchdb = new PouchDB('pouchform');
    this.networkService.networkStatus.valueOf; 
  }

  ngOnInit(): void {
    this.CreateForm();
    this.networkService.checkNetworkStatus();
    // this.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    this.networkService.networkStatus$.unsubscribe();
  }

  

  //create form model
  private CreateForm() {
    this.userForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: null,
      age: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }

 
  Save(): void {
   console.log("Saved form data");
    const data =  this.userForm.value;
    console.log(data);
    let formValid = this.userForm.valid;
     this.pouchdb.post(data,function(err: string, result: string) {
    if(!formValid){
      swal("Form is not valid");
    } else{
      if (!err) {
        console.log('Successfully posted!');
        swal('Saved!', 'Saved Locally', 'success');
      }
    }
  });

  if (this.userForm.invalid) {
    // Iterate over the form controls
    Object.keys(this.userForm.controls).forEach(field => {
      const control = this.userForm.get(field);
      // Check if the control is invalid
      if (control?.invalid) {
        // Clear the control value
        control.reset();
      }
    });
  } 

  if(formValid){
    this.userForm.reset();
  }
}

  clearForm(): void {
    this.userForm.reset();
  }

  DateSA() {
    const now = new Date();
    const formattedDate = `${now.getUTCFullYear()}-${(now.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getUTCDate().toString().padStart(2, '0')} ${now
      .getUTCHours()
      .toString()
      .padStart(2, '0')}:${now
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}:${now.getUTCSeconds().toString().padStart(2, '0')}`;
    return formattedDate;
  }

  TestSwal() {
    swal('Saved!', 'Online Save', 'success');
  }

  FetchAPI() {
    // fetch('https://mocki.io/v1/3f963e4f-7f48-456c-859c-1d3939ea03a9')
    //   .then((response) => response.json())
    //   .then((json) => {
    //     //console.log(json);
    //     const myArray = Object.values(json);
    //     //console.log(myArray);
    //     this.populateClinician(myArray);
    //   });
//https://6622205c27fcd16fa6c8dc8d.mockapi.io/api/countries
    // this._http.get("https://mocki.io/v1/3f963e4f-7f48-456c-859c-1d3939ea03a9").subscribe(res=>{
      this._http.get("https://mocki.io/v1/3f963e4f-7f48-456c-859c-1d3939ea03a9").subscribe(res=>
        {
          const myArray = Object.values(res);
          this.populateClinician(myArray);
          console.log("List Countries ",res);
        },
        err=>{
          console.error("Error ",err);
        }
      )
  }

  populateClinician(clinicians: any[]) {
    const clinicianArray = clinicians;
    /*
    const cityArray = [
      { id: 101, city: 'Seattle' },
      { id: 102, city: 'New York' },
      { id: 103, city: 'Los Angeles' }
    ]; */
    const selectElement = document.getElementById('selClinicians');
    //document.getElementById('selClinicians').options.length = 0;
    if (selectElement != null) {
      selectElement.innerHTML = '';
    }

    // Iterate through the cityArray and create <option> elements
    clinicianArray.forEach(
      (clinicianRecord: {
        id: { toString: () => string };
        cname: string | null;
      }) => {
        const optionElement = document.createElement('option');
        optionElement.value = clinicianRecord.id.toString(); // Set the value attribute to the city ID
        optionElement.textContent = clinicianRecord.cname; // Set the visible text for the option
        selectElement?.appendChild(optionElement); // Append the option to the select
      }
    );
  }

  clearClinician() {
    const selectElement = document.getElementById('selClinicians');
    //document.getElementById('selClinicians').options.length = 0;
    if (selectElement != null) {
      selectElement.innerHTML = '';
    }
    const optionElement = document.createElement('option');
    optionElement.value = '0'; // Set the value attribute to the city ID
    optionElement.textContent = 'None loaded'; // Set the visible text for the option
    selectElement?.appendChild(optionElement); // Append the option to the select
  }
}
