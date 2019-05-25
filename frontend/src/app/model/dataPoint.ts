export class DataPoint {

    public time: Date;
    public value: number;

    constructor(time: Date, value: number) {
        this.time = time;
        this.value = value;
    }

}