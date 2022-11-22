// 1. Реалізувати клас Phone (таска з заняття).
// Властивості: марка, модель, колір, ціна, рік випуску.
// Метод: розрахунок віку телефона.

// Створити екземпляр класу, викликати для нього метод.

// Реалізувати сеттер для року виробництва з валідацією та відповідний геттер. *Для перевірки, чи належить рік виробництва певному діапазону, можна використати клас нижче.

class Phone {
  constructor(brand, model, color, price, yearOfProduction) {
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.price = price;
    this.yearOfProduction = yearOfProduction;
  }
  getAge() {
    return new Date().getFullYear() - this.yearOfProduction;
  }
  set yearOfProduction(value) {
    if (typeof value !== 'number') {
      throw new TypeError('Year must be a number.');
    }
    if (
      value > new Date().getFullYear() ||
      value < 1876 ||
      !Number.isSafeInteger(value)
    ) {
      throw new RangeError(
        'Year of production may not be more than the current year or less than the year of the first phone, and the year of production should be an integer number'
      );
    }
    this._yearOfProduction = value;
  }
  get yearOfProduction() {
    return this._yearOfProduction;
  }
}

const testPhone = new Phone('IPhone', '13', 'black', 800, 2021);
console.dir(testPhone);

// 2. *Реалізувати клас RangeValidator.
// Клас призначений для валідації потрапляння числового значення в діапазон.
// Границі діапазона є властивостями:
// ■ from (типу number);
// ■ to (типу number);
// (from <= to)
// Реалізувати getter'и та setter'и для обох властивостей.
// Реалізувати getter range, який повертатиме масив із двома числами діапазону (тобто геттер повертає не властивість, а масив із двома елементами, які є властивостями)
// Реалізувати метод isValid, який прийматиме число і перевірятиме, чи входить число у вказаний діапазон (повертає boolean).

class RangeValidator {
  constructor(from, to) {
    this._from = from;
    this._to = to;
  }
  set from(value) {
    if (typeof value !== 'number') {
      throw new TypeError('This value must be a number.');
    } else if (value >= this.to) {
      throw new RangeError(`This value must be less than ${this.to}.`);
    }
    this._from = value;
  }
  get from() {
    return this._from;
  }
  set to(value) {
    if (typeof value !== 'number') {
      throw new TypeError('This value must be a number.');
    } else if (value <= this.from) {
      throw new RangeError(`This value must be less than ${this.from}.`);
    }
    this._to = value;
  }
  get to() {
    return this._to;
  }
  get range() {
    return [this.from, this.to];
  }
}

try {
  // work of constructor and setters
  const range1 = new RangeValidator(1, 5.5); // works
  const range2 = new RangeValidator(10, 5.5); // error (to <= from)

  // work of setters
  range1.from = 5; // works
  range1.from = 200; // error (from >= to)

  range1.to = 80; // works
  range1.to = -55; // error (to <= from)

  // work of getters
  console.log(range1.from); // => 5
  console.log(range1.to); // => 80

  // work of getter range
  console.log(range1.range); // => [5, 80]
} catch (error) {
  if (error instanceof TypeError) {
    console.error('error : ', error);
  } else if (error instanceof RangeError) {
    console.error('error : ', error);
  } else {
    console.error('error', error);
  }
}

// Робота validate
// console.log(range1.isValid(10)) // => true (оскільки належить діапазону [5, 80])
// console.log(range1.isValid(100)) // => false (оскільки не належить діапазону [5, 80])
