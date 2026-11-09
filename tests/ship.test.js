import Ship from '../src/ship';

// 'describe' groups related tests together into a test suite for the Ship class.
describe('Ship Class', () => {
  let patrolBoat;
  let cruiser;

  // 'beforeEach' runs before every single test in this block.
  // We use it to ensure a fresh, unmutated instance of our objects for every test,
  // preventing state leakage from one test to another.
  beforeEach(() => {
    patrolBoat = new Ship(2); // Length 2
    cruiser = new Ship(3);    // Length 3
  });

  // Test 1: Verify the constructor assigns the correct length.
  test('initializes with the correct length', () => {
    expect(cruiser.length).toBe(3);
  });

  // Test 2: Verify the initial state of the hits property.
  test('starts with 0 hits', () => {
    expect(cruiser.hits).toBe(0);
  });

  // Test 3: Verify the hit() method correctly increments the hit counter.
  test('hit() increases the hit count by 1', () => {
    cruiser.hit();
    expect(cruiser.hits).toBe(1);
  });

  // Test 4: Verify hit() does not increment beyond the ship's length.
  test('hit() does not exceed ship length', () => {
    patrolBoat.hit();
    patrolBoat.hit();
    patrolBoat.hit(); // Attempting a 3rd hit on a length-2 ship
    expect(patrolBoat.hits).toBe(2);
  });

  // Test 5: Verify isSunk() logic for a damaged but afloat ship.
  test('isSunk() returns false if hits are less than length', () => {
    cruiser.hit();
    cruiser.hit();
    expect(cruiser.isSunk()).toBe(false);
  });

  // Test 6: Verify isSunk() logic for a completely destroyed ship.
  test('isSunk() returns true when hits equal length', () => {
    patrolBoat.hit();
    patrolBoat.hit();
    expect(patrolBoat.isSunk()).toBe(true);
  });
});