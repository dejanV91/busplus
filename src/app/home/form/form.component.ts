import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnChanges {
  searchNameStation?: string;
  stationsNames: string[] = [];
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  form = new FormGroup({
    tip: new FormControl('broj'),
    broj: new FormControl(''),
  });

  constructor() {}

  @ViewChild('inputByNameStation') inputByNameStation!: NgbTypeahead;
  @Input() busStations: BusStation[] = [];
  
  @Output() brojStanice:EventEmitter<string>= new EventEmitter();

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
        (term === ''
          ? this.stationsNames
          : this.stationsNames.filter(
              (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 5)
      )
    );
  };

  onSubmit(){
    this.brojStanice.emit(this.form.value.broj || '');
  }
}
