import { Component, OnInit } from '@angular/core';
import { BusplusService } from '../services/busplus.service';
import { BusStation } from '../models/busStation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  busStations: BusStation[] = [];
  constructor(private service: BusplusService) {}

  ngOnInit(): void {
    this.service.getStations().subscribe({
      next: (stations: BusStation[]) => {
        this.busStations = stations;
      },
    });
  }
}
