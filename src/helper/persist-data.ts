export const persistData = (data: unknown, storageName: string) => {
  localStorage.setItem(`${storageName}`, JSON.stringify(data));
};
