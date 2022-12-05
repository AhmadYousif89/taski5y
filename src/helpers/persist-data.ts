export const persistData = (keyName: string, data: any) => {
  localStorage.setItem(keyName, data);
};
