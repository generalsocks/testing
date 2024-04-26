import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import PouchDB from 'pouchdb';
import swal from 'sweetalert';

@Component({
  selector: 'app-sync-ceremony',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './syncceremony.component.html',
  styleUrl: './syncceremony.component.css'
})
export class SyncCeremonyComponent {
  private localDB: PouchDB.Database;
  private remoteDBUrl = 'http://localhost:5984/remote_database';

  constructor() {
    this.localDB = new PouchDB('home_database'); 
  }

  async replicateData() {
    try {
      // Replicate from local to remote
      const replication = this.localDB.replicate.to(this.remoteDBUrl, {
        live: false, // Set to true for continuous replication
        retry: true, // Retry on connection errors
      });

      // Listen for events
      replication.on('change', (info) => {
        console.log('Replication change:', info);
        alert("Replication change: " + Object.values(info));
      });

      replication.on('complete', (info) => {
        console.log('Replication completed:', info);
        swal("yay, we're done with the sync!", " " + Object.values(info));
      });

      replication.on('error', (err) => {
        console.error('Replication error:', err);
        alert("boo, something went wrong! " + err);
      });
    } catch (error) {
      console.error('Error during replication:', error);
      alert("boo, something really went wrong! " + error);
    }
  }

}

