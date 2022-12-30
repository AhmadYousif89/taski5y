type LocalStorageType = {
  type: 'set' | 'get' | 'remove' | 'clear';
  key: 'persist' | 'server_error' | 'logged_in';
  value?: string;
};

export const modifyLocalStorage = ({ type, key, value }: LocalStorageType) => {
  if (type === 'get') {
    const keyItem = localStorage.getItem(key);
    return keyItem;
  }
  if (type === 'set' && value) {
    localStorage.setItem(key, value);
  }
  if (type === 'remove') {
    localStorage.removeItem(key);
  }
};
