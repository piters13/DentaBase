import { Patient } from './../../core/models/patient';
import { State } from '@ngxs/store';
import { none, Option } from 'fp-ts/lib/Option';

export interface PatientsStateModel {
  patients: Option<ReadonlyArray<Patient>>;
}

const initialState = {
  patients: none,
};

@State<PatientsStateModel>({
  name: 'patients',
  defaults: initialState,
})
export class PatientsState {

}
