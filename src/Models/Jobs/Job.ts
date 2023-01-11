import JobRequirements from "./JobRequirements";

class Job {
    private readonly jobName: string;
    private readonly jobPay: number;
    private readonly requirements: JobRequirements;

    constructor(name: string, pay: number, requirements: JobRequirements) {
        this.jobName = name;
        this.jobPay = pay;
        this.requirements = requirements;
    }

    public get name() {
        return this.jobName;
    }

    public get pay() {
        return this.jobPay;
    }

    public get element() {
        return this.requirements.requirement;
    }

    public get payString() {
        return `$${this.jobPay.toString()}/hour`
    }
}

export default Job
