export class BusStation {
  name: string;
  uid: number;
  id: string;
  coords: string[];

  constructor(obj?: any) {
    this.name = (obj && obj.name) || '';
    this.uid = (obj && obj.uid) || 0;
    this.id = (obj && obj.id) || '';
    this.coords = (obj && obj.coords) || [];
  }
}
