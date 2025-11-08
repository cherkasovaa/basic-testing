import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 1000;
  let bankAccount: BankAccount;
  let receiver: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
    receiver = getBankAccount(initialBalance);
  });
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(2000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(2000, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(500, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    bankAccount.deposit(500);

    expect(bankAccount.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(500);

    expect(bankAccount.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    bankAccount.transfer(500, receiver);

    expect(bankAccount.getBalance()).toBe(500);
    expect(receiver.getBalance()).toBe(1500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(1234);

    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(1234);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(777);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(777);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
