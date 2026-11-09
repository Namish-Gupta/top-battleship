import Player from '../src/player';
import Gameboard from '../src/gameboard';

describe('Player Class', () => {
  let realPlayer;
  let computerPlayer;
  let enemyBoard;

  beforeEach(() => {
    realPlayer = new Player('real');
    computerPlayer = new Player('computer');
    enemyBoard = new Gameboard();
  });

  test('creates a real player by default or when specified', () => {
    const defaultPlayer = new Player();
    expect(defaultPlayer.type).toBe('real');
    expect(realPlayer.type).toBe('real');
  });

  test('creates a computer player when specified', () => {
    expect(computerPlayer.type).toBe('computer');
  });

  test('real player can attack a specific coordinate and returns it', () => {
    const result = realPlayer.attack(enemyBoard, 2, 3);
    
    // The enemy board should register the attack
    expect(enemyBoard.attacks.has('2,3')).toBe(true);
    // The method should return the coordinates for consistency with randomAttack
    expect(result).toEqual([2, 3]);
  });

  test('computer randomAttack hits a valid coordinate on enemy board', () => {
    const [row, col] = computerPlayer.randomAttack(enemyBoard);
    
    // Ensure the returned coordinates are within the 10x10 grid boundaries
    expect(row).toBeGreaterThanOrEqual(0);
    expect(row).toBeLessThan(10);
    expect(col).toBeGreaterThanOrEqual(0);
    expect(col).toBeLessThan(10);
    
    // The enemy board should have recorded this random attack
    expect(enemyBoard.attacks.has(`${row},${col}`)).toBe(true);
  });

  test('computer does not attack the same coordinate twice', () => {
    // A 10x10 board has 100 possible moves.
    // We force the computer to take all 100 moves.
    for (let i = 0; i < 100; i++) {
      computerPlayer.randomAttack(enemyBoard);
    }
    
    // The enemy board should now have exactly 100 recorded attacks
    expect(enemyBoard.attacks.size).toBe(100);
    
    // Attempting a 101st move should throw an error since no moves are left
    expect(() => computerPlayer.randomAttack(enemyBoard)).toThrow('No available moves left');
  });
});