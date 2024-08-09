import React from "react";
import Header from "./Header";
import icon1 from "../assets/icon3.svg";
import icon2 from "../assets/icon4.svg";
import { newCardData } from "../Utils/cardData";
import SeeMoreCards from "../Components/SeeMoreCards";
import Footer from "./Footer";

function Bookmark() {
  return (
    <div className="bg-white flex flex-col items-center mx-auto max-w-sm">
      <Header />
      <div className="text-center mt-20">
        <p className="text-black font-bold text-2xl">
          <span className="text-base">SMART INSIGHTS TO</span> <br />
          Transform Your Business
        </p>
      </div>
      <div className="flex flex-row gap-8 py-4">
        <img src={icon1} alt="insights" className="w-16 h-16" />
        <img src={icon2} alt="insights" className="w-16 h-16" />
      </div>
      <div className="border-t border-gray-400 w-96 my-6"></div>
      <div>
        <div className="text-center mt-6">
          <p className="text-black font-bold text-2xl">
            <span className="text-base">BOOKMARKED</span> <br />
          </p>
        </div>
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
      </div>
      <Footer />
    </div>
  );
}

export default Bookmark;
