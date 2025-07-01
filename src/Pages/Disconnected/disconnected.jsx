import React, { useState } from "react"
import { AlertTriangle, CheckCircle } from "lucide-react"

export default function Disconnected() {
  const [selectedOption, setSelectedOption] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedOption) {
      setIsSubmitted(true)
      console.log("User selected:", selectedOption)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-green-900">Thank You!</h2>
            <p className="text-gray-600 mt-2">
              Your feedback has been submitted successfully. We'll use this information to improve our service.
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-red-900">Technical Error Occurred</h2>
          <p className="text-gray-600 mt-2">
            We encountered an unexpected issue. To help us resolve this problem, please let us know what happened.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label className="text-base font-medium mb-4 block">
              What were you doing when this error occurred?
            </label>
            <div className="space-y-3">
              {[
                { value: "disconnected", label: "I got disconnected from the internet" },
                { value: "closed-browser", label: "I accidentally closed the browser/tab" },
                { value: "page-refresh", label: "I refreshed the page" },
                { value: "session-timeout", label: "I was inactive for a long time" },
                { value: "clicked-button", label: "I clicked a button and this happened" },
                { value: "form-submission", label: "I was submitting a form" },
                { value: "other", label: "Something else happened" }
              ].map(({ value, label }) => (
                <label
                  key={value}
                  htmlFor={value}
                  className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <input
                    type="radio"
                    id={value}
                    name="error"
                    value={value}
                    checked={selectedOption === value}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="form-radio text-teal-600 focus:outline-none focus:ring-0"
                  />
                  <span className="flex-1">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 transition"
              onClick={() => (window.location.href = "/")}
            >
              Skip
            </button>
            <button
              type="submit"
              className={`flex-1 py-2 px-4 rounded text-white transition ${
                selectedOption ? "bg-teal-600 hover:bg-teal-700 text-slate-100 font-semibold" : "bg-gray-300 cursor-not-allowed text-slate-100 font-semibold"
              }`}
              disabled={!selectedOption}
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
