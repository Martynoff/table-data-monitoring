import { MONITORING_UPDATE } from "../epics/tables";

const defaultState = [];

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case MONITORING_UPDATE:
      return [...payload.items];
    default:
      return state;
  }
};
