class Player {
    constructor(type = 'real') {
        this.type = type;
        if(this.type === 'computer') {
            this.availableMoves = [];
            for(let i = 0; i < 10; i++) {
                for(let j = 0; j < 10; j++) {
                    this.availableMoves.push([i, j]);
                }
            }
        }
    }

    attack(enemyBoard, row, col) {
        if(this.type === 'computer') throw new Error('Computer players must use randomAttack()');

        enemyBoard.receiveAttack(row, col);
        return [row, col];
    }

    randomAttack(enemyBoard) {
        if(this.type !== 'computer') throw new Error('Real players cannot use randomAttack()');
        if(this.availableMoves.length === 0) throw new Error('No available moves left');

        const randomIndex = Math.floor(Math.random() * this.availableMoves.length);

        const [row, col] = this.availableMoves.splice(randomIndex, 1)[0];
        enemyBoard.receiveAttack(row, col);

        return [row, col];
    }
}

export default Player;