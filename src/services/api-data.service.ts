import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http: HttpClient) { } 

  async getPosts(): Promise<Observable<Posts[]>> {
    return await this.http.get<Posts[]>('https://mocki.io/v1/e3d14874-74dd-4002-b57c-bebc99387cae').pipe(
       map(posts => posts.slice(0, 6)), // Use map to slice the array to the first 10 posts
       tap(data => {
         console.log('Ping: Get Posts'); 
       }),
       catchError(error => {
         console.error('An error occurred:', error);
         // Optionally, re-throw the error or return a default value
         return of([]); // Return an empty array of Posts
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
  name: string;
  username: string;
  email: string;
}

