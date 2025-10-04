import { getUser } from '@/lib/db/queries';
import { toUserProfileDTO } from '@/lib/mappers/user-profiles';
export function validatedAction(schema, action) {
    return async (prevState, formData) => {
        const formDataObj = Object.fromEntries(formData);
        console.log('🔐 Validation: Form data received:', {
            formDataObj,
            timestamp: new Date().toISOString(),
        });
        // Log each field individually for debugging
        console.log('🔐 Validation: Individual field analysis:', {
            email: {
                value: formDataObj['email'],
                type: typeof formDataObj['email'],
                isEmpty: !formDataObj['email'],
            },
            password: {
                value: formDataObj['password'] ? '***' : 'EMPTY',
                type: typeof formDataObj['password'],
                isEmpty: !formDataObj['password'],
            },
            organizationId: {
                value: formDataObj['organizationId'],
                type: typeof formDataObj['organizationId'],
                isEmpty: !formDataObj['organizationId'],
            },
            priceId: {
                value: formDataObj['priceId'],
                type: typeof formDataObj['priceId'],
                isEmpty: !formDataObj['priceId'],
            },
        });
        const result = schema.safeParse(formDataObj);
        if (!result.success) {
            console.error('🔐 Validation: Schema validation failed:', {
                errors: result.error.errors,
                formDataObj,
                timestamp: new Date().toISOString(),
            });
            // Log each validation error in detail
            result.error.errors.forEach((error, index) => {
                console.error(`🔐 Validation Error ${index + 1}:`, {
                    path: error.path,
                    message: error.message,
                    code: error.code,
                    received: error.input,
                });
            });
            return { error: result.error.errors[0]?.message || 'Validation failed' };
        }
        console.log('🔐 Validation: Schema validation passed:', {
            validatedData: result.data,
            timestamp: new Date().toISOString(),
        });
        return action(result.data, formData);
    };
}
export function validatedActionWithUser(schema, action) {
    return async (prevState, formData) => {
        const user = await getUser();
        if (!user) {
            throw new Error('User is not authenticated');
        }
        const result = schema.safeParse(Object.fromEntries(formData));
        if (!result.success) {
            return { error: result.error.errors[0]?.message || 'Validation failed' };
        }
        return action(result.data, formData, toUserProfileDTO(user));
    };
}
export function withTeam(action) {
    return async (formData) => {
        const user = await getUser();
        if (!user) {
            throw new Error('User is not authenticated');
        }
        // Get user's organization - you'll need to implement this based on your schema
        // For now, we'll create a placeholder organization object
        const organization = {
            id: user.id, // Placeholder - should be actual organization ID
            name: user.organizationName || 'Personal Organization',
            // Add other organization properties as needed
        };
        return action(formData, organization);
    };
}
//# sourceMappingURL=middleware.js.map