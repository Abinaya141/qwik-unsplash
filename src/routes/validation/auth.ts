// routes/validation/index.ts
import * as v from 'valibot';

export const SearchFormSchema = v.object({
    search: v.pipe(
        v.string(),
        v.minLength(3, 'Please! Enter at least 3 characters'),
        v.maxLength(250, 'Your prompt should not exceed 250 characters')
    ),
});

