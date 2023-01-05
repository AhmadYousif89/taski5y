import { keys, modifyLocalStorage } from './modify-local-storage';

const key1 = keys[0];
const value1 = 'testValue1';
const key2 = keys[1];
const value2 = 'testValue2';
const key3 = keys[2];
const value3 = 'testValue3';
const key4 = keys[3];
const value4 = 'testValue4';

test('it should set item in local storage', () => {
  modifyLocalStorage({ action: 'set', key: key1, value: value1 });
  const result = localStorage.getItem(key1);
  expect(result).toBe(value1);
});

test('it should get item from local storage', () => {
  localStorage.setItem(key1, value1);
  const result = modifyLocalStorage({ action: 'get', key: key1 });
  expect(result).toBe(value1);
});

test('it should remove item from local storage', () => {
  modifyLocalStorage({ action: 'remove', key: key1 });
  const result = localStorage.getItem(key1);
  expect(result).toBeNull();
});

test('it should set multiple items in the local storage', () => {
  modifyLocalStorage({ action: 'set', key: key1, value: value1 });
  modifyLocalStorage({ action: 'set', key: key2, value: value2 });
  modifyLocalStorage({ action: 'set', key: key3, value: value3 });
  modifyLocalStorage({ action: 'set', key: key4, value: value4 });
  const result1 = localStorage.getItem(key1);
  const result2 = localStorage.getItem(key2);
  const result3 = localStorage.getItem(key3);
  const result4 = localStorage.getItem(key4);
  expect(result1).toBe(value1);
  expect(result2).toBe(value2);
  expect(result3).toBe(value3);
  expect(result4).toBe(value4);
});

test('it should accept an array of excluded keys and clear all items in the local storage except for the excluded keys', () => {
  modifyLocalStorage({ action: 'clear', exclude: [key1, key2] });
  const result1 = localStorage.getItem(key1);
  const result2 = localStorage.getItem(key2);
  expect(result1).toBe(value1);
  expect(result2).toBe(value2);
  const result3 = localStorage.getItem(key3);
  const result4 = localStorage.getItem(key4);
  expect(result3).toBeNull();
  expect(result4).toBeNull();
});

test('it should accept a key to be excluded and clear all items in the local storage except for the excluded key', () => {
  modifyLocalStorage({ action: 'clear', exclude: key1 });
  const result1 = localStorage.getItem(key1);
  const result2 = localStorage.getItem(key2);
  expect(result1).toBe(value1);
  expect(result2).toBeNull();
});

test('it should clear all items from local storage', () => {
  modifyLocalStorage({ action: 'clear' });
  const result1 = localStorage.getItem(key1);
  const result2 = localStorage.getItem(key2);
  const result3 = localStorage.getItem(key3);
  const result4 = localStorage.getItem(key4);
  expect(result1).toBeNull();
  expect(result2).toBeNull();
  expect(result3).toBeNull();
  expect(result4).toBeNull();
});

test('it should set multiple items in the local storage', () => {
  modifyLocalStorage({ action: 'set', key: key1, value: value1 });
  modifyLocalStorage({ action: 'set', key: key2, value: value2 });
  const result1 = localStorage.getItem(key1);
  const result2 = localStorage.getItem(key2);
  expect(result1).toBe(value1);
  expect(result2).toBe(value2);
});

test('it should clear all items in the local storage if exclude was empty array', () => {
  modifyLocalStorage({ action: 'clear', exclude: [] });
  const result1 = localStorage.getItem(key1);
  const result2 = localStorage.getItem(key2);
  expect(result1).toBeNull();
  expect(result2).toBeNull();
});

test('it should set multiple items in the local storage', () => {
  modifyLocalStorage({ action: 'set', key: key1, value: value1 });
  modifyLocalStorage({ action: 'set', key: key2, value: value2 });
  const result1 = localStorage.getItem(key1);
  const result2 = localStorage.getItem(key2);
  expect(result1).toBe(value1);
  expect(result2).toBe(value2);
});

test('it should clear all items in the local storage if exclude was undefined', () => {
  modifyLocalStorage({ action: 'clear', exclude: undefined });
  const result1 = localStorage.getItem(key1);
  const result2 = localStorage.getItem(key2);
  expect(result1).toBeNull();
  expect(result2).toBeNull();
});
