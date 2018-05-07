import { ITEM_ADD, ITEM_DELETE, ITEM_SELECT } from 'actions/action-types';

const INIT_STATE = {
  items: [],
  selectedItem: null,
};

export default function items(state = INIT_STATE, action) {
  switch (action.type) {
    case ITEM_ADD: return {
      ...state,
      items: [...state.items, action.item],
    };

    case ITEM_DELETE:
      return {
        ...state,
        items: state.items.filter(item => item !== action.item),
      };

    case ITEM_SELECT:
      return {
        ...state,
        selectedItem: action.item,
      };

    default: return state;
  }
}
