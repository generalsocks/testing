import { Component, OnInit } from '@angular/core';

import { ApiDataService } from '../../services/api-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { NetworkService } from '../../services/network.service';
import { PouchdbService } from '../../services/pouchdb.service';
import { StatusBoxComponent } from '../status-box/status-box.component';

@Component({
  selector: 'app-apis',
  standalone: true,
  imports: [
    NavbarComponent,
    StatusBoxComponent,
    CommonModule,
    HttpClientModule,
  ],
  providers: [ApiDataService],
  templateUrl: './apis.component.html',
  styleUrl: './apis.component.css',
})
export class ApisComponent implements OnInit {
  posts: any[] = [];
  constructor(
    public networkService: NetworkService,
    private apiDataService: ApiDataService,
    public pouchdbService: PouchdbService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getData();
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
}
