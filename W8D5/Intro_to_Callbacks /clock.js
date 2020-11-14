//? Timing is Everything

class Clock {
    constructor() {
        // 1. Create a Date object.
        let date = new Date();
        // 2. Store the hours, minutes, and seconds.
        this.hour = date.getHours();
        this.min = date.getMinutes();
        this.sec = date.getSeconds();
        // 3. Call printTime.
        this.printTime();
        // 4. Schedule the tick at 1 second intervals.
        setInterval(this._tick.bind(this), 1000);
    }

    printTime() {
        // Format the time in HH:MM:SS
        // Use console.log to print it.
        console.log(`${this.hour}:${this.min}:${this.sec}`);
    }

    _tick() {
        // 1. Increment the time by one second.
        this.sec++;
        if (this.sec === 60) {
            this.sec = 0;
            this.min++;
        } if (this.min === 60) {
            this.min = 0;
            this.hour++;
        } if (this.hour === 24) {
            this.hour = 0;
        }
        // 2. Call printTime.
        this.printTime();
    }
}

const clock = new Clock();

