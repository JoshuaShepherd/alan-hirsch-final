import { FieldErrors, FormEventHandler, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
export interface TypedFormHook<TFormData> {
    form: UseFormReturn<TFormData>;
    isValid: boolean;
    isDirty: boolean;
    isSubmitting: boolean;
    errors: FieldErrors<TFormData>;
    handleSubmit: (onValid: (data: TFormData) => Promise<void>) => FormEventHandler;
    reset: (values?: Partial<TFormData>) => void;
    setValue: <K extends keyof TFormData>(name: K, value: TFormData[K]) => void;
    watch: <K extends keyof TFormData>(name?: K) => TFormData[K] | TFormData;
}
export interface TypedFormOptions<TFormData> {
    defaultValues?: Partial<TFormData>;
    mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
    reValidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
    shouldFocusError?: boolean;
    shouldUnregister?: boolean;
    shouldUseNativeValidation?: boolean;
    delayError?: number;
    persistKey?: string;
    debounceMs?: number;
}
/**
 * Main typed form hook that combines React Hook Form with Zod validation
 * Provides complete TypeScript inference and real-time validation
 */
export declare function useTypedForm<TFormData extends Record<string, any>>(schema: z.ZodSchema<TFormData>, options?: TypedFormOptions<TFormData>): TypedFormHook<TFormData>;
export interface FormSubmissionState {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: Error | null;
    submitCount: number;
}
export declare function useFormSubmission<TFormData>(): {
    state: FormSubmissionState;
    submit: (data: TFormData, submitFn: (data: TFormData) => Promise<any>) => Promise<any>;
    reset: () => void;
};
export declare function useFormPersistence<TFormData>(form: UseFormReturn<TFormData>, persistKey?: string): void;
export interface MultiStepFormState {
    currentStep: number;
    totalSteps: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    completedSteps: number[];
    canGoNext: boolean;
    canGoPrevious: boolean;
}
export declare function useMultiStepForm<TFormData>(steps: string[], form: UseFormReturn<TFormData>): {
    state: MultiStepFormState;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    validateCurrentStep: () => Promise<boolean>;
};
export declare function useFormValidation<TFormData>(form: UseFormReturn<TFormData>, debounceMs?: number): {
    validationErrors: FieldErrors<TFormData>;
    validate: any;
    isValid: boolean;
};
export declare function useURLSync<TFormData>(form: UseFormReturn<TFormData>, basePath?: string): {
    updateURL: (data: TFormData) => void;
    syncWithURL: () => void;
};
export interface FileUploadOptions {
    maxSize?: number;
    acceptedTypes?: string[];
    multiple?: boolean;
}
export declare function useFileUpload(options?: FileUploadOptions): {
    files: File[];
    uploadProgress: Record<string, number>;
    errors: string[];
    handleFileChange: (newFiles: FileList | null) => void;
    removeFile: (index: number) => void;
    clearFiles: () => void;
    validateFile: (file: File) => string | null;
};
//# sourceMappingURL=hooks.d.ts.map