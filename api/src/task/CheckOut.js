class CheckOut {
  constructor(rules) {
    this.rules = rules;
    this.basket = {};
  }

  // total method: take basket, find price, sum of basket[key] * rule[key].price
  total() {
    return Object.keys(this.basket).reduce((acc, cur) => {
      return acc + this.rules[cur].price * this.basket[cur];
    }, 0);
  }

  // scan method: add to basket, run price method
  scan(item) {
    let rule = this.rules[item];
    if (rule) {
      this.basket = {
        ...this.basket,
        [item]: this.basket[item] ? this.basket[item] + 1 : 1,
      };
      this.total();
    }
  }
}

module.exports = CheckOut;
