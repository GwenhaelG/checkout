const CheckOut = require('./CheckOut');

const RULES = {
  A: {
    price: 50,
    special: {
      quantity: 3,
      price: 130,
    },
  },
  B: {
    price: 30,
  },
  C: {
    price: 20,
  },
  D: {
    price: 15,
  },
};

describe('Checkout sevice should return', () => {
  const price = (goods) => {
    const co = new CheckOut(RULES);
    goods.split('').forEach((item) => co.scan(item));
    return co.total();
  };

  test('0 when no products selected', () => {
    expect(price('')).toBe(0);
  });

  test('50 when A item is selected', () => {
    expect(price('A')).toBe(50);
  });

  test('80 when AB items are selected', () => {
    expect(price('AB')).toBe(80);
  });
});
