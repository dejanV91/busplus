import { Component, OnInit } from '@angular/core';
import { BusplusService } from '../services/busplus.service';
import { BusStation } from '../models/busStation';
import { BusStationWithBuses } from '../models/busStationWithBuses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  busStations: BusStation[] = [];
  busStationWithBuses:BusStationWithBuses = new BusStationWithBuses();
  idStanice:string='';
  error:boolean = false;
  

  constructor(private service: BusplusService) {}

  ngOnInit(): void {
    this.getStations();
  }

  getStations(){
    this.service.getStations().subscribe({
      next: (stations: BusStation[]) => {
        this.busStations = stations;
      },
    });
  }

  changeBrojStaniceOrIme(brojStanice:string){   
    this.idStanice = brojStanice;
     this.getStationWithBuses();
   }

  getStationWithBuses(){
    this.service.getStationAndBuses(this.idStanice).subscribe({
      next: (stationAndBuses)=> {
          this.error = false;
          this.busStationWithBuses = stationAndBuses;          
      },
      error:(err)=>{
        this.error = true;
      }
    })
  }

  
}
