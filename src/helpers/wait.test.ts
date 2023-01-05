import { wait } from './wait';

describe('wait', () => {
  it('should resolve after 3 seconds if sec is not specified', async () => {
    const start = Date.now();
    await wait(() => 'I will wait for 3 seconds');
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(3000);
  });

  it('should resolve after the specified number of seconds if sec is specified', async () => {
    const start = Date.now();
    await wait(() => 'I will wait for 5 seconds', 5);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(5000);
  });

  it('should call the callback function when the Promise is resolved', async () => {
    expect.assertions(1);
    const cb = (data: string) => expect(data).toBeTruthy();
    await wait(() => cb('any data'));
  });
});
