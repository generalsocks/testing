import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PouchDB from 'pouchdb';
import PouchDBAdapterIDB from 'pouchdb-adapter-idb';
import swal from 'sweetalert';

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

    async fetchAllDocs(db: PouchDB.Database) {
      return await db.allDocs({
        include_docs: true,
        attachments: true
      }).then(result => {
        return result.rows.map(row => row.doc);
      });
   }

   async bulkInsert(db: PouchDB.Database, docs: any[]) {
    try {
       // Fetch all existing documents
       const existingDocs = await this.fetchAllDocs(db);
   
       // Extract existing document IDs
       const existingIds = existingDocs.map(doc => doc!._rev);
   
       // Filter new documents to only include those with unique IDs
       const uniqueNewDocs = docs.filter(newDoc => !existingIds.includes(newDoc._rev));
   
       // Insert unique new documents
       const result = await db.bulkDocs(uniqueNewDocs);
       console.log("Bulk insert is successfully", result);
    } catch (err) {
       console.log(err);
    }
   }

   async findDocById(db: PouchDB.Database, id: string): Promise<any[]> {
    try {
       const doc = await db.get(id);
       console.log("Document found:", doc);
       return [doc];
    } catch (err: any) {
       if (err.name === 'not_found') {
        console.log('Document not found');
         swal("Error", "Document not found", "error");
       } else {
        console.log(err);
         swal("Error", err.message, "error");
       }
       return [];
    }
   }

   async DB_UpdateById(db: PouchDB.Database, id: string, newData: any) 
  {
 
    //for updating record you need to call get method based on id
    let document = await db.get(id);
   
    const updatedDoc = {
      ...document,
      ...newData,
      _rev: document._rev, // Include the current revision number
 
    };
 
    db.put(updatedDoc).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.error("Error while updating data ",err);
    })
  }

  async DB_Insert(db: PouchDB.Database, data: any){
    await db.post(data);
  }
   
   
  // bulkInsert(db: PouchDB.Database, docs: any[]) {
    
  //   db.bulkDocs(docs).then(function (result) {
  //     console.log("Bulk insert is successfully");
  //   }).catch(function (err) {
  //     console.log(err);
  //   });
  // }

}