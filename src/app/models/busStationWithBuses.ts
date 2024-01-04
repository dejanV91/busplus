import { Bus } from "./bus";

export class BusStationWithBuses{
    city:string;
    name: string;
    uid: number;
    id: string;
    coords: string[];
    vehicles: Bus[];
  
    constructor(obj?: any) {
      this.city = (obj && obj.city) || '';
      this.name = (obj && obj.name) || '';
      this.uid = (obj && obj.uid) || 0;
      this.id = (obj && obj.id) || '';
      this.coords = (obj && obj.coords) || [];
      this.vehicles = obj && obj.vehicles && obj.vehicles.map((jsonBus:any)=>{
        return new Bus(jsonBus);
      })
    }
}