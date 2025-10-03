import { z } from 'zod';
import { UserProfile } from '@/lib/db/schema';
import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: unknown; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    const formDataObj = Object.fromEntries(formData);

    console.log('🔐 Validation: Form data received:', {
      formDataObj,
      timestamp: new Date().toISOString(),
    });

    // Log each field individually for debugging
    console.log('🔐 Validation: Individual field analysis:', {
      email: {
        value: formDataObj.email,
        type: typeof formDataObj.email,
        isEmpty: !formDataObj.email,
      },
      password: {
        value: formDataObj.password ? '***' : 'EMPTY',
        type: typeof formDataObj.password,
        isEmpty: !formDataObj.password,
      },
      organizationId: {
        value: formDataObj.organizationId,
        type: typeof formDataObj.organizationId,
        isEmpty: !formDataObj.organizationId,
      },
      priceId: {
        value: formDataObj.priceId,
        type: typeof formDataObj.priceId,
        isEmpty: !formDataObj.priceId,
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
          received: error.received,
        });
      });

      return { error: result.error.errors[0].message };
    }

    console.log('🔐 Validation: Schema validation passed:', {
      validatedData: result.data,
      timestamp: new Date().toISOString(),
    });

    return action(result.data, formData);
  };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: UserProfile
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    const user = await getUser();
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    return action(result.data, formData, user);
  };
}

// Organization-based actions
type WithTeamFunction<T> = (
  formData: FormData,
  organization: any // You can type this properly based on your organization schema
) => Promise<T>;

export function withTeam<T>(action: WithTeamFunction<T>) {
  return async (formData: FormData) => {
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
