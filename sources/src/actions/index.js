import {
  ITEM_ADD,
  ITEM_DELETE,
  ITEM_SELECT,
  MESSAGE_ADD,
} from './action-types';

export function itemAdd(item) {
  return {
    type: ITEM_ADD,
    item,
  };
}

export function itemDelete(item) {
  return {
    type: ITEM_DELETE,
    item,
  };
}

export function itemSelect(item) {
  return {
    type: ITEM_SELECT,
    item,
  };
}

export function messageAdd(message, item) {
  return {
    type: MESSAGE_ADD,
    message,
    item,
  };
}
