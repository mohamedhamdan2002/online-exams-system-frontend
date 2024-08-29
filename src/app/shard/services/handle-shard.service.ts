import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleShardService {

  constructor(private loaction: Location) { }

  goBack() {
    // this like navigate the component again and send request again this not better i think , search for another way
    this.loaction.back();
  }
}
