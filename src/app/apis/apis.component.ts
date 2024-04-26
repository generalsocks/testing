import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ApiDataService } from '../../services/api-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {NavbarComponent} from '../navbar/navbar.component';
import { NetworkService } from '../../services/network.service';
import { PouchdbService } from '../../services/pouchdb.service';
import { StatusBoxComponent } from '../status-box/status-box.component';

@Component({
  selector: 'app-apis',
  standalone: true,
  imports: [NavbarComponent, StatusBoxComponent, CommonModule, HttpClientModule],
  providers: [ApiDataService],
  templateUrl: './apis.component.html',
  styleUrl: './apis.component.css'
})
export class ApisComponent implements OnInit, AfterViewInit {
  posts: any[] = [];
  constructor(
    public networkService: NetworkService,
    private apiDataService: ApiDataService,
    public pouchdbService: PouchdbService
  ) {}
  ngAfterViewInit(): void {
    console.log("AfterViewInit");
    this.pouchdbService.bulkInsert(this.pouchdbService.apidb, this.posts);
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.apiDataService.getPosts().subscribe((posts) => {
      this.posts = posts;
      console.log("Inserting into PouchDB");
      // If DB is empty we proceed line 32 
     
      console.log("Fetching All Docs from PouchDB");
      this.pouchdbService.fetchAllDocs(this.pouchdbService.apidb).then((docs) => {
        console.log(docs);
      }).catch((err) => {
        console.log(err);
      });
      console.log(posts);
    });
  }

  
}
