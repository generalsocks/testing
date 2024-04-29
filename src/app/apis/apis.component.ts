import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  searchForm = new FormGroup({
    searchInput: new FormControl('')
 });
 

  constructor(
    public networkService: NetworkService,
    private apiDataService: ApiDataService,
    public pouchdbService: PouchdbService, 
    public networkStatus: NetworkService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getData();
    this.networkService.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    this.networkService.networkStatus$.unsubscribe();
    this.networkService.networkStatus.valueOf;
  }
  async getData() {
    (await this.apiDataService.getPosts()).subscribe(async (posts) => {
      this.posts = posts;
      await this.pouchdbService.bulkInsert(this.pouchdbService.apidb, posts);
      await this.pouchdbService
        .fetchAllDocs(this.pouchdbService.apidb)
        .then((docs) => {
          console.log("Fetching all docs",docs);
        })
        .catch((err) => {
          console.log(err);
        });
    });
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

  deleteUser(id: string){
    if (id == '') {
      swal("no record was selected for deletion");
    } 
    else {
      console.log("Deleting post with id:", id);
      this.pouchdbService.DB_DeleteById(this.pouchdbService.apidb, id);
    } 
  }
  
 
}
