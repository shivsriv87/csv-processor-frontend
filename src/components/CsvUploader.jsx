import React, { useState } from 'react';
import axios from 'axios';
import DataTable from './DataTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CsvUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadedData, setUploadedData] = useState([]);
  const [processedData, setProcessedData] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const rows = e.target.result.split('\n').map((row) => row.split(','));
      setUploadedData(rows);
    };
    reader.readAsText(uploadedFile);
  };

  const handleProcess = async () => {
    if (!file) {
      toast.error('Please upload a file before processing!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://csv-processor-backend.onrender.com//api/csv/upload', formData);
      setProcessedData(response.data.processedData);
      toast.success('File processed successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Error processing file. Please try again!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleDownload = () => {
    if (processedData.length === 0) {
      toast.error('No processed data available for download!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const csvContent = processedData
      .map((row) => row.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'processed_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-3/4 md:w-1/2">
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="border border-gray-300 rounded-lg p-2"
        />
      </form>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleProcess}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Process File 
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Download Processed File
        </button>
      </div>

      {uploadedData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Uploaded File</h2>
          <DataTable data={uploadedData} />
        </div>
      )}

      {processedData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Processed File</h2>
          <DataTable data={processedData} />
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CsvUploader;
