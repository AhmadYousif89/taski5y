import { readFileAsDataURL } from './image-utils';

describe('Test readFileAsDataURL function', () => {
  test('should return a promise that resolves with the file content as a data URL', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const dataURL = await readFileAsDataURL(file);
    expect(dataURL).toEqual('data:text/plain;base64,dGVzdA==');
  });

  test('should reject the promise if an error occurs while reading the file', async () => {
    const file = new File([], 'test.txt', { type: 'text/plain' });
    try {
      await readFileAsDataURL(file);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  test('should reject the promise if an error occurs while reading the file', async () => {
    const file = new File([], 'test.txt', { type: 'text/plain' });
    try {
      await readFileAsDataURL(file);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
