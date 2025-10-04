import { Button } from '@/components/ui/button';
import React, { FormHTMLAttributes, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
export interface BaseFormProps<TFormData> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
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
export declare function BaseForm<TFormData extends Record<string, any>>({ form, onSubmit, children, submitText, cancelText, showCancel, onCancel, isLoading, isSuccess, error, successMessage, className, submitButtonProps, cancelButtonProps, ...formProps }: BaseFormProps<TFormData>): React.JSX.Element;
export interface FormSectionProps {
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
}
/**
 * Form section component for organizing form fields into logical groups
 */
export declare function FormSection({ title, description, children, className, }: FormSectionProps): React.JSX.Element;
export interface FormActionsProps {
    children: ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right' | 'between';
}
/**
 * Form actions component for custom action layouts
 */
export declare function FormActions({ children, className, align, }: FormActionsProps): React.JSX.Element;
//# sourceMappingURL=base-form.d.ts.map