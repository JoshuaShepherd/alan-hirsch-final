import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import React from 'react';
import { FormProvider } from 'react-hook-form';
/**
 * Base form component that provides consistent styling, error handling,
 * and loading states for all forms in the application
 */
export function BaseForm({ form, onSubmit, children, submitText = 'Submit', cancelText = 'Cancel', showCancel = false, onCancel, isLoading = false, isSuccess = false, error, successMessage, className, submitButtonProps, cancelButtonProps, ...formProps }) {
    const { handleSubmit, formState } = form;
    const { isSubmitting, isValid, isDirty } = formState;
    const handleFormSubmit = handleSubmit(async (data) => {
        try {
            await onSubmit(data);
        }
        catch (err) {
            console.error('Form submission error:', err);
        }
    });
    return (<FormProvider {...form}>
      <form onSubmit={handleFormSubmit} className={cn('space-y-6', className)} {...formProps}>
        {/* Success Message */}
        {isSuccess && successMessage && (<Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle2 className="h-4 w-4"/>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>)}

        {/* Error Message */}
        {error && (<Alert variant="destructive">
            <AlertCircle className="h-4 w-4"/>
            <AlertDescription>{error}</AlertDescription>
          </Alert>)}

        {/* Form Fields */}
        <div className="space-y-4">{children}</div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t">
          {showCancel && (<Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting || isLoading} {...cancelButtonProps}>
              {cancelText}
            </Button>)}

          <Button type="submit" disabled={!isValid || isSubmitting || isLoading} {...submitButtonProps}>
            {(isSubmitting || isLoading) && (<Loader2 className="mr-2 h-4 w-4 animate-spin"/>)}
            {submitText}
          </Button>
        </div>
      </form>
    </FormProvider>);
}
/**
 * Form section component for organizing form fields into logical groups
 */
export function FormSection({ title, description, children, className, }) {
    return (<div className={cn('space-y-4', className)}>
      {(title || description) && (<div className="space-y-1">
          {title && (<h3 className="text-lg font-medium text-gray-900">{title}</h3>)}
          {description && (<p className="text-sm text-gray-600">{description}</p>)}
        </div>)}
      <div className="space-y-4">{children}</div>
    </div>);
}
/**
 * Form actions component for custom action layouts
 */
export function FormActions({ children, className, align = 'right', }) {
    const alignmentClasses = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between',
    };
    return (<div className={cn('flex items-center space-x-3 pt-4 border-t', alignmentClasses[align], className)}>
      {children}
    </div>);
}
//# sourceMappingURL=base-form.jsx.map