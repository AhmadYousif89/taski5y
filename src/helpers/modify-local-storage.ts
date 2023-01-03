export type LSKeys = 'persist' | 'server_error' | 'logged_in' | 'mode';
type LSAction = 'set' | 'get' | 'remove' | 'clear';
type LocalStorageType<A extends LSAction> = {
  action: A;
} & (A extends 'set'
  ? { value: any; key: LSKeys }
  : A extends 'clear'
  ? { value?: any; key?: LSKeys }
  : { value?: any; key: LSKeys });

const keys: LSKeys[] = ['persist', 'logged_in', 'server_error'];

/**
 * performs a specified action on an item in the local storage.
 * @template A - Represents the type of action to be performed.
 * @param {LocalStorageType<A>} options - An object containing the action type, key name and value to be set
 * @param {string} options.action - The type of action to perform. Must be one of 'set', 'get', 'remove', or 'clear'.
 * @param {string} [options.key] - The key of the item in the local storage to perform the action on. Required for 'set', 'get', and 'remove' actions.
 * @param {string} [options.value] - The value to set for the item in the local storage. Required for 'set' action.
 * @returns {any} The value of the item in the local storage for 'get' action after parsing.
 */
export const modifyLocalStorage = <A extends LSAction>({
  action,
  value,
  key,
}: LocalStorageType<A>): any => {
  if (action === 'get' && key) {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      console.log(err);
    }
  }
  if (action === 'set' && key) {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  }
  if (action === 'remove' && key) {
    localStorage.removeItem(key);
  }
  if (action === 'clear') {
    keys.forEach(k => localStorage.removeItem(k));
  }
};
