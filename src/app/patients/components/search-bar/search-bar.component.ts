import { Patient } from './../../../core/models/patient';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PatientsService } from '@app/core/services/patients.service';

@Component({
  selector: 'db-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit {
  myControl = new FormGroup({});
  filteredOptions: Observable<string[]>;
  allPatients: Patient[];
  autoCompleteList: any[];

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() selectedOption = new EventEmitter();

  constructor(
    private patientsService: PatientsService
  ) { }

  ngOnInit() {
      this.patientsService.getPatients().subscribe(patients => {
          this.allPatients = patients;
      });

      console.log(this.patientsService.searchOption);

      this.myControl.valueChanges.subscribe(userInput => {
          this.autoCompleteExpenseList(userInput);
      });
  }

  private autoCompleteExpenseList(input) {
    const categoryList = this.filterCategoryList(input);
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val) {
    if (typeof val !== 'string') {
        return [];
    }
    if (val === '' || val === null) {
        return [];
    }
    return val ? this.allPatients.filter(s => s.lastname.toLowerCase().indexOf(val.toLowerCase()) !== -1)
        : this.allPatients;
  }

  displayFn(patient: Patient) {
      const k = patient ? patient.lastname : patient;
      return k;
  }

  filterPatientList(event) {
      const patients = event.source.value;
      if (!patients) {
          this.patientsService.searchOption = [];
      } else {

          this.patientsService.searchOption.push(patients);
          this.selectedOption.emit(this.patientsService.searchOption);
      }
      this.focusOnPlaceInput();
  }

  removeOption(option) {

      const index = this.patientsService.searchOption.indexOf(option);
      if (index >= 0) {
        this.patientsService.searchOption.splice(index, 1);
      }
      this.focusOnPlaceInput();

      this.selectedOption.emit(this.patientsService.searchOption);
  }

  focusOnPlaceInput() {
      this.autocompleteInput.nativeElement.focus();
      this.autocompleteInput.nativeElement.value = '';
  }
}
