class MerkleTree {

    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
        this.hashes = [];
        this.hashes[0] = [...leaves];
        this.layer = 1;
    }

    getRoot() {
        let leavesLength = this.leaves.length;

        if (leavesLength > 0) {
            this.layer = Math.ceil(Math.pow(leavesLength, 1 / 2)) + 1;
            if (this.leaves.length % 2 != 0) {
                this.layer = this.layer + 1;
            }
            let localHashes = [];
            let j = 0;

            for (let i = 1; i < this.layer; i++) {
                j = 0;
                localHashes = [];
                while (j < this.hashes[i - 1].length) {
                    if (this.hashes[i - 1][j + 1]) {
                        localHashes.push(this.concat(this.hashes[i - 1][j], this.hashes[i - 1][j + 1]));
                    } else {
                        localHashes.push(this.hashes[i - 1][j]);
                    }

                    j = j + 2;
                }
                this.hashes[i] = [...localHashes];
            }
            if (this.hashes[this.layer - 1]) {
                return this.hashes[this.layer - 1][0];
            }

            return null;
        }

        return null;
    }

    getProof(find) {
        let proofArray = [];
        let temp = null;
        let index = find;
        let isIndexEven = false;
        let indexUsed = 0;
        this.getRoot();
        for(let i = 0 ; i < this.layer - 1; i++) {
            isIndexEven = (index % 2 === 0);

            indexUsed = isIndexEven ? index + 1 : index - 1;
            if (this.hashes[i][indexUsed]) {
                temp = {data: this.hashes[i][indexUsed], left: !isIndexEven};
                proofArray.push(temp);
            }
            index = Math.floor(index / 2);
        }
        return proofArray;
    }
}

module.exports = MerkleTree;