import { Component, OnInit, Pipe, PipeTransform, ElementRef, ViewChild } from '@angular/core';
import { FlickrService } from '../services/flickr.service';
import  lgFullscreen  from 'lightgallery/plugins/fullscreen';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  sizes: string[] = ["tall", "wide", "big"];
  randomNum: number = Math.random() * 3;
  showTitle = false;
 

  hoveredIndex: number | null = null;

  images: any[] = []; // Specify the type of the images array
  keyword: string;
  private debounceTimer: any;

  constructor(private flickrService: FlickrService) { }

  settings = {
    plugins: [
      lgFullscreen
    ]
  }

  temp: string;
  titleTrim(title: string){
    if(title.length > 30){
      return title.substring(0, 30);
    }
    else return title;
  }

  setHoveredIndex(index: number | null): void {
    this.hoveredIndex = index;
  }

  toggleTitleVisibility(show: boolean): void{
    this.showTitle = show;

  }

  @ViewChild('container', { static: true }) container: ElementRef<HTMLElement>;

  setup() {
    const container = this.container.nativeElement;

    Array.from(container.children).forEach((child: any, i) => {
      const order = i % 3;
      child.style.order = order;
    });
  }

  // setup() {
  //   const numCols = 3;
  //   const colHeights = Array(numCols).fill(0);
  //   const container = this.container.nativeElement;

  //   Array.from(container.children).forEach((child: any, i: number) => {
  //     const order = i % numCols;
  //     child.style.order = order;
  //     colHeights[order] += parseFloat(child.clientHeight);
  //   });
  //   container.style.height = Math.max(...colHeights) + "px";
  // }

  ngOnInit() {
    this.setup();
  }

  search(event: any) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.keyword = event.target.value.toLowerCase();
      if (this.keyword && this.keyword.length > 0) {
        this.flickrService.search_keyword(this.keyword)
          .toPromise()
          .then(
            (res: any) => {
              this.images = res;
            },
            (error: any) => {
              console.error('Error fetching images:', error);
            }
          );
      }
    }, 300); // Adjust the debounce time as needed
  }

  onScroll() {
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword)
        .toPromise()
        .then(
          (res: any) => {
            this.images = this.images.concat(res);
          },
          (error: any) => {
            console.error('Error fetching more images:', error);
          }
        );
    }
  }

  
}

@Pipe({
  name: 'masonry'
})
export class MasonryPipe implements PipeTransform {

  transform(value: any[], numColumns: number, colNum: number): unknown {
    if (value.length === 0) return value;
    if (numColumns < 1 || colNum < 1 || isNaN(numColumns) || isNaN(colNum) ||colNum > numColumns) {
      console.error("Invalid column configuration");
      return value;
    }
    return value.filter((val, index) => {
      return index % numColumns  === colNum-1;
    });
  }

}