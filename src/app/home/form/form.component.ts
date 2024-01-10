import {  Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {
  Observable,
  OperatorFunction,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
} from 'rxjs';
import { BusStation } from 'src/app/models/busStation';
import { BusStationWithBuses } from 'src/app/models/busStationWithBuses';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnChanges {
  searchNameStation!: string;
  stationsNames: string[] = [];
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  currentStation = '';
  

  form = new FormGroup({
    tip: new FormControl('broj'),
    broj: new FormControl(''),
  });

  constructor() {}
  
  @ViewChild('inputByNameStation') inputByNameStation!: NgbTypeahead;
  
  @Input() busStations: BusStation[] = [];
  @Input() busStationWithBuses: BusStationWithBuses[] = [];

  @Output() brojStaniceOrIme:EventEmitter<string>= new EventEmitter();


  ngOnChanges(): void {
    this.busStations.forEach((station) => {
      this.stationsNames.push(station.name + ' ' + '(' + station.id + ')');  
    }); 
  }

  onSearchName: OperatorFunction<any, readonly any[]> = (
    text$: Observable<any>
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.inputByNameStation.isPopupOpen())
    );
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        { return (term === ''
          ? this.stationsNames
          : this.stationsNames.filter(
              (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 8)
      })
    );
  };

  onSubmit(){
    if(this.form.value.tip == 'broj') {
      this.brojStaniceOrIme.emit(this.form.value.broj || '');
      this.currentStation = this.form.value.broj || '';      
    }else{
      this.brojStaniceOrIme.emit(
        getIdStationFromFullNameStation(this.searchNameStation || '')
      );
      this.currentStation = getIdStationFromFullNameStation(this.searchNameStation || '');
    }
  }

  isDisabledTraziBtn(){
    if (this.form.value.broj == this.currentStation && this.currentStation && this.form.value.tip=="broj") {
      return true;
    }
    if (
      getIdStationFromFullNameStation(this.searchNameStation || '') == this.currentStation &&
      this.searchNameStation &&
      this.form.value.tip == 'naziv') {
        return true;
    }else{
      return false;
    }
  }
}

function getIdStationFromFullNameStation(searchNameStation:string){
  let naziv = searchNameStation;
  let matchedString = naziv!.match(/\((\d+)\)/);
  return matchedString?.[1] || '';
}


