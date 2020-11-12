//Array my each

Array.prototype.myEach = function(cb) {
    for (let i = 0; i < this.length; i++) {
        const el = this[i];
        cb(el)
    }
}

function callback(el){
    console.log(el)
}

// arr = [1,2,3,4]

// arr.myEach(callback)

Array.prototype.myMap = function(cb) {
    let mapped = []

    this.myEach(el => {
        mapped.push(cb(el))
    })
    
    return mapped;
}

function callback(el) {
    return el**2
}

// arr = [1,2,3,4]

// console.log(arr.myMap(callback))


//arr.myReduce

Array.prototype.myReduce = function(callback, initialValue) {
    let arr = this;
    if (initialValue === undefined) {
        initialValue = this[0];
        arr = arr.splice(1, arr.length)
    }
    let acc = initialValue;
    arr.myEach(el => {
        acc = callback(acc, el)
    })

    return acc;
}

function cb(acc, el) {
    return acc + el;
}

arr = [1,2,3,4]

console.log(arr.educe(cb, 20))

// NORMAL REDUCE ---- console.log(arr.reduce((acc, el) => { return acc + el }, 20))




