// range

function range(start, end) {
    if (start === end) {
        return [start];
    }
    let arr = range(start, end - 1)
    arr.push(end);
    return arr;
}

// console.log(range(1, 8));

// sumRec

function sumRec(arr) {
    if (arr.length === 0) {
        return 0;
    }
    let last = arr[arr.length - 1]
    return last + sumRec(arr.splice(0, arr.length - 1))
}

// console.log(sumRec([1,2,3,4,100]))

function exponent(base, exp) {
    if (exp === 0) {
        return 1;
    } if (exp === 1) {
        return base;
    }

    return base * exponent(base, exp - 1);
}

// console.log(exponent(3,3));


function exponent2(base, exp) {
    if (exp === 0) {
        return 1;
    } if (exp === 1) {
        return base;
    }
    
    if (exp % 2 === 0) {
        return exponent2(base, exp/2)**2
    } else {
        return base * (exponent2(base, (exp-1)/2)**2)
    }

}

// console.log(exponent2(3, 10));

// 2(k)^3(n)  = 8
// 4!(n) = 6

//fibonacci


function fib(n){
    if (n < 1) {
        return [];
    } else if (n ===1 ) {
        return [1];
    } else if (n === 2) {
        return [1,1];
    }
    let arr = fib(n-1);
    let lastEl = arr[arr.length -1] + arr[arr.length - 2];
    arr.push(lastEl);
    return arr;
}

// deep dup

function deepDup(arr) {
    if (!(arr instanceof Array)) {
        return arr;
    }

    return arr.map(el => {
        return deepDup(el);
    })
}


// let arr = [
//     [1, [2]],
//     [3, 4],
//     [5, 6]
// ];

// duped = deepDup(arr);

// duped[0].push(3);
// console.log(arr);
// console.log(duped);


// bsearch

function bsearch(arr, target) {
    if (arr.length === 0) {
        return -1;
    }

    let mid = Math.floor(arr.length / 2); 

    if (target === arr[mid]) {
        return mid;
    } else if (target > arr[mid]) {
        let temp = bsearch(arr.slice(mid+1), target) + mid + 1
        return temp //if it's not nil, unsure of syntax
    } else {
        return bsearch(arr.splice(0, mid), target);
    }
}



console.log(bsearch([1,2,3,4,5,6,7,8,9,10], 8));