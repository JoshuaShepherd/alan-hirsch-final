import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
/**
 * Main typed form hook that combines React Hook Form with Zod validation
 * Provides complete TypeScript inference and real-time validation
 */
export function useTypedForm(schema, options = {}) {
    const { defaultValues, mode = 'onChange', reValidateMode = 'onChange', shouldFocusError = true, shouldUnregister = false, shouldUseNativeValidation = false, delayError = 0, persistKey, debounceMs = 300, } = options;
    const form = useForm({
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
    const handleSubmit = useCallback((onValid) => {
        return form.handleSubmit(async (data) => {
            try {
                setIsSubmitting(true);
                await onValid(data);
            }
            catch (error) {
                console.error('Form submission error:', error);
                throw error;
            }
            finally {
                setIsSubmitting(false);
            }
        });
    }, [form]);
    const reset = useCallback((values) => {
        form.reset(values);
        if (persistKey) {
            localStorage.removeItem(`form-${persistKey}`);
        }
    }, [form, persistKey]);
    const setValue = useCallback((name, value) => {
        form.setValue(name, value, { shouldValidate: true, shouldDirty: true });
    }, [form]);
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
export function useFormSubmission() {
    const [state, setState] = useState({
        isSubmitting: false,
        isSuccess: false,
        error: null,
        submitCount: 0,
    });
    const submit = useCallback(async (data, submitFn) => {
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
        }
        catch (error) {
            setState(prev => ({
                ...prev,
                isSubmitting: false,
                error: error instanceof Error ? error : new Error('Submission failed'),
            }));
            throw error;
        }
    }, []);
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
export function useFormPersistence(form, persistKey) {
    const isInitialized = useRef(false);
    useEffect(() => {
        if (!persistKey || isInitialized.current)
            return;
        // Restore form state from localStorage
        try {
            const savedState = localStorage.getItem(`form-${persistKey}`);
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                form.reset(parsedState);
            }
        }
        catch (error) {
            console.warn('Failed to restore form state:', error);
        }
        isInitialized.current = true;
    }, [form, persistKey]);
    useEffect(() => {
        if (!persistKey)
            return;
        // Save form state to localStorage on changes
        const subscription = form.watch(data => {
            try {
                localStorage.setItem(`form-${persistKey}`, JSON.stringify(data));
            }
            catch (error) {
                console.warn('Failed to save form state:', error);
            }
        });
        return () => subscription.unsubscribe();
    }, [form, persistKey]);
}
export function useMultiStepForm(steps, form) {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);
    const state = {
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
    const goToStep = useCallback((step) => {
        if (step >= 0 && step < steps.length) {
            setCurrentStep(step);
        }
    }, [steps.length]);
    return {
        state,
        nextStep,
        prevStep,
        goToStep,
        validateCurrentStep,
    };
}
// Real-time validation hook with debouncing
export function useFormValidation(form, debounceMs = 300) {
    const [validationErrors, setValidationErrors] = useState({});
    const debouncedValidate = useDebouncedCallback(async (fields) => {
        const result = await form.trigger(fields);
        setValidationErrors(form.formState.errors);
        return result;
    }, debounceMs);
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
export function useURLSync(form, basePath = '') {
    const router = useRouter();
    const updateURL = useCallback((data) => {
        const params = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                if (Array.isArray(value)) {
                    params.set(key, value.join(','));
                }
                else {
                    params.set(key, String(value));
                }
            }
        });
        const queryString = params.toString();
        const newPath = queryString ? `${basePath}?${queryString}` : basePath;
        router.push(newPath, { scroll: false });
    }, [router, basePath]);
    const syncWithURL = useCallback(() => {
        if (typeof window === 'undefined')
            return;
        const params = new URLSearchParams(window.location.search);
        const urlData = {};
        params.forEach((value, key) => {
            const fieldName = key;
            const currentValue = form.getValues(fieldName);
            if (Array.isArray(currentValue)) {
                urlData[fieldName] = value.split(',');
            }
            else if (typeof currentValue === 'number') {
                urlData[fieldName] = Number(value);
            }
            else if (typeof currentValue === 'boolean') {
                urlData[fieldName] = (value === 'true');
            }
            else {
                urlData[fieldName] = value;
            }
        });
        form.reset({ ...form.getValues(), ...urlData });
    }, [form]);
    return {
        updateURL,
        syncWithURL,
    };
}
export function useFileUpload(options = {}) {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [errors, setErrors] = useState([]);
    const validateFile = useCallback((file) => {
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
    }, [options]);
    const handleFileChange = useCallback((newFiles) => {
        if (!newFiles)
            return;
        const fileArray = Array.from(newFiles);
        const validationErrors = [];
        const validFiles = [];
        fileArray.forEach(file => {
            const error = validateFile(file);
            if (error) {
                validationErrors.push(`${file.name}: ${error}`);
            }
            else {
                validFiles.push(file);
            }
        });
        setErrors(validationErrors);
        if (options.multiple) {
            setFiles(prev => [...prev, ...validFiles]);
        }
        else {
            setFiles(validFiles.slice(0, 1));
        }
    }, [validateFile, options.multiple]);
    const removeFile = useCallback((index) => {
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
//# sourceMappingURL=hooks.js.map