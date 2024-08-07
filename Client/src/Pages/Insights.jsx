import React, { useState } from "react";
import Cards from "../Components/Cards";
import Header from "../Pages/Header";
import SeeMoreCards from "../Components/SeeMoreCards";
import { cardData, newCardData } from "../Utils/cardData";
import icon1 from "../assets/icon3.svg";
import icon2 from "../assets/icon4.svg";

const Insights = () => {
  const [showMore, setShowMore] = useState(false); // State to toggle between card sets

  const handleSeeMoreClick = () => {
    setShowMore(true); // Toggle the state to show new cards
  };

  return (
    <>
      <div className="bg-white  flex flex-col items-center  mx-auto max-w-sm ">
        <Header />
        <div className="text-center mt-20">
          <p className="text-black font-bold text-2xl">
            <span className="text-base">SMART INSIGHTS TO</span> <br />{" "}
            Transform Your Business
          </p>
        </div>
        <div className=" flex flex-row gap-8 py-4 ">
          <img src={icon1} alt="insights" className="w-16 h-16" />
          <img src={icon2} alt="insights" className="w-16 h-16" />
        </div>
        <div className="border-t border-gray-400 w-96 my-6"></div>{" "}
        <div className="flex items-center justify-center p-4">
          <h1 className="font-medium text-black">LATEST INSIGHTS</h1>
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-6">
          {cardData.map((card) => (
            <Cards
              key={card.itemId}
              title={card.title}
              heading={card.heading}
              date={card.date}
              content={card.content}
              examples={card.examples}
            />
          ))}
        </div>
        <div className="mb-8">
          <button
            className="text-black text-lg font-medium cursor-pointer bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 py-1 px-8 rounded-lg"
            onClick={handleSeeMoreClick}
          >
            See More..
          </button>
        </div>
        {showMore && (
          <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-6">
            {newCardData.map((card) => (
              <SeeMoreCards
                key={card.id}
                title={card.title}
                heading={card.heading}
                date={card.date}
                content={card.content}
                examples={card.examples}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Insights;
