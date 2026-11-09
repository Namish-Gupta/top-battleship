import Gameboard from '../src/gameboard';
import Ship from '../src/ship';

describe('Gameboard Class', () => {
  let board;
  let submarine;
  let destroyer;

  beforeEach(() => {
    board = new Gameboard();
    submarine = new Ship(3);
    destroyer = new Ship(2);
  });

  test('places a ship horizontally on the grid', () => {
    board.placeShip(submarine, 0, 0, false);
    expect(board.grid[0][0]).toBe(submarine);
    expect(board.grid[0][1]).toBe(submarine);
    expect(board.grid[0][2]).toBe(submarine);
    expect(board.grid[0][3]).toBeNull(); 
  });

  test('places a ship vertically on the grid', () => {
    board.placeShip(destroyer, 2, 2, true);
    expect(board.grid[2][2]).toBe(destroyer);
    expect(board.grid[3][2]).toBe(destroyer);
    expect(board.grid[4][2]).toBeNull(); 
  });

  test('receiveAttack hits the correct ship and logs as hit', () => {
    board.placeShip(destroyer, 1, 1, false);
    board.receiveAttack(1, 1);
    
    expect(destroyer.hits).toBe(1);
    expect(board.attacks.get('1,1')).toBe('hit');
  });

  test('receiveAttack records missed shots in the Map', () => {
    board.placeShip(submarine, 0, 0, false);
    board.receiveAttack(5, 5); 
    
    // Directly check the Map state
    expect(board.attacks.get('5,5')).toBe('miss');
    // Check the helper method that parses the Map for the UI
    expect(board.getMissedAttacks()).toContainEqual([5, 5]);
  });

  test('receiveAttack throws an error if the coordinate was already attacked', () => {
    board.placeShip(submarine, 0, 0, false);
    
    board.receiveAttack(5, 5);
    expect(() => board.receiveAttack(5, 5)).toThrow('Coordinate already attacked');
    
    board.receiveAttack(0, 0);
    expect(() => board.receiveAttack(0, 0)).toThrow('Coordinate already attacked');
  });

  test('allShipsSunk reports true only when all placed ships are destroyed', () => {
    board.placeShip(destroyer, 0, 0, false); 
    
    expect(board.allShipsSunk()).toBe(false);
    
    board.receiveAttack(0, 0); 
    board.receiveAttack(0, 1); 
    
    expect(board.allShipsSunk()).toBe(true);
  });

  test('prevents placing ships out of bounds', () => {
    expect(() => board.placeShip(submarine, 0, 8, false)).toThrow('Out of bounds');
    expect(() => board.placeShip(destroyer, 9, 0, true)).toThrow('Out of bounds');
  });

  test('prevents overlapping ships', () => {
    board.placeShip(submarine, 0, 0, false);
    // Attempt to place a destroyer crossing the submarine
    expect(() => board.placeShip(destroyer, 0, 1, true)).toThrow('Overlap');
  });
});