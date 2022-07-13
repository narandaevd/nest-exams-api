export interface Interval {
    begin: string;
    end: string;
}

export abstract class BaseDateAnalyzer {
    protected static isCorrectType(date: unknown): boolean { return false; };

    abstract more(d1: Date, d2: Date): boolean;
    abstract more(d1: string, d2: string): boolean;
    abstract more(d1: string, d2: Date): boolean;
    abstract more(d1: Date, d2: string): boolean;

    abstract less(d1: Date, d2: Date): boolean;
    abstract less(d1: string, d2: string): boolean;
    abstract less(d1: string, d2: Date): boolean;
    abstract less(d1: Date, d2: string): boolean;

    abstract equal(d1: Date, d2: Date): boolean;
    abstract equal(d1: string, d2: string): boolean;
    abstract equal(d1: string, d2: Date): boolean;
    abstract equal(d1: Date, d2: string): boolean;

    abstract between(d1: string, options: Interval): boolean;
    abstract isIntercepting(o1: Interval, o2: Interval): boolean;
}

export class NativeDateAnalyzer extends BaseDateAnalyzer {
    isIntercepting(o1: Interval, o2: Interval): boolean {
        return this.between(o1.begin, o2) || this.between(o1.end, o2) ||
            (this.less(o1.begin, o2.begin) && this.more(o1.end, o2.end)) ||
            (this.more(o1.begin, o2.begin) && this.less(o1.end, o2.end));
    }
    override between(d1: string, opt: Interval): boolean {
        return (this.more(d1, opt.begin) && this.less(d1, opt.end)) || this.equal(d1, opt.begin) || this.equal(d1, opt.end);
    }
    protected static override isCorrectType(date: unknown): boolean {
        if (
            typeof date !== 'string' && !(date instanceof Date) &&
            typeof date !== 'string' && !(date instanceof Date)
        )
            return false;
        return true;
    }
    override more(d1: Date, d2: Date): boolean;
    override more(d1: string, d2: string): boolean;
    override more(d1: string, d2: Date): boolean;
    override more(d1: Date, d2: string): boolean;
    override more(d1: Date | string, d2: Date | string): boolean {
        if (!NativeDateAnalyzer.isCorrectType(d1) || !NativeDateAnalyzer.isCorrectType(d2))
            throw new Error("Method not implemented."); 
        if (typeof d1 === 'string')
            d1 = new Date(d1);
        if (typeof d2 === 'string')
            d2 = new Date(d2);
        return d1.getTime() > d2.getTime();
    }
    override less(d1: Date, d2: Date): boolean;
    override less(d1: string, d2: string): boolean;
    override less(d1: string, d2: Date): boolean;
    override less(d1: Date, d2: string): boolean;
    override less(d1: Date | string, d2: Date | string): boolean {
        if (!NativeDateAnalyzer.isCorrectType(d1) || !NativeDateAnalyzer.isCorrectType(d2))
            throw new Error("Method not implemented."); 
        if (typeof d1 === 'string')
            d1 = new Date(d1);
        if (typeof d2 === 'string')
            d2 = new Date(d2);
        return d1.getTime() < d2.getTime();
    }
    override equal(d1: Date, d2: Date): boolean;
    override equal(d1: string, d2: string): boolean;
    override equal(d1: string, d2: Date): boolean;
    override equal(d1: Date, d2: string): boolean;
    override equal(d1: Date | string, d2: Date | string): boolean {
        if (!NativeDateAnalyzer.isCorrectType(d1) || !NativeDateAnalyzer.isCorrectType(d2))
            throw new Error("Method not implemented."); 
        if (typeof d1 === 'string')
            d1 = new Date(d1);
        if (typeof d2 === 'string')
            d2 = new Date(d2);
        return d1.getTime() - d2.getTime() == 0;
    }
}