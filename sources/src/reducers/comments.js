import {
  ITEM_ADD,
  ITEM_DELETE,
  MESSAGE_ADD,
} from 'actions/action-types';

const INIT_STATE = {
  comments: new Map(),
};

function addMessage(state, item, message) {
  const messages = state.comments.get(item);
  state.comments.set(item, [...messages, message]);
  return state;
}

export default function comments(state = INIT_STATE, action) {
  switch (action.type) {
    case ITEM_ADD:
      return {
        ...state,
        comments: state.comments.set(action.item, []),
      };

    case ITEM_DELETE:
      state.comments.delete(action.item);
      return state;

    case MESSAGE_ADD:
      return addMessage(state, action.item, action.message);

    default: return state;
  }
}
