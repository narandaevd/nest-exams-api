export abstract class BaseValidator {
    protected _nextValidator: BaseValidator = null;
    abstract check(opt: any): Promise<void>;
    add(val: BaseValidator): void {
        if (this._nextValidator === null)
            this._nextValidator = val;
        else 
            this._nextValidator.add(val);
    }
    addValidators(validators: BaseValidator[]): void {
        validators.forEach((val) => {
            if (this._nextValidator === null)
                this._nextValidator = val;
            else
                this._nextValidator.add(val);
        });
    }
}