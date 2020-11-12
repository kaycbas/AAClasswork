//Array.bubble_sort

Array.prototype.bubblesort = function(){
    let done = false;
    while (!done) {
        done = true;
    
        for (let i = 0; i < this.length-1; i++) {
            if (this[i] > this[i+1]) {
                let temp = this[i+1];
                this[i+1] = this[i];
                this[i] = temp;
                done = false;
            }
        }
    }
    return this;
}

// console.log([4,5,32,1,5].bubblesort());


//String.substrings

String.prototype.substrings = function (){
    let substrings = [];

    for (let i = 0; i < this.length; i++) {
        for (let j = i+1; j < this.length; j++) {
            substrings.push(this.substring(i, j))
        }
    }
    return substrings;
}


console.log("helloyou".substrings());