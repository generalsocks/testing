import { Component, OnInit } from '@angular/core';

import { ApiDataService } from '../../services/api-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {NavbarComponent} from '../navbar/navbar.component';
import { NetworkService } from '../../services/network.service';
import { StatusBoxComponent } from '../status-box/status-box.component';

@Component({
  selector: 'app-apis',
  standalone: true,
  imports: [NavbarComponent, StatusBoxComponent, CommonModule, HttpClientModule],
  providers: [ApiDataService],
  templateUrl: './apis.component.html',
  styleUrl: './apis.component.css'
})
export class ApisComponent implements OnInit {
  posts: any[] = [];
  constructor(
    public networkService: NetworkService,
    private apiDataService: ApiDataService
  ) {}

  ngOnInit(): void {
    this.apiDataService.getPosts().subscribe((posts) => {
      this.posts = posts;
      console.log(posts);
    });
  }
}
