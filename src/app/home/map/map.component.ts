import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { BusStation } from 'src/app/models/busStation';
import { BusplusService } from 'src/app/services/busplus.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  busStations: BusStation[] = [];

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private service: BusplusService) {}

  ngOnInit(): void {
    this.service.getStations().subscribe({
      next: (stations: BusStation[]) => {
        this.busStations = stations;
      },
    });
  }

  ngAfterViewInit(): void {
    let initialLocation = {
      a: 44.81665,
      b: 20.389,
    };

    const map = L.map(this.mapContainer.nativeElement).setView(
      [initialLocation.a, initialLocation.b],
      16
    );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([initialLocation.a, initialLocation.b])
      .addTo(map)
      .bindPopup('text');
  }
}
