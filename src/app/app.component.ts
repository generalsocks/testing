import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription, fromEvent, merge, of } from 'rxjs';

import PouchDB from 'pouchdb';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sw_pouch_app 3';
  datestamp = this.DateSA();
  pouchdb!: any; //PouchDB.Database;
  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;
  userForm!: FormGroup;
  dropDownData!:any;

  constructor(private _fb: FormBuilder,
    private _http:HttpClient
  ) {
    this.pouchdb = new PouchDB('pouchform');
  }

  ngOnInit(): void {
    this.CreateForm();
    this.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;

    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe((status) => {
        console.log('status', status);
        this.networkStatus = status;
        this.updateImageVisibility(status);
      });
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

  // Check online/offline status
  updateImageVisibility(status: boolean) {
    const onlineImage = document.getElementById('onlineImage');
    const offlineImage = document.getElementById('offlineImage');
    if (status == true && onlineImage != null && offlineImage != null) {
      onlineImage.style.display = 'block';
      offlineImage.style.display = 'none';
    } else if (status == false && onlineImage != null && offlineImage != null) {
      onlineImage.style.display = 'none';
      offlineImage.style.display = 'block';
    }
  }

  Save(): void {
    //var pouchdb = new PouchDB('perigon_device123');
    //var remoteCouch = 'http://admin:couch0surfing@localhost:5984/perigon_device123';
    //var cookie;

    /*
    //Input validation
    var name = document.getElementById('name')?.textContent;
    var email = document.getElementById('email')?.value;
    var age =  document.getElementById('age')?.value;
    var insync = 'no';

    if (name.length < 1){
      //alert('Name not filled');
      swal("Name not filled", "Input validation");
      name.focus();
      return;
    }
    if (email.length < 1){
      //alert('Email invalid');
      swal("Email not filled");
      document.getElementById('email')?.focus();
      return;
    }
    if (age.length < 1){
      //alert('Age invalid');
      swal("Age invalid");
      document.getElementById('age')?.focus();
      return;
    }
  
    //End input validation
    */

    var perigonpouch = {
      name: 'Jane', //document.getElementById('name')?.value,
      email: 'jane@gm.com',
      gender: 'Female',
      age: 23,
      notes: "Jane's notes",
    };
    this.pouchdb.post(perigonpouch, function (err: string, result: string) {
      if (!err) {
        console.log('Successfully posted! {{networkStatus}}');
        swal('Saved!', 'Saved Locally', 'success');
      }
    });
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
          console.log("List Clinicians ",res);
          const myArray = Object.values(res);
          this.populateClinician(myArray);
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
