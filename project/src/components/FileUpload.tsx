import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  accept?: Record<string, string[]>;
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx'],
  },
  maxSize = 5242880, // 5MB
}) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      await onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-400 bg-blue-400/10'
            : 'border-border hover:border-blue-400/50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="h-8 w-8 mx-auto mb-4 text-blue-400" />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <div>
            <p className="text-lg font-medium mb-1">Drop file here or click to upload</p>
            <p className="text-sm text-muted-foreground">
              Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {fileRejections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-red-500/10 text-red-500 rounded-lg"
          >
            {fileRejections.map(({ file, errors }) => (
              <div key={file.name} className="flex items-start space-x-2">
                <X className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <ul className="text-sm list-disc list-inside">
                    {errors.map(error => (
                      <li key={error.code}>{error.message}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;