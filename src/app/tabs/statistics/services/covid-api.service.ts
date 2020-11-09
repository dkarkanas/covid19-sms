import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Case, CaseRegion } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {

  private apiUrl = 'https://covid-19-greece.herokuapp.com';

  constructor(private http: HttpClient) { }

  getDaily(): Observable<Case[]> {
    return this.http.get(`${this.apiUrl}/all`).pipe(
      map((response: any) => {
        const data = response.cases as Case[];

        // filter only the last 10 days of the results
        return data.filter(item => {
          return new Date(item.date) >= this.getTenDaysBefore()
        });
      })
    );
  }

  getTotal(): Observable<Case> {
    return this.http.get(`${this.apiUrl}/total`).pipe(
      map((response: any) => response.cases as Case)
    );    
  }

  getRegionTotal(): Observable<CaseRegion[]> {
    return this.http.get(`${this.apiUrl}/regions`).pipe(
      map((response: any) => {
        const data = response.regions as any[];

        // filter only the last 10 days of the results
        return data.map((item: any) => {
          return {
            totalCases: item.region_cases,
            region: item.region_gr_name
          } as CaseRegion;
        });
      })
    );
  }

  getAgeDistribution(){
     // age-distribution
  }

  getGenderDistribution(){
    // gender-distribution
  }

  private getTenDaysBefore(): Date {
    const date = new Date();
    date.setDate(date.getDate() - 10);

    return date;
  }
}
