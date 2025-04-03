import type { FormItemRule } from 'element-plus';

export function createElFormItemRule(message: string, options: FormItemRule = {}): FormItemRule {
    const {
        required = true,
        trigger = 'blur',
        type = 'string',
    } = options;
    return {
        ...options,
        message,
        required,
        trigger,
        type,
    };
}
