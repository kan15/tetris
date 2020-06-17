export default class Game {
    score = 0;
    lines = 0;
    level = 0;
    playfield = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    activePiece = {
        x: 0, //we rewrite these positions with methods movePieceLeft, movePieceRight, movePieceDown
        y: 0, //we rewrite these positions with methods movePieceLeft, movePieceRight, movePieceDown
        get blocks() {
            return this.rotation[this.rotationIndex];
        },
        rotationIndex: 0,
        rotation: [
            [
                [0,1,0],
                [1,1,1],
                [0,0,0]
            ],
            [
                [0,1,0],
                [0,1,1],
                [0,1,0]
            ],
            [
                [0,0,0],
                [1,1,1],
                [0,1,0]
            ],
            [
                [0,1,0],
                [1,1,0],
                [0,1,0]
            ]
        ]
    };

    movePieceLeft() {
        this.activePiece.x -= 1; 
        if (this.hasCollision()) {//we use this option just where it is true
            this.activePiece.x += 1;//we are checking if our coordinate isn't within playfield after motions we add 1 point
        }
    }
    movePieceRight() {
        this.activePiece.x += 1;
        if (this.hasCollision()) {
            this.activePiece.x -= 1;
        }
    }
    movePieceDown() {
        this.activePiece.y += 1;
        if (this.hasCollision()) {
            this.activePiece.y -= 1;
            this.lockPiece();//we use this method only here because we will lock our element just when it will stopped the bottom or another figure on the bottom
        }
    }
    rotatePiece() {
        this.activePiece.rotationIndex = this.activePiece.rotationIndex < 3 ? this.activePiece.rotationIndex + 1 : 0;
        // this.activePiece.rotationIndex = (this.activePiece.rotationIndex+1) % 4;
        if (this.hasCollision()) { //we are ckecking if our figure near by the sides or other figures
            this.activePiece.rotation = this.activePiece.rotation > 0 ? this.activePiece.rotation - 1 : 3; //if so we take the previous figure
        }
        return this.activePiece.blocks;

        // if(this.activePiece.rotationIndex === 3) {
        //     this.activePiece.rotationIndex = 0;
        // } else {
        //     this.activePiece.rotationIndex++;
        // }
    }
    hasCollision() {
        const {y: pieceY, x: pieceX} = this.activePiece; //our position after all motions
        for (let y = 0; y < this.activePiece.blocks.length; y++) {
            for (let x = 0; x < this.activePiece.blocks[y].length; x++) {
                // console.log(`pieceY + y = ${pieceY + y}`);
                // console.log(`pieceY = ${pieceY}`);
                // console.log(`blocks[y][x] = ${blocks[y][x]}`);
                if(//we are checking should we add 1 or take 1 point back from x or y coordinate 
                    this.activePiece.blocks[y][x] === 1 && //This line means that as long as there are zeros here, we can still change our position by one and go beyond our field. But as soon as there is one and we are out of our field, we roll back our position by one.
                    ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) || //we are checking if our coordinate within playfield after motions
                    this.playfield[pieceY + y][pieceX + x])//If this cell is already filled.
                ) {
                    return true;
                }
                
            }
        }

        return false;
    }

    lockPiece() {
        const {y: pieceY, x: pieceX, blocks} = this.activePiece; //our position after all motions
        for (let y = 0; y < blocks.length; y++) { //we go through our arrays in blocks
            for (let x = 0; x < blocks[y].length; x++) {
                if(blocks[y][x]){ //we will use the next line just if here will be 1. When there is 0 we won`t change anything
                    this.playfield[pieceY + y][pieceX + x] = blocks[y][x];//assign the data from 'blocks' in 'playfield' considering position x and y from 'activepiece'. (pieceY, pieceX) - starting point and we need to use all elements inside 'blocks', that's why we add +y or +x
                }
            }
        }
    }
}