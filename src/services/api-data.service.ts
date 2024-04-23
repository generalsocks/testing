import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http: HttpClient) { } 

  getPosts(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
       tap(data => {
         console.log('Ping: Get Posts'); 
         console.log(data);
       }),
       catchError(error => {
         console.error('An error occurred:', error);
         // Optionally, re-throw the error or return a default value
         return error; // or return of([])
       })
    );
   }

  getPostByID(postId: number): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  } 

  getPostByComment(postID: number): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`);
  }
}

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

