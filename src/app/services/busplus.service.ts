import { Injectable } from '@angular/core';
import { BusStation } from '../models/busStation';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BusStationWithBuses } from '../models/busStationWithBuses';

const baseUrl = 'https://bgpp.fly.dev/api/stations/bg';

@Injectable({
  providedIn: 'root',
})
export class BusplusService {
  constructor(private http: HttpClient) {}

  getStations(): Observable<BusStation[]> {
    return this.http.get(`${baseUrl}/all`).pipe(
      map((json: any) => {
        return json.map((station: any) => new BusStation(station));
      }),
      
    );
  }

  getStationAndBuses(idStanice:string):Observable<BusStationWithBuses>{    
    return this.http.get(`${baseUrl}/search?id=${idStanice}`).pipe(
      map((json:any)=>{    
          return new BusStationWithBuses(json);
      })
    )
  }
}
