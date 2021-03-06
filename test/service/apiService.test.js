

const ApiService = require('./../../lib/service/apiService');
const config = require('./../../lib/config');

jest.mock('request-promise');


describe('ApiService tests', () => {


  test('Test service config. Positive test', () => {
    const apiService = new ApiService(config.apacheFineract);
    expect(apiService.config).toEqual(config.apacheFineract);
  });


  test('Test service config. Negative test', () => {
    const apiService = new ApiService(config.apacheFineract);
    expect(apiService.config).not.toEqual(config);
  });


  test('Test service request headers. Positive test', () => {
    const apiService = new ApiService(config.apacheFineract);

    const expectedResult = {
      'Content-type': 'application/json',
      'Fineract-Platform-TenantId': 'default',
    };

    expect(apiService.requestHeaders).toEqual(expectedResult);
  });


  test('Test service request headers. Negative test', () => {
    const apiService = new ApiService(config.apacheFineract);

    const notExpectedResult = {
      'Content-type': 'application/pdf',
    };

    expect(apiService.requestHeaders).not.toEqual(notExpectedResult);
  });


  test('Test service getOptions method. Positive test', () => {
    const apiService = new ApiService(config.apacheFineract);

    const expectedResult = {
      url: 'test url',
      method: 'GET',
      headers: apiService.requestHeaders,
      auth: apiService.getBasicAuth(),
      body: {},
      qs: {},
      json: true,
    };

    expect(apiService.getOptions(expectedResult.url)).toEqual(expectedResult);
  });


  test('Test service getOptions method. Negative test', () => {
    const apiService = new ApiService(config.apacheFineract);

    const notExpectedResult = {
      url: 'test url',
      method: 'GET',
      headers: apiService.requestHeaders,
      body: {},
      qs: {},
      json: true,
    };

    expect(apiService.getOptions('wrong url')).not.toEqual(notExpectedResult);
  });


  test('Test service generateUrl method. Positive test', () => {
    const apiService = new ApiService(config.apacheFineract);
    const route = '/test/route';
    const expectedUrl = `${config.apacheFineract.host}${config.apacheFineract.apiPath}${route}`;

    expect(apiService.generateUrl(route)).toEqual(expectedUrl);
  });


  test('Test service generateUrl method. Negative test', () => {
    const apiService = new ApiService(config.apacheFineract);
    const route = '/test/route';
    const notExpectedUrl = `wrong host${config.apacheFineract.apiPath}${route}`;

    expect(apiService.generateUrl(route)).not.toEqual(notExpectedUrl);
  });


  test('Test service getBasicAuth method. Positive test', () => {
    const apiService = new ApiService(config.apacheFineract);
    const expectedResult = {
      username: apiService.config.username,
      password: apiService.config.password,
    };

    expect(apiService.getBasicAuth()).toEqual(expectedResult);
  });


  test('Test service getBasicAuth method. Negative test', () => {
    const apiService = new ApiService(config.apacheFineract);

    const notExpectedResult = {
      username: 'wrong username',
      password: apiService.config.password,
    };

    expect(apiService.getBasicAuth()).not.toEqual(notExpectedResult);
  });
});
