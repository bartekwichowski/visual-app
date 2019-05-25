import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, from, merge, of } from 'rxjs/index';
import { DataPoint } from '../model/dataPoint';

@Injectable({
    providedIn: 'root'
  })
  export class DataService {

    constructor(private http: HttpClient) { }

    private dataPoints: Observable<DataPoint[]> =  of([
      new DataPoint(new Date("December 30, 2019 11:20:25"), 1),
      new DataPoint(new Date("December 30, 2018 11:20:25"), 2),
      new DataPoint(new Date("December 30, 2017 11:20:25"), 3)
    ]);
    private observables: BehaviorSubject<DataPoint[]> = new BehaviorSubject([]);

    getData(): Observable<DataPoint[]> { return this.dataPoints }
  
  }