Function.prototype.myThrottle = function(interval) {
    let tooSoon = false;
    return () => {
        if (tooSoon === false) {
            tooSoon = true;
            setTimeout(function() {
                tooSoon = false;
            }, interval);
            this();
        }
    }
}

class Neuron {
    fire() {
        console.log("Firing!");
    }
}

const neuron = new Neuron();

neuron.fire = neuron.fire.myThrottle(2000);

const interval = setInterval(() => {
    neuron.fire();
}, 10);
