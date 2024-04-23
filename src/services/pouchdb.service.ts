import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBAdapterIDB from 'pouchdb-adapter-idb';

PouchDB.plugin(PouchDBAdapterIDB);


@Injectable({
  providedIn: 'root'
})
export class PouchdbService {

  constructor() { }
}
