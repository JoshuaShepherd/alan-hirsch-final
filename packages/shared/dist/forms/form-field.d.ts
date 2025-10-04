import { ReactNode } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
    name: TName;
    label?: string;
    description?: string;
    required?: boolean;
    children: ReactNode;
    className?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    errorClassName?: string;
    showError?: boolean;
    helpText?: string;
}
/**
 * Reusable form field wrapper that provides consistent styling,
 * validation display, and accessibility features
 */
export declare function FormField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ name, label, description, required, children, className, labelClassName, descriptionClassName, errorClassName, showError, helpText, }: FormFieldProps<TFieldValues, TName>): import("react").JSX.Element;
export interface FormFieldGroupProps {
    children: ReactNode;
    className?: string;
    columns?: 1 | 2 | 3 | 4;
    gap?: 'sm' | 'md' | 'lg';
}
/**
 * Form field group for organizing multiple fields in a grid layout
 */
export declare function FormFieldGroup({ children, className, columns, gap, }: FormFieldGroupProps): import("react").JSX.Element;
export interface ConditionalFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
    name: TName;
    condition: (value: TFieldValues[TName]) => boolean;
    children: ReactNode;
    className?: string;
}
/**
 * Conditional field that shows/hides based on another field's value
 */
export declare function ConditionalField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ name, condition, children, className, }: ConditionalFieldProps<TFieldValues, TName>): import("react").JSX.Element | null;
export interface FormFieldArrayProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
    name: TName;
    label?: string;
    description?: string;
    required?: boolean;
    minItems?: number;
    maxItems?: number;
    renderItem: (index: number, remove: () => void) => ReactNode;
    addButtonText?: string;
    className?: string;
}
/**
 * Form field array for dynamic lists of form fields
 */
export declare function FormFieldArray<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ name, label, description, required, minItems, maxItems, renderItem, addButtonText, className, }: FormFieldArrayProps<TFieldValues, TName>): import("react").JSX.Element;
//# sourceMappingURL=form-field.d.ts.map