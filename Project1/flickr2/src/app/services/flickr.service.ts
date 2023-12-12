import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  private prevKeyword!: string;
  private currPage = 1;

  constructor(private http: HttpClient) { }

  search_keyword(keyword: string): Observable<any[]> {
    if (this.prevKeyword === keyword) {
      this.currPage++;
    } else {
      this.currPage = 1;
    }
    this.prevKeyword = keyword;
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.currPage}`;
    //export const FLICKR_API_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${environment.flickr.key}&format=json&nojsoncallback=1&per_page=12`;
    return this.http.get<FlickrOutput>(url + params).pipe(
      map(res => res.photos.photo.map(ph => ({
        url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}.jpg`,
        title: ph.title
      })))
    );
  }
}
