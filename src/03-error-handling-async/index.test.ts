import {
  MyAwesomeError,
  rejectCustomError,
  resolveValue,
  throwCustomError,
  throwError,
} from './index';

describe('resolveValue', () => {
  const testCases = [
    { value: 2, expected: 2 },
    { value: -5, expected: -5 },
    { value: 'Test string', expected: 'Test string' },
    { value: true, expected: true },
    { value: false, expected: false },
    { value: null, expected: null },
    { value: undefined, expected: undefined },
  ];
  test.each(testCases)(
    'should resolve provided value $value',
    async ({ value, expected }) => {
      await expect(resolveValue(value)).resolves.toBe(expected);
    },
  );
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'Something went wrong';

    expect(() => throwError(msg)).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
