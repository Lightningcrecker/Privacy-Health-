import React, { useState } from 'react';
import { Upload, FileText, Check, X } from 'lucide-react';

interface MedicalReportUploadProps {
  onAnalysis: () => void;
}

export const MedicalReportUpload: React.FC<MedicalReportUploadProps> = ({ onAnalysis }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUploadSuccess(true);
      onAnalysis();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
      <div className="flex items-center mb-6">
        <FileText className="h-6 w-6 text-blue-400 mr-2" />
        <h3 className="text-xl font-semibold text-white">Medical Report Analysis</h3>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-300 mb-2">
              {file ? file.name : 'Drop your medical report here'}
             </p>
            <p className="text-sm text-gray-400">
              Supports PDF, JPG, JPEG, PNG
            </p>
          </label>
        </div>

        {file && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Processing...
              </>
            ) : uploadSuccess ? (
              <>
                <Check className="h-5 w-5" />
                Uploaded Successfully
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                Upload Report
              </>
            )}
          </button>
        )}

        {uploadSuccess && (
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-2">
            <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-lg font-medium text-green-400">Analysis Complete</h4>
              <p className="text-green-300">
                Your medical report has been analyzed. View detailed insights in the Analytics section.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};