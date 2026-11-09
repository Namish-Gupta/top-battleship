class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }
    hit() {
        if(this.hits < this.length) this.hits++;
    }
    isSunk() {
        return this.length <= this.hits;
    }
}

export default Ship;