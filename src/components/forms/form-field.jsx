import { Alert, AlertDescription } from '@/lib/ui/alert';
import { Button } from '@/lib/ui/button';
import { Label } from '@/lib/ui/label';
import { cn } from '@/lib/utils';
import { AlertCircle, HelpCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
/**
 * Reusable form field wrapper that provides consistent styling,
 * validation display, and accessibility features
 */
export function FormField({ name, label, description, required = false, children, className, labelClassName, descriptionClassName, errorClassName, showError = true, helpText, }) {
    const { formState } = useFormContext();
    const error = formState.errors[name];
    const hasError = !!error;
    return (<div className={cn('space-y-2', className)}>
      {/* Label */}
      {label && (<Label htmlFor={String(name)} className={cn('text-sm font-medium text-gray-900', hasError && 'text-red-600', labelClassName)}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>)}

      {/* Description */}
      {description && (<p className={cn('text-sm text-gray-600', descriptionClassName)}>
          {description}
        </p>)}

      {/* Help Text */}
      {helpText && (<div className="flex items-start space-x-2">
          <HelpCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0"/>
          <p className="text-sm text-gray-500">{helpText}</p>
        </div>)}

      {/* Field Input */}
      <div className={cn(hasError &&
            'border-red-300 focus-within:border-red-500 focus-within:ring-red-500')}>
        {children}
      </div>

      {/* Error Message */}
      {showError && hasError && (<Alert variant="destructive" className={cn('py-2', errorClassName)}>
          <AlertCircle className="h-4 w-4"/>
          <AlertDescription className="text-sm">
            {error?.message}
          </AlertDescription>
        </Alert>)}
    </div>);
}
/**
 * Form field group for organizing multiple fields in a grid layout
 */
export function FormFieldGroup({ children, className, columns = 1, gap = 'md', }) {
    const gridClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };
    const gapClasses = {
        sm: 'gap-3',
        md: 'gap-4',
        lg: 'gap-6',
    };
    return (<div className={cn('grid', gridClasses[columns], gapClasses[gap], className)}>
      {children}
    </div>);
}
/**
 * Conditional field that shows/hides based on another field's value
 */
export function ConditionalField({ name, condition, children, className, }) {
    const { watch } = useFormContext();
    const value = watch(name);
    if (!condition(value)) {
        return null;
    }
    return (<div className={cn('animate-in fade-in-0 slide-in-from-top-2 duration-200', className)}>
      {children}
    </div>);
}
/**
 * Form field array for dynamic lists of form fields
 */
export function FormFieldArray({ name, label, description, required = false, minItems = 0, maxItems, renderItem, addButtonText = 'Add Item', className, }) {
    const { control, watch, setValue } = useFormContext();
    const fieldArrayValue = watch(name) || [];
    const addItem = () => {
        if (!maxItems || fieldArrayValue.length < maxItems) {
            setValue(name, [...fieldArrayValue, {}]);
        }
    };
    const removeItem = (index) => {
        if (fieldArrayValue.length > minItems) {
            const newValue = fieldArrayValue.filter((_, i) => i !== index);
            setValue(name, newValue);
        }
    };
    return (<div className={cn('space-y-4', className)}>
      {/* Header */}
      {(label || description) && (<div className="space-y-1">
          {label && (<Label className="text-sm font-medium text-gray-900">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>)}
          {description && (<p className="text-sm text-gray-600">{description}</p>)}
        </div>)}

      {/* Items */}
      <div className="space-y-3">
        {fieldArrayValue.map((_, index) => (<div key={index} className="flex items-start space-x-3">
            <div className="flex-1">
              {renderItem(index, () => removeItem(index))}
            </div>
            {fieldArrayValue.length > minItems && (<Button type="button" variant="outline" size="sm" onClick={() => removeItem(index)} className="mt-1">
                Remove
              </Button>)}
          </div>))}
      </div>

      {/* Add Button */}
      {(!maxItems || fieldArrayValue.length < maxItems) && (<Button type="button" variant="outline" onClick={addItem} className="w-full">
          {addButtonText}
        </Button>)}
    </div>);
}
