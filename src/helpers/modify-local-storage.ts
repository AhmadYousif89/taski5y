type Action = 'set' | 'get' | 'remove' | 'clear';
type Keys = 'persist' | 'server_error' | 'logged_in' | 'mode';
type LocalStorageType<A extends Action> = {
  action: A;
} & (A extends 'set'
  ? { value: string; key: Keys }
  : A extends 'clear'
  ? { value?: string; key?: Keys }
  : { value?: string; key: Keys });

const keys: Keys[] = ['persist', 'logged_in', 'server_error'];

/**
 * performs a specified action on an item in the local storage.
 * @template A - Represents the type of action to be performed.
 * @param {LocalStorageType<A>} options - An object containing the action type, key name and value to be set
 * @param {string} options.action - The type of action to perform. Must be one of 'set', 'get', 'remove', or 'clear'.
 * @param {string} [options.key] - The key of the item in the local storage to perform the action on. Required for 'set', 'get', and 'remove' actions.
 * @param {string} [options.value] - The value to set for the item in the local storage. Required for 'set' action.
 * @returns {string | null | void} The value of the item in the local storage for 'get' action as string or null or does not return anything for the rest of actions.
 */
export const modifyLocalStorage = <A extends Action>({
  action,
  value,
  key,
}: LocalStorageType<A>): string | null | void => {
  if (action === 'get' && key) {
    const keyItem = localStorage.getItem(key);
    return keyItem;
  }
  if (action === 'set' && key && value) {
    localStorage.setItem(key, value);
  }
  if (action === 'remove' && key) {
    localStorage.removeItem(key);
  }
  if (action === 'clear') {
    keys.forEach(k => localStorage.removeItem(k));
  }
};
