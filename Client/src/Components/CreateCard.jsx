import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaCalendarAlt,
  FaHeading,
  FaFileAlt,
  FaTags,
  FaRegClock,
} from "react-icons/fa";

const CreateCard = ({ onAddCard }) => {
  const [title, setTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [examples, setExamples] = useState([""]);

  const handleExampleChange = (index, value) => {
    const newExamples = [...examples];
    newExamples[index] = value;
    setExamples(newExamples);
  };

  const addExample = () => {
    if (examples.length < 3) {
      setExamples([...examples, ""]);
    }
  };

  const removeExample = (index) => {
    const newExamples = examples.filter((_, i) => i !== index);
    setExamples(newExamples);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      itemId: Date.now(),
      title,
      heading,
      date,
      content,
      examples,
    };
    onAddCard(newCard);
    setTitle("");
    setHeading("");
    setDate("");
    setContent("");
    setExamples([""]);
    console.log(newCard);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-500">
        Create a New Card
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center mb-4">
          <FaTags className="text-yellow-500 mr-2" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-3 bg-black border border-gray-900 text-[#e8e8e8] rounded-xl focus:ring-[#e8e8e8] placeholder-[#b7b7b7]"
            placeholder="Enter title"
            required
          />
        </div>{" "}
        <div className="flex items-center mb-4">
          <FaHeading className="text-yellow-500 mr-2" />
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="mt-1 block w-full p-3 bg-black border border-gray-900 text-[#e8e8e8] rounded-xl focus:ring-[#e8e8e8] placeholder-[#b7b7b7]"
            placeholder="Enter heading"
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="text-yellow-500 mr-2" />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full cursor-pointer p-3 bg-black border border-gray-900 text-[#e8e8e8] rounded-xl focus:ring-[#e8e8e8] placeholder-[#f3d0d0]"
            datatype="datetime-local"
            required
          />
          <style>{`
            input[type="datetime-local"]::-webkit-calendar-picker-indicator {
              filter: invert(50%) sepia(0%) saturate(0%) hue-rotate(180deg)
                brightness(50%) contrast(80%);
            }
          `}</style>
        </div>
        <div className="flex items-start mb-4">
          <FaFileAlt className="text-yellow-500 mr-2" />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full p-3 bg-black border border-gray-900 text-[#e8e8e8] rounded-xl focus:ring-[#e8e8e8] placeholder-[#b7b7b7]"
            rows="4"
            placeholder="Enter content"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-yellow-500 mb-2">Examples</label>
          {examples.map((example, index) => (
            <div key={index} className="flex items-center mb-2">
              <FaRegClock className="text-yellow-500 mr-2" />
              <input
                type="text"
                value={example}
                onChange={(e) => handleExampleChange(index, e.target.value)}
                className="mt-1 block w-full p-3 bg-black border border-gray-900 text-[#e8e8e8] rounded-xl focus:ring-[#e8e8e8] placeholder-[#b7b7b7]"
                placeholder={`Example ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeExample(index)}
                className="ml-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          {examples.length < 3 && (
            <button
              type="button"
              onClick={addExample}
              className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center"
            >
              <FaPlus className="mr-2" /> Add Example
            </button>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-3 rounded hover:bg-yellow-600"
        >
          Create Card
        </button>
      </form>
    </div>
  );
};

export default CreateCard;
