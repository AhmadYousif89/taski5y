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

export const modifyLocalStorage = <A extends Action>({
  action,
  value,
  key,
}: LocalStorageType<A>) => {
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
