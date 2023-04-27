import axiosInstanceWithAbort from './abortAxios';

describe('[Network] - [AbortAxios]', () => {
  const mockInput = {username: 'dummy_user', password: 'password'};
  const mockResponse = {name: 'dummy_user'};
  const loginURL = '/login';
  const userURL = '/user/101';
  test('should return the promise and abort keys', async () => {
    global.axiosMock.onPost(loginURL).reply(200, mockResponse);

    const response = axiosInstanceWithAbort.post(loginURL, mockInput);
    expect(response.axiosPromise).toBeTruthy();
    expect(response.abort).toBeTruthy();

    const result = await response.axiosPromise;
    await expect(result.config.data).toEqual(JSON.stringify(mockInput));
    await expect(result.data).toEqual(mockResponse);
  });

  test('should return the promise and abort keys using GET method', async () => {
    global.axiosMock.onGet(loginURL).reply(200, mockResponse);

    const response = axiosInstanceWithAbort.get(loginURL);
    expect(response.axiosPromise).toBeTruthy();
    expect(response.abort).toBeTruthy();

    const result = await response.axiosPromise;
    await expect(result.data).toEqual(mockResponse);
  });

  test('should return the promise and abort keys using PUT method', async () => {
    global.axiosMock.onPut(userURL).reply(200, mockResponse);

    const response = axiosInstanceWithAbort.put(userURL, mockInput);
    expect(response.axiosPromise).toBeTruthy();
    expect(response.abort).toBeTruthy();

    const result = await response.axiosPromise;
    await expect(result.config.data).toEqual(JSON.stringify(mockInput));
    await expect(result.data).toEqual(mockResponse);
  });

  test('should return the promise and abort keys using DELETE method', async () => {
    global.axiosMock.onDelete(userURL).reply(200, mockResponse);

    const response = axiosInstanceWithAbort.delete(userURL);
    expect(response.axiosPromise).toBeTruthy();
    expect(response.abort).toBeTruthy();

    const result = await response.axiosPromise;
    await expect(result.data).toEqual(mockResponse);
  });

  test('should return the promise and abort keys using PATCH method', async () => {
    global.axiosMock.onPatch(userURL).reply(200, mockResponse);

    const response = axiosInstanceWithAbort.patch(userURL, mockInput);
    expect(response.axiosPromise).toBeTruthy();
    expect(response.abort).toBeTruthy();

    const result = await response.axiosPromise;
    await expect(result.config.data).toEqual(JSON.stringify(mockInput));
    await expect(result.data).toEqual(mockResponse);
  });
});
