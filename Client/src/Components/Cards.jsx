import React, { useState, useContext } from "react";
import promo from "../assets/icon5.svg";
import insights from "../assets/icon9.svg";
import sales from "../assets/icon9.svg";
import defaultIcon from "../assets/defaulticon.svg";
import like from "../assets/icon6.svg";
import liked from "../assets/liked.svg"; // Assuming this is the liked icon
import dislike from "../assets/icon7.svg";
import disliked from "../assets/disliked.svg"; // Assuming this is the disliked icon
import save from "../assets/icon8.svg";
import saved from "../assets/saved.svg"; // Assuming this is the saved icon
import "../Components/Cards.css";
import { UserContext } from "../context/UserContext";

const Cards = ({
  title,
  heading,
  date,
  content,
  examples,
  itemId,
  onLike,
  onDislike,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedBy, setSavedBy] = useState(null);
  const { likeCard, dislikeCard } = useContext(UserContext);

  const userId = "User123";

  const handleLike = () => {
    setIsLiked(!isLiked);
    likeCard({ itemId, title, heading, date, content, examples });
    if (onLike) {
      onLike({ itemId, isLiked: !isLiked });
    }
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    dislikeCard({ itemId, title, heading, date, content, examples });
    if (onDislike) {
      onDislike({ itemId, isDisliked: !isDisliked });
    }
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    setSavedBy(isSaved ? null : userId); // assuming "User123" is the user who saved it
  };

  // Map titles to icons
  const getIconByTitle = (title) => {
    switch (title) {
      case "Promotional":
        return promo;
      case "Insights":
        return insights;
      case "Sales":
        return sales;
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
            <span className="text-white text-base font-bold rounded">
              {title}
            </span>
            <img src={icon} alt={title} className="w-6 h-6" />
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
          onClick={handleLike}
        />
        <img
          className={`icon ${isDisliked ? "disliked" : ""} cursor-pointer`}
          src={isDisliked ? disliked : dislike}
          alt="dislike"
          onClick={handleDislike}
        />
        <img
          className={`icon ${isSaved ? "saved" : ""} cursor-pointer`}
          src={isSaved ? saved : save}
          alt="save"
          onClick={handleSaveClick}
        />
      </div>
    </div>
  );
};

export default Cards;
