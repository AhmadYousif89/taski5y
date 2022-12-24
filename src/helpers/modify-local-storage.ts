type LocalStorageType = {
  type: 'set' | 'remove' | 'clear';
  key: 'persist' | 'has_access' | 'server_error';
  value?: string;
};

export const modifyLocalStorage = (action: LocalStorageType): void => {
  const { type, key, value } = action;

  switch (type) {
    case 'set': {
      if (value) localStorage.setItem(key, value);
      break;
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
