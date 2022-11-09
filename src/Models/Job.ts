class Job {
    private readonly jobName: string;
    private readonly jobPay: number;

    constructor(name: string, pay: number) {
        this.jobName = name;
        this.jobPay = pay;
    }

    public get name() {
        return this.jobName;
    }

    public get pay() {
        return this.jobPay;
    }

    public get payString() {
        return this.pay.toString();
    }
}

export default Job
