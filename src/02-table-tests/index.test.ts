// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

const testCases = [
  // Add
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  // subtract
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },

  // multiply
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 6, b: 6, action: Action.Multiply, expected: 36 },

  // divide
  { a: 81, b: 9, action: Action.Divide, expected: 9 },
  { a: 30, b: 3, action: Action.Divide, expected: 10 },
  { a: 53, b: 8, action: Action.Divide, expected: 6.625 },
  { a: 2, b: 0, action: Action.Divide, expected: Infinity },

  // exponentiate
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 4, b: 8, action: Action.Exponentiate, expected: 65536 },
  { a: 7, b: 3, action: Action.Exponentiate, expected: 343 },

  // null for incorrect action
  { a: 2, b: 2, action: null, expected: null },
  { a: 4, b: 8, action: () => {}, expected: null },
  { a: 7, b: 3, action: 'string', expected: null },
  { a: 7, b: 3, action: {}, expected: null },
  { a: 7, b: 3, action: NaN, expected: null },
  { a: 7, b: 3, action: Object, expected: null },

  // null for for invalid arguments
  { a: '2', b: 3, action: Action.Add, expected: null },
  { a: null, b: 3, action: Action.Add, expected: null },
  { a: null, b: undefined, action: Action.Exponentiate, expected: null },
  { a: 3, b: '2', action: Action.Multiply, expected: null },
  { a: 7, b: {}, action: Action.Subtract, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b should be $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
