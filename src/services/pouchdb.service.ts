import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBAdapterIDB from 'pouchdb-adapter-idb';

PouchDB.plugin(PouchDBAdapterIDB);


@Injectable({
  providedIn: 'root'
})
export class PouchdbService {
  public apidb: PouchDB.Database;
  public homedb: PouchDB.Database;


  constructor() {
    this.apidb = new PouchDB('my_database', { adapter: 'idb' });
    this.homedb = new PouchDB('home_database', { adapter: 'idb' }); 
  }

     fetchAllDocs(db: PouchDB.Database) {
      return db.allDocs({
        include_docs: true,
        attachments: true
      }).then(result => {
        return result.rows.map(row => row.doc);
      });
   }


  bulkInsert(db: PouchDB.Database, docs: any[]) {
    //if 
    db.bulkDocs(docs).then(function (result) {
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });
  }

}