import React, { useState } from "react";
import promo from "../assets/icon10.svg";
import message from "../assets/icon11.svg";
import sales from "../assets/icon12.svg";
import upcoming from "../assets/icon13.svg";
import socio from "../assets/icon14.svg";
import customer from "../assets/icon15.svg";
import they from "../assets/icon16.svg";
import defaultIcon from "../assets/defaulticon.svg";
import like from "../assets/icon6.svg";
import liked from "../assets/liked.svg"; // Assuming this is the liked icon
import dislike from "../assets/icon7.svg";
import disliked from "../assets/disliked.svg"; // Assuming this is the disliked icon
import save from "../assets/icon8.svg";
import saved from "../assets/saved.svg"; // Assuming this is the saved icon
import "../Components/Cards.css";

const SeeMoreCards = ({ title, heading, date, content, examples }) => {
  //   const icon = iconMapping[title] || defaultIcon; // Default icon if no match is found

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likedBy, setLikedBy] = useState(null);
  const [dislikedBy, setDislikedBy] = useState(null);
  const [savedBy, setSavedBy] = useState(null);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikedBy(isLiked ? null : "User123"); // assuming "User123" is the user who liked it
  };

  const handleDislikeClick = () => {
    setIsDisliked(!isDisliked);
    setDislikedBy(isDisliked ? null : "User123"); // assuming "User123" is the user who disliked it
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    setSavedBy(isSaved ? null : "User123"); // assuming "User123" is the user who saved it
  };

  // Map titles to icons
  const getIconByTitle = (title) => {
    switch (title) {
      case "Promotional Ideas":
        return promo;
      case "Message Opportunity":
        return message;
      case "Higher Ticket Sale":
        return sales;
      case "Upcoming Festival/ Event":
        return upcoming;
      case "Socio-Cultural Events":
        return socio;
      case "Customer Retention":
        return customer;
      case "What do they like?":
        return they;
      default:
        return defaultIcon; // Default icon
    }
  };

  const icon = getIconByTitle(title);
  return (
    <div className="max-w-sm mx-auto min-h-[32rem] flex flex-col bg-black text-white p-6 rounded-2xl shadow-lg mb-6">
      <div className="flex-grow">
        <div className="mb-4 flex flex-col items-start">
          <div className="mb-2 flex flex-row gap-2">
            <img src={icon} alt="insights" className="w-6 h-6" />
            <span className="text-white text-base font-bold  rounded">
              {title}
            </span>
          </div>
          <span className="text-gray-400 text-xs">{date}</span>
        </div>
        <h2 className="text-3xl font-light mb-2">{heading}</h2>
        <h1 className="text-sm font-medium text-yellow-500">Action</h1>
        <p className="mb-4">{content}</p>
        {examples.map((example, index) => (
          <p key={index} className="text-white text-sm font-normal">
            {example}
          </p>
        ))}
      </div>
      <div className="border-t border-neutral-800 w-72 "></div>
      <div className="flex justify-between mt-4">
        <img
          className={`icon ${isLiked ? "liked" : ""} cursor-pointer`}
          src={isLiked ? liked : like}
          alt="like"
          onClick={handleLikeClick}
        />
        <img
          className={`icon ${isDisliked ? "disliked" : ""} cursor-pointer`}
          src={isDisliked ? disliked : dislike}
          alt="dislike"
          onClick={handleDislikeClick}
        />
        <img
          className={`icon ${isSaved ? "saved" : ""} cursor-pointer`}
          src={isSaved ? saved : save}
          alt="save"
          onClick={handleSaveClick}
        />
      </div>
      {likedBy && <p className="text-white mt-4">Liked by: {likedBy}</p>}
      {dislikedBy && (
        <p className="text-white mt-4">Disliked by: {dislikedBy}</p>
      )}
      {savedBy && <p className="text-white mt-4">Saved by: {savedBy}</p>}
    </div>
  );
};

export default SeeMoreCards;
