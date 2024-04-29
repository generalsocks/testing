import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ApiDataService } from '../../services/api-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { NetworkService } from '../../services/network.service';
import { PouchdbService } from '../../services/pouchdb.service';
import { StatusBoxComponent } from '../status-box/status-box.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-apis',
  standalone: true,
  imports: [
    NavbarComponent,
    StatusBoxComponent,
    CommonModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule, 
    FormsModule
  ],
  providers: [ApiDataService, NetworkService],
  templateUrl: './apis.component.html',
  styleUrl: './apis.component.css',
})
export class ApisComponent implements OnInit {
  posts: any[] = []; 
  docs: any[] = [];
  selUserToDelete = '';
  selectedIdForUpdate = '';
  selectedFieldForUpdate = '';
  textForUpdate = '';
  searchForm = new FormGroup({
    searchInput: new FormControl('')
 });
 userForm!: FormGroup; 
 

  constructor(
    public networkService: NetworkService,
    private apiDataService: ApiDataService,
    public pouchdbService: PouchdbService, 
    public networkStatus: NetworkService,
    private _fb:FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.CreateForm();
    await this.getData();
    this.networkService.checkNetworkStatus();
    this.selUserToDelete = '0';
    this.selectedIdForUpdate = '0';
    this.selectedFieldForUpdate = '0';
    this.textForUpdate="";
  }

  ngOnDestroy(): void {
    this.networkService.networkStatus$.unsubscribe();
    this.networkService.networkStatus.valueOf;
  }
  async getData() {
    if(navigator.onLine)
    (await this.apiDataService.getPosts()).subscribe(async (posts) => {
      this.posts = posts;
      await this.pouchdbService.bulkInsert(this.pouchdbService.apidb, posts);
      
    });
    else
    {
      await this.pouchdbService
        .fetchAllDocs(this.pouchdbService.apidb)
        .then((docs) => {
          this.posts=docs;
          // console.log("Fetching all docs",docs);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } 

  async findPost(id: string) {
    console.log("Searching for post with id:", id);
    const searchValue = this.searchForm.get('searchInput')!.value;
   this.pouchdbService.findDocById(this.pouchdbService.apidb, id).then(result => {
       this.docs = result;
   }).catch(err => {
      console.log(err);
   });
  } 

  async deleteUser(id: string){
    if (id == '') {
      swal("no record was selected for deletion");
    } 
    else {
      console.log("Deleting post with id:", id);
      await this.pouchdbService.DB_DeleteById(this.pouchdbService.apidb, id);
      await this.pouchdbService
        .fetchAllDocs(this.pouchdbService.apidb)
        .then((docs) => {
          this.posts=docs;
          this.selUserToDelete="0";
          swal("Data is deleted successfully");
          //console.log("Fetching all docs",docs);
        })
        .catch((err) => {
          console.log(err);
        });
    } 
  }
  async updatePost(id: string, field: string, newValue: string) {
    console.log("Updating the record with id:", id); 
    if(id=="0")
      {
        swal("Please select the id");
        return;
      }
      if(field=="0")
        {
          swal("Please select the field");
          return;
        }
    console.log("Field to update:", field);
    let changedData = {};
    if(field == 'name') {
       changedData = {
        name: newValue,
      }
    }else if (field == 'username'){
       changedData = {
        username: newValue,
      }
    } else {
       changedData = {
        email: newValue,
      }
    }
   
    await this.pouchdbService.DB_UpdateById(this.pouchdbService.apidb, id, changedData);
    await this.pouchdbService
        .fetchAllDocs(this.pouchdbService.apidb)
        .then((docs) => {
          this.posts=docs;
          this.selectedIdForUpdate = '0';
          this.selectedFieldForUpdate = '0';
          this.textForUpdate="";
          swal("Data is updated successfully");
          //console.log("Fetching all docs",docs);
        })
        .catch((err) => {
          console.log(err);
        });
  }

//create form model
private CreateForm() {
  this.userForm = this._fb.group({
    name: ['', Validators.required],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });
}

  InsertData()
  {
    if(this.userForm.invalid)
      {
        swal("Please fill all the required fields");
        return;
      }

      let data=this.userForm.getRawValue();
      console.log(data);
      this.pouchdbService.apidb.post(data).then(res=>{
        swal("Data is inserted successfully");
        this.userForm.reset();
        this.pouchdbService
        .fetchAllDocs(this.pouchdbService.apidb)
        .then((docs) => {
          this.posts=docs;
          //console.log('Fetching all docs', docs);
        })
        .catch((err) => {
          console.log(err);
        });
      }).catch(err=>{
        swal("Error while inserting the data");
      })
  }
}
