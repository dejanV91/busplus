export class Bus{
    lineNumber: string;
    lineName: string;
    secondsLeft: number;
    stationsBetween: number;
    garageNo: string;
    coords: string[];

    constructor(obj?:any){
        this.lineNumber = obj && obj.lineNumber || '';
        this.lineName = obj && obj.lineName || '';
        this.secondsLeft = obj && obj.secondsLeft || 0;
        this.stationsBetween = obj && obj.stationsBetween || 0;
        this.garageNo = obj && obj.garageNo || '';
        this.coords = obj && obj.coords || [];
    }
  
}