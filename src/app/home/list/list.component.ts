import { Component, Input, OnChanges} from '@angular/core';
import { Bus } from 'src/app/models/bus';
import { BusStationWithBuses } from 'src/app/models/busStationWithBuses';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnChanges {

  buses:Bus[]=[];

  @Input() busStationWithBuses:BusStationWithBuses = new BusStationWithBuses();
  @Input() error!:boolean;


  ngOnChanges(): void {
    if (this.busStationWithBuses.vehicles) {
      this.buses = this.busStationWithBuses.vehicles.sort((a:Bus,b:Bus)=>
        a.secondsLeft - b.secondsLeft
      ).slice(0,10);
    }
  }

}
