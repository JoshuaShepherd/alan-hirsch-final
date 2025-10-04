import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FieldErrors,
  FormEventHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';

// Core form hook with complete TypeScript inference
export interface TypedFormHook<TFormData> {
  form: UseFormReturn<TFormData>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  errors: FieldErrors<TFormData>;
  handleSubmit: (
    onValid: (data: TFormData) => Promise<void>
  ) => FormEventHandler;
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
export function useTypedForm<TFormData extends Record<string, any>>(
  schema: z.ZodSchema<TFormData>,
  options: TypedFormOptions<TFormData> = {}
): TypedFormHook<TFormData> {
  const {
    defaultValues,
    mode = 'onChange',
    reValidateMode = 'onChange',
    shouldFocusError = true,
    shouldUnregister = false,
    shouldUseNativeValidation = false,
    delayError = 0,
    persistKey,
    debounceMs = 300,
  } = options;

  const form = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
    reValidateMode,
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    delayError,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form persistence
  useFormPersistence(form, persistKey);

  // Debounced validation for real-time feedback
  const debouncedValidate = useDebouncedCallback(() => {
    form.trigger();
  }, debounceMs);

  useEffect(() => {
    const subscription = form.watch(() => {
      debouncedValidate();
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedValidate]);

  const handleSubmit = useCallback(
    (onValid: (data: TFormData) => Promise<void>) => {
      return form.handleSubmit(async data => {
        try {
          setIsSubmitting(true);
          await onValid(data);
        } catch (error) {
          console.error('Form submission error:', error);
          throw error;
        } finally {
          setIsSubmitting(false);
        }
      });
    },
    [form]
  );

  const reset = useCallback(
    (values?: Partial<TFormData>) => {
      form.reset(values);
      if (persistKey) {
        localStorage.removeItem(`form-${persistKey}`);
      }
    },
    [form, persistKey]
  );

  const setValue = useCallback(
    <K extends keyof TFormData>(name: K, value: TFormData[K]) => {
      form.setValue(name, value, { shouldValidate: true, shouldDirty: true });
    },
    [form]
  );

  return {
    form,
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty,
    isSubmitting,
    errors: form.formState.errors,
    handleSubmit,
    reset,
    setValue,
    watch: form.watch,
  };
}

// Form submission hook with loading states and error handling
export interface FormSubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: Error | null;
  submitCount: number;
}

export function useFormSubmission<TFormData>(): {
  state: FormSubmissionState;
  submit: (
    data: TFormData,
    submitFn: (data: TFormData) => Promise<any>
  ) => Promise<any>;
  reset: () => void;
} {
  const [state, setState] = useState<FormSubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
    submitCount: 0,
  });

  const submit = useCallback(
    async (data: TFormData, submitFn: (data: TFormData) => Promise<any>) => {
      setState(prev => ({ ...prev, isSubmitting: true, error: null }));

      try {
        const result = await submitFn(data);
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          isSuccess: true,
          submitCount: prev.submitCount + 1,
        }));
        return result;
      } catch (error) {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          error:
            error instanceof Error ? error : new Error('Submission failed'),
        }));
        throw error;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
      submitCount: 0,
    });
  }, []);

  return { state, submit, reset };
}

// Form persistence hook for auto-saving form state
export function useFormPersistence<TFormData>(
  form: UseFormReturn<TFormData>,
  persistKey?: string
) {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!persistKey || isInitialized.current) return;

    // Restore form state from localStorage
    try {
      const savedState = localStorage.getItem(`form-${persistKey}`);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        form.reset(parsedState);
      }
    } catch (error) {
      console.warn('Failed to restore form state:', error);
    }

    isInitialized.current = true;
  }, [form, persistKey]);

  useEffect(() => {
    if (!persistKey) return;

    // Save form state to localStorage on changes
    const subscription = form.watch(data => {
      try {
        localStorage.setItem(`form-${persistKey}`, JSON.stringify(data));
      } catch (error) {
        console.warn('Failed to save form state:', error);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, persistKey]);
}

// Multi-step form hook for complex forms with multiple steps
export interface MultiStepFormState {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  completedSteps: number[];
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function useMultiStepForm<TFormData>(
  steps: string[],
  form: UseFormReturn<TFormData>
): {
  state: MultiStepFormState;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  validateCurrentStep: () => Promise<boolean>;
} {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const state: MultiStepFormState = {
    currentStep,
    totalSteps: steps.length,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    completedSteps,
    canGoNext: currentStep < steps.length - 1,
    canGoPrevious: currentStep > 0,
  };

  const validateCurrentStep = useCallback(async () => {
    // Get fields for current step (this would need to be configured per step)
    // For now, validate all fields
    const isValid = await form.trigger();
    return isValid;
  }, [form]);

  const nextStep = useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, steps.length, validateCurrentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < steps.length) {
        setCurrentStep(step);
      }
    },
    [steps.length]
  );

  return {
    state,
    nextStep,
    prevStep,
    goToStep,
    validateCurrentStep,
  };
}

