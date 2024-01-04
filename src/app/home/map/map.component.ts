import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { BusStation } from 'src/app/models/busStation';
import { BusStationWithBuses } from 'src/app/models/busStationWithBuses';
import { BusplusService } from 'src/app/services/busplus.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit,OnChanges {

  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;
  map:any;

  constructor() {}

  @Input() busStationWithBuses:BusStationWithBuses = new BusStationWithBuses()

  ngAfterViewInit(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView([44.787197, 20.457273],11);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  ngOnChanges(): void {
    if (this.busStationWithBuses.coords.length) {
      this.findStation(this.busStationWithBuses.coords[0],this.busStationWithBuses.coords[1]);

    }
  }

  findStation(x:string,y:string){
    let stationIcon = markerColor('yellow');

    L.marker([
      Number(x),
      Number(y),
    ],{icon:stationIcon}).addTo(this.map);

    this.map.flyTo([
      Number(x),
      Number(y),
    ], 14);
  }

  
}

function markerColor(color:string){
  return L.icon({
    iconUrl:`../../../assets/images/icon${color}.png`, 
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -14],
    shadowSize: [41, 41],
  });
}
