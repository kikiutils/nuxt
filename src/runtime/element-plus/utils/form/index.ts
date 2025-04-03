import type { FormItemRule } from 'element-plus';

export function createElFormItemRule(message: string = '', options: FormItemRule = {}): FormItemRule {
    const {
        asyncValidator,
        required = true,
        trigger = 'blur',
        type = 'string',
        validator,
    } = options;
    if (asyncValidator) {
        return {
            asyncValidator,
            trigger,
        };
    }

    if (validator) {
        return {
            trigger,
            validator,
        };
    }

    return {
        ...options,
        message,
        required,
        trigger,
        type,
    };
}