// Real-time validation hook with debouncing
export function useFormValidation<TFormData>(
  form: UseFormReturn<TFormData>,
  debounceMs: number = 300
) {
  const [validationErrors, setValidationErrors] = useState<
    FieldErrors<TFormData>
  >({});

  const debouncedValidate = useDebouncedCallback(
    async (fields?: (keyof TFormData)[]) => {
      const result = await form.trigger(fields);
      setValidationErrors(form.formState.errors);
      return result;
    },
    debounceMs
  );

  useEffect(() => {
    const subscription = form.watch(() => {
      debouncedValidate();
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedValidate]);

  return {
    validationErrors,
    validate: debouncedValidate,
    isValid: form.formState.isValid,
  };
}

// URL synchronization hook for search/filter forms
export function useURLSync<TFormData>(
  form: UseFormReturn<TFormData>,
  basePath: string = ''
) {
  const router = useRouter();

  const updateURL = useCallback(
    (data: TFormData) => {
      const params = new URLSearchParams();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            params.set(key, value.join(','));
          } else {
            params.set(key, String(value));
          }
        }
      });

      const queryString = params.toString();
      const newPath = queryString ? `${basePath}?${queryString}` : basePath;

      router.push(newPath, { scroll: false });
    },
    [router, basePath]
  );

  const syncWithURL = useCallback(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const urlData: Partial<TFormData> = {};

    params.forEach((value, key) => {
      const fieldName = key as keyof TFormData;
      const currentValue = form.getValues(fieldName);

      if (Array.isArray(currentValue)) {
        urlData[fieldName] = value.split(',') as TFormData[keyof TFormData];
      } else if (typeof currentValue === 'number') {
        urlData[fieldName] = Number(value) as TFormData[keyof TFormData];
      } else if (typeof currentValue === 'boolean') {
        urlData[fieldName] = (value === 'true') as TFormData[keyof TFormData];
      } else {
        urlData[fieldName] = value as TFormData[keyof TFormData];
      }
    });

    form.reset({ ...form.getValues(), ...urlData });
  }, [form]);

  return {
    updateURL,
    syncWithURL,
  };
}

// File upload hook with validation
export interface FileUploadOptions {
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  multiple?: boolean;
}

export function useFileUpload(options: FileUploadOptions = {}) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [errors, setErrors] = useState<string[]>([]);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (options.maxSize && file.size > options.maxSize) {
        return `File size must be less than ${Math.round(options.maxSize / 1024 / 1024)}MB`;
      }

      if (options.acceptedTypes && options.acceptedTypes.length > 0) {
        const isValidType = options.acceptedTypes.some(type => {
          if (type.endsWith('/*')) {
            return file.type.startsWith(type.slice(0, -1));
          }
          return file.type === type;
        });

        if (!isValidType) {
          return `File type must be one of: ${options.acceptedTypes.join(', ')}`;
        }
      }

      return null;
    },
    [options]
  );

  const handleFileChange = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;

      const fileArray = Array.from(newFiles);
      const validationErrors: string[] = [];
      const validFiles: File[] = [];

      fileArray.forEach(file => {
        const error = validateFile(file);
        if (error) {
          validationErrors.push(`${file.name}: ${error}`);
        } else {
          validFiles.push(file);
        }
      });

      setErrors(validationErrors);

      if (options.multiple) {
        setFiles(prev => [...prev, ...validFiles]);
      } else {
        setFiles(validFiles.slice(0, 1));
      }
    },
    [validateFile, options.multiple]
  );

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setErrors([]);
    setUploadProgress({});
  }, []);

  return {
    files,
    uploadProgress,
    errors,
    handleFileChange,
    removeFile,
    clearFiles,
    validateFile,
  };
}
