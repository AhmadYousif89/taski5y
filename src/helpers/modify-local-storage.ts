export type LSAction = 'set' | 'get' | 'remove' | 'clear';
export type LSKeys = 'persist' | 'server_error' | 'logged_in' | 'mode';
// prettier-ignore
export type LocalStorageType<A extends LSAction> = 
 (
   A extends 'set' ? { action: A; value: any; key: LSKeys } :
   A extends 'clear' ? { action: A; exclude?: LSKeys| LSKeys[] } :
   { action: A; key: LSKeys }
 )

export const keys: LSKeys[] = ['persist', 'logged_in', 'server_error', 'mode'];

/**
 * Perform various action types on the local storage based on the provided options.
 * @param {LocalStorageType<A>} options - An object containing options for modifying the application keys in the local storage.
 * @param {LSAction} options.action - The action to be performed on the local storage.
 * @param {LSKeys} options.key - The key of the item to be modified in the local storage.
 * @param {any} options.value - The value to be set for the item in the local storage.
 * @param {LSKeys | LSKeys[]} options.exclude - A string or an array of strings representing the keys of items to be excluded when clearing the local storage.
 * @return {any} The value of the item in the local storage with the specified key, if the action is 'get'.
 * @example
 * const key = modifyLocalStorage({ action: 'get', key: 'mode'})
 * console.log(key) // 'dark-mode'
 */
export const modifyLocalStorage = <A extends LSAction>(options: LocalStorageType<A>): any => {
  const { action } = options;

  if (action === 'get' && options.key) {
    try {
      return localStorage.getItem(options.key);
    } catch (err) {
      console.log(err);
    }
  }
  if (action === 'set' && options.key) {
    try {
      localStorage.setItem(options.key, options.value);
    } catch (err) {
      console.log(err);
    }
  }
  if (action === 'remove' && options.key) {
    localStorage.removeItem(options.key);
  }
  if (action === 'clear') {
    if (typeof options.exclude === 'string') {
      const keysToBeRemoved = keys.filter(k => k !== options.exclude);
      keysToBeRemoved.forEach(k => localStorage.removeItem(k));
      return;
    }
    if (Array.isArray(options.exclude) && options.exclude.length > 0) {
      const keysToBeRemoved = keys.filter(k => !options.exclude?.includes(k));
      keysToBeRemoved.forEach(k => localStorage.removeItem(k));
      return;
    }
    keys.forEach(k => localStorage.removeItem(k));
  }
};
