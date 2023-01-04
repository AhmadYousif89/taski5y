export type LSKeys = 'persist' | 'server_error' | 'logged_in' | 'mode';
export type LSAction = 'set' | 'get' | 'remove' | 'clear';
// prettier-ignore
export type LocalStorageType<A extends LSAction> =
  (
    A extends 'set' ? {action: A; value: any; key: LSKeys } :
    A extends 'clear' ? {action: A; exclude?: LSKeys | LSKeys[] } : 
    {action: A; key: LSKeys }
  )

const keys: LSKeys[] = ['persist', 'logged_in', 'server_error', 'mode'];

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
    } else if (Array.isArray(options.exclude) && options.exclude.length > 0) {
      const keysToBeRemoved = keys.filter(k => !options.exclude?.includes(k));
      keysToBeRemoved.forEach(k => localStorage.removeItem(k));
    } else {
      keys.forEach(k => localStorage.removeItem(k));
    }
  }
};
