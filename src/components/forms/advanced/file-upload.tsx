import { useFileUpload } from '@/lib/forms';
import { Alert, AlertDescription } from '@/lib/ui/alert';
import { Badge } from '@/lib/ui/badge';
import { Button } from '@/lib/ui/button';
import { Card, CardContent } from '@/lib/ui/card';
import { Progress } from '@/lib/ui/progress';
import { cn } from '@/lib/utils';
import {
  AlertCircle,
  CheckCircle2,
  File,
  FileText,
  Image,
  Loader2,
  Music,
  Upload,
  Video,
  X,
} from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export interface FileUploadFieldProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  multiple?: boolean;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  maxFiles?: number;
  className?: string;
  showPreview?: boolean;
  onUpload?: (files: File[]) => Promise<string[]>; // Returns URLs
  onRemove?: (fileUrl: string) => Promise<void>;
}

/**
 * Advanced file upload component with drag & drop, preview, and progress tracking
 */
export function FileUploadField({
  name,
  label,
  description,
  required = false,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  acceptedTypes = ['image/*', 'application/pdf', 'text/*'],
  maxFiles = 5,
  className,
  showPreview = true,
  onUpload,
  onRemove,
}: FileUploadFieldProps) {
  const { setValue, watch, formState } = useFormContext();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ file: File; url: string }>
  >([]);

  const {
    files,
    errors,
    handleFileChange,
    removeFile,
    clearFiles,
    validateFile,
  } = useFileUpload({
    maxSize,
    acceptedTypes,
    multiple,
  });

  const currentValue = watch(name);
  const fieldError = formState.errors[name];

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const droppedFiles = e.dataTransfer.files;
      handleFileChange(droppedFiles);
    },
    [handleFileChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileChange(e.target.files);
    },
    [handleFileChange]
  );

  const handleUpload = async (filesToUpload: File[]) => {
    if (!onUpload) return;

    setIsUploading(true);
    const newUploadedFiles: Array<{ file: File; url: string }> = [];

    try {
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

        // Simulate progress (in real implementation, this would come from the upload service)
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: Math.min(prev[file.name] + 10, 90),
          }));
        }, 100);

        try {
          const urls = await onUpload([file]);
          clearInterval(progressInterval);
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));

          newUploadedFiles.push({ file, url: urls[0] });
        } catch (error) {
          clearInterval(progressInterval);
          console.error(`Failed to upload ${file.name}:`, error);
        }
      }

      setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
      setValue(
        name,
        newUploadedFiles.map(f => f.url),
        { shouldValidate: true }
      );
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  };

  const handleRemoveUploaded = async (index: number) => {
    const fileToRemove = uploadedFiles[index];
    if (onRemove) {
      try {
        await onRemove(fileToRemove.url);
      } catch (error) {
        console.error('Failed to remove file:', error);
      }
    }

    const newUploadedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newUploadedFiles);
    setValue(
      name,
      newUploadedFiles.map(f => f.url),
      { shouldValidate: true }
    );
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (file.type.startsWith('video/')) return <Video className="h-4 w-4" />;
    if (file.type.startsWith('audio/')) return <Music className="h-4 w-4" />;
    if (file.type === 'application/pdf')
      return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Label and Description */}
      {(label || description) && (
        <div className="space-y-1">
          {label && (
            <label className="text-sm font-medium text-gray-900">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}

      {/* Upload Area */}
      <Card
        className={cn(
          'border-2 border-dashed transition-colors',
          fieldError
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-600" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">
                Drop files here, or click to select
              </h3>
              <p className="text-sm text-gray-600">
                {acceptedTypes.join(', ')} up to {formatFileSize(maxSize)}
                {multiple && ` (max ${maxFiles} files)`}
              </p>
            </div>

            <input
              type="file"
              multiple={multiple}
              accept={acceptedTypes.join(',')}
              onChange={handleFileSelect}
              className="hidden"
              id={`file-upload-${name}`}
            />

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                document.getElementById(`file-upload-${name}`)?.click()
              }
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Selected Files (Pre-upload) */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Selected Files</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {uploadProgress[file.name] !== undefined && (
                    <div className="w-20">
                      <Progress
                        value={uploadProgress[file.name]}
                        className="h-2"
                      />
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {onUpload && (
            <Button
              type="button"
              onClick={() => handleUpload(files)}
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Uploaded Files</h4>
          <div className="space-y-2">
            {uploadedFiles.map((uploadedFile, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  {getFileIcon(uploadedFile.file)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(uploadedFile.file.size)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Uploaded
                  </Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveUploaded(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Field Error */}
      {fieldError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{fieldError.message as string}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

// Specialized file upload components
export function ImageUploadField(
  props: Omit<FileUploadFieldProps, 'acceptedTypes'>
) {
  return (
    <FileUploadField
      {...props}
      acceptedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
      showPreview={true}
    />
  );
}

export function DocumentUploadField(
  props: Omit<FileUploadFieldProps, 'acceptedTypes'>
) {
  return (
    <FileUploadField
      {...props}
      acceptedTypes={[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
      ]}
      showPreview={false}
    />
  );
}

export function MediaUploadField(
  props: Omit<FileUploadFieldProps, 'acceptedTypes'>
) {
  return (
    <FileUploadField
      {...props}
      acceptedTypes={['image/*', 'video/*', 'audio/*']}
      showPreview={true}
    />
  );
}
