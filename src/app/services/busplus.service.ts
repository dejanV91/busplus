import { Injectable } from '@angular/core';
import { BusStation } from '../models/busStation';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://bgpp.fly.dev/api/stations/bg/all';

@Injectable({
  providedIn: 'root',
})
export class BusplusService {
  constructor(private http: HttpClient) {}

  getStations(): Observable<BusStation[]> {
    return this.http.get(baseUrl).pipe(
      map((json: any) => {
        return json.map((station: any) => new BusStation(station));
      })
    );
  }
}
