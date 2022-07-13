export abstract class BaseValidator {
    protected _nextValidator: BaseValidator = null;
    abstract check(opt: any): Promise<void>;
    add(val: BaseValidator | BaseValidator[]): void {
        if (val instanceof BaseValidator) {
            if (this._nextValidator === null)
                this._nextValidator = val;
            else 
                this._nextValidator.add(val);
        } else {
            val.forEach((curVal: BaseValidator) => {
                if (this._nextValidator === null)
                    this._nextValidator = curVal;
                else
                    this._nextValidator.add(curVal);
            });
        }
    }
}