class sineSignal {
    constructor(period=2*Math.PI, amp=1, offset=0) {
        this.period = period;
        this.amp = amp;
        this.offset = offset;
        this.t = 0;

        let wait =
            ms => new Promise(
                r => setTimeout(r, ms)
            );

        let repeat =
            (ms, func) => new Promise(
                r => (
                    setInterval(func, ms),
                        wait(ms).then(r)
                )
            );

        repeat(500, () => this.t++);
    }

    get value() {
        return this.offset + (this.amp * Math.sin(2 * Math.PI * this.t / this.period));
    }
}

let t = 0;

// temperature signal
export let temperature = new sineSignal(100, 20);

export let temperatureBurst = [];
for(let i=0; i<100; i++){
    temperatureBurst.push((Math.random() * 40) - 20);
}

export let temperatureBurstWithErrors = [];
for(let i=0; i<100; i++){
    if(Math.random() > 0.1){
        temperatureBurstWithErrors.push((Math.random() * 40) - 20)
    }
    else{
        temperatureBurstWithErrors.push("error");
    }
}