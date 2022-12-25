type LocalStorageType = {
  type: 'set' | 'get' | 'remove' | 'clear';
  key: 'persist' | 'has_access' | 'server_error';
  value?: string;
};

export const modifyLocalStorage = (action: LocalStorageType) => {
  const { type, key, value } = action;

  switch (type) {
    case 'set': {
      if (value) localStorage.setItem(key, value);
      break;
    }
    case 'get': {
      return localStorage.getItem(key);
    }
    case 'remove': {
      localStorage.removeItem(key);
      break;
    }
    case 'clear': {
      localStorage.clear();
      break;
    }

    default:
      throw new Error('');
  }
};
