//Array my uniq

Array.prototype.myUniq = function() {
    let uniqArray = [];
    this.forEach((el) => {
        if (!uniqArray.includes(el)) {
            uniqArray.push(el);
        }
    })
    // for (let i = 0; i < this.length; i++) {
    //     if (!uniqArray.includes(this[i])) {
    //         uniqArray.push(this[i])
    //     }
    // }
    return uniqArray;
}

// arr = [1,1,1,2,2,3,3];

// console.log(arr.myUniq());

// Array two sum

Array.prototype.twoSum = function () {
    let twoSums = [];
    for (let i = 0; i < this.length-1; i++) {
        for (let j = i+1; j < this.length; j++) {
            if (this[j] + this[i] === 0) {
                twoSums.push([i, j]);
            }
        }
    }
    return twoSums;
}

// arr = [1,3,5,-3,5,-7,-5,0,10,-10];

// console.log(arr.twoSum());

// Array transpose

Array.prototype.transpose = function () {
    let transposed = new Array(this[0].length);
    for (let i = 0; i < transposed.length; i++) {
        transposed[i] = new Array(this.length);
    }

    for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < this[i].length; j++) {
            transposed[j][i] = this[i][j];
        }
    }
    return transposed;
}

let items = [
    [1, 2],
    [3, 4],
    [5, 6]
];

console.log(items.transpose());


