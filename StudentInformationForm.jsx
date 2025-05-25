import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    className: '',
    percentage: '',
    subjects: []
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // New success state

  const globalStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto :wght@400;700&display=swap');
    body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      min-height: 100vh;
    }
    @keyframes fade-in-down {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-down {
      animation: fade-in-down 0.5s ease-out;
    }
  `;

  const handleInputChange = (e) => {
    setFormError('');
    setShowSuccess(false);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormError('');
    setShowSuccess(false);
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      subjects: checked 
        ? [...prev.subjects, value]
        : prev.subjects.filter((s) => s !== value)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.className.trim()) newErrors.className = 'Class is required';
    if (formData.percentage === '') {
      newErrors.percentage = 'Percentage is required';
    } else if (formData.percentage < 0 || formData.percentage > 100) {
      newErrors.percentage = 'Percentage must be between 0 and 100';
    }
    if (formData.subjects.length === 0) {
      newErrors.subjects = 'At least one subject must be selected';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmittedData(formData);
      setFormData({
        name: '',
        className: '',
        percentage: '',
        subjects: []
      });
      setErrors({});
      setFormError('');
      setShowSuccess(true); // Show success state
    } else {
      setFormError('Please fill all required fields');
      setShowSuccess(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      className: '',
      percentage: '',
      subjects: []
    });
    setSubmittedData(null);
    setErrors({});
    setFormError('');
    setShowSuccess(false);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start pt-16 px-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80 ')",
      }}
    >
      <style>{globalStyle}</style>

      <h1 className="text-white text-3xl sm:text-4xl font-bold mb-6 text-center">
        Computer Science Project
      </h1>

      {/* Error/Success Messages */}
      <div className="w-full max-w-2xl mb-6">
        {formError && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">
            {formError}
          </div>
        )}
        {showSuccess && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-center">
            Form submitted successfully!
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 w-full max-w-2xl shadow-lg mb-6"
      >
        <fieldset className="border border-gray-300 rounded-lg p-4">
          <legend className="font-bold text-lg px-2">Student Information</legend>

          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              aria-describedby="nameError"
              className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your full name"
              required
            />
            {errors.name && <p id="nameError" className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Class Field */}
          <div className="mb-4">
            <label htmlFor="class" className="block font-medium mb-1">Class:</label>
            <input
              id="class"
              name="className"
              type="text"
              value={formData.className}
              onChange={handleInputChange}
              aria-describedby="classError"
              className={`w-full px-3 py-2 border rounded-md ${errors.className ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g. 10th Grade"
              required
            />
            {errors.className && <p id="classError" className="text-red-500 text-sm mt-1">{errors.className}</p>}
          </div>

          {/* Percentage Field */}
          <div className="mb-4">
            <label htmlFor="percentage" className="block font-medium mb-1">Percentage:</label>
            <input
              id="percentage"
              name="percentage"
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={formData.percentage}
              onChange={handleInputChange}
              aria-describedby="percentageError"
              className={`w-full px-3 py-2 border rounded-md ${errors.percentage ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g. 95.5"
              required
            />
            {errors.percentage && <p id="percentageError" className="text-red-500 text-sm mt-1">{errors.percentage}</p>}
          </div>

          {/* Subjects Offered */}
          <fieldset className="border border-gray-200 rounded-md p-4 mb-4">
            <legend className="font-medium">Subjects Offered:</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {['Hindi', 'Science', 'Maths', 'English', 'Computer Science', 'Geography'].map((subject) => (
                <label key={subject} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={subject}
                    checked={formData.subjects.includes(subject)}
                    onChange={handleCheckboxChange}
                    className="rounded text-blue-600"
                  />
                  <span>{subject}</span>
                </label>
              ))}
            </div>
            {errors.subjects && <p className="text-red-500 text-sm mt-1">{errors.subjects}</p>}
          </fieldset>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="reset"
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md transition"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={showSuccess}
              className={`px-4 py-2 rounded-md transition ${
                showSuccess
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>

      {/* Submitted Data Display */}
      {submittedData && (
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto shadow-md animate-fade-in-down">
          <h2 className="text-xl font-semibold mb-2">Submitted Data:</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Class:</strong> {submittedData.className}</p>
          <p><strong>Percentage:</strong> {submittedData.percentage}%</p>
          <p><strong>Subjects:</strong> {submittedData.subjects.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
