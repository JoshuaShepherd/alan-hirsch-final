import { Alert, AlertDescription } from '@platform/ui/alert';
import { Button } from '@platform/ui/button';
import { cn } from '@platform/shared/utils';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import React, { FormHTMLAttributes, ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

export interface BaseFormProps<TFormData>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<TFormData>;
  onSubmit: (data: TFormData) => Promise<void> | void;
  children: ReactNode;
  submitText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onCancel?: () => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  error?: string | null;
  successMessage?: string;
  className?: string;
  submitButtonProps?: React.ComponentProps<typeof Button>;
  cancelButtonProps?: React.ComponentProps<typeof Button>;
}

/**
 * Base form component that provides consistent styling, error handling,
 * and loading states for all forms in the application
 */
export function BaseForm<TFormData extends Record<string, any>>({
  form,
  onSubmit,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel',
  showCancel = false,
  onCancel,
  isLoading = false,
  isSuccess = false,
  error,
  successMessage,
  className,
  submitButtonProps,
  cancelButtonProps,
  ...formProps
}: BaseFormProps<TFormData>) {
  const { handleSubmit, formState } = form;
  const { isSubmitting, isValid, isDirty } = formState;

  const handleFormSubmit = handleSubmit(async data => {
    try {
      await onSubmit(data);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleFormSubmit}
        className={cn('space-y-6', className)}
        {...formProps}
      >
        {/* Success Message */}
        {isSuccess && successMessage && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Form Fields */}
        <div className="space-y-4">{children}</div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t">
          {showCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting || isLoading}
              {...cancelButtonProps}
            >
              {cancelText}
            </Button>
          )}

          <Button
            type="submit"
            disabled={!isValid || isSubmitting || isLoading}
            {...submitButtonProps}
          >
            {(isSubmitting || isLoading) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {submitText}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Form section component for organizing form fields into logical groups
 */
export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export interface FormActionsProps {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'between';
}

/**
 * Form actions component for custom action layouts
 */
export function FormActions({
  children,
  className,
  align = 'right',
}: FormActionsProps) {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div
      className={cn(
        'flex items-center space-x-3 pt-4 border-t',
        alignmentClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
}
