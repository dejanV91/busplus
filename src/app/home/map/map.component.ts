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
import { Bus } from 'src/app/models/bus';
import { BusStation } from 'src/app/models/busStation';
import { BusStationWithBuses } from 'src/app/models/busStationWithBuses';
import { BusplusService } from 'src/app/services/busplus.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnChanges {
  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;
  map: any;

  constructor() {}

  @Input() busStationWithBuses: BusStationWithBuses = new BusStationWithBuses();

  ngAfterViewInit(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView(
      [44.787197, 20.457273],
      11
    );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  ngOnChanges(): void {
    let currentId = '';
    if (currentId != this.busStationWithBuses.id) {
      this.map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });
    }
    if (this.busStationWithBuses.coords.length) {
      //find station
      this.findStation(
        this.busStationWithBuses.coords[0],
        this.busStationWithBuses.coords[1]
      );

      //find buses
      this.busStationWithBuses.vehicles.forEach((bus: Bus) => {
        this.findBus(bus);
      });
    }

    currentId = this.busStationWithBuses.id;
  }

  findStation(x: string, y: string) {
    let stationIcon = markerColor('yellow');
    L.marker([Number(x), Number(y)], { icon: stationIcon }).addTo(this.map);

    this.map.flyTo([Number(x), Number(y)], 14);
  }

  findBus(bus: Bus) {
    let stationIcon = markerColor('blue');
    L.marker([Number(bus.coords[0]), Number(bus.coords[1])], {
      icon: stationIcon,
    })
      .addTo(this.map)
      .bindPopup(`${bus.lineNumber}`)
      .bindTooltip(`${bus.lineNumber}`)
      .openTooltip();
  }
}

function markerColor(color: string) {
  return L.icon({
    iconUrl: `assets/images/icon${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -30],
    shadowSize: [41, 41],
  });
}
