import { Component, OnInit } from '@angular/core';

import { ApiDataService } from '../../services/api-data.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {NavbarComponent} from '../navbar/navbar.component';
import { NetworkService } from '../../services/network.service';
import { StatusBoxComponent } from '../status-box/status-box.component';

@Component({
  selector: 'app-apis',
  standalone: true,
  imports: [NavbarComponent, StatusBoxComponent, CommonModule],
  templateUrl: './apis.component.html',
  styleUrl: './apis.component.css'
})
export class ApisComponent implements OnInit {

  constructor(public networkService: NetworkService, private apiDataService: ApiDataService) {}

  ngOnInit(): void {
    // this.apiDataService.getPosts();
  }

}
