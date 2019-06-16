import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs/index';
import { DataPoint } from '../model/dataPoint';

@Injectable({
    providedIn: 'root'
  })
  export class DataService {

    constructor(private http: HttpClient) { }

    getData(): Observable<DataPoint[]> {
      return this.http.get<DataPoint[]>('/api/data');
    }
  
  }