import 'rxjs';
import { combineEpics } from 'redux-observable';
import { stream }  from './tables';

export default combineEpics(
  stream
);
