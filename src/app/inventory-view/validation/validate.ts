import { z } from 'zod';
import { addItemSchema } from './validationSchema';

export const validate = (values: any) => {
    try {
        addItemSchema.parse(values);
        return {};
    } catch (error: any) {
        return error.formErrors.fieldErrors;
    }
};
