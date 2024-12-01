import CsvUploader from './components/CsvUploader';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">CSV Processor</h1>
      <CsvUploader />
    </div>
  );
}

export default App;
