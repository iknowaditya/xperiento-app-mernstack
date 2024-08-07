import React, { useState } from "react";
import Cards from "../Components/Cards";
import Header from "../Pages/Header";
import Footer from "./Footer";
import SeeMoreCards from "../Components/SeeMoreCards";
import {
  cardData as initialCardData,
  newCardData as initialNewCardData,
} from "../Utils/cardData";
import icon1 from "../assets/icon3.svg";
import icon2 from "../assets/icon4.svg";
import CreateCard from "../Components/CreateCard";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const [likedCards, setLikedCards] = useState([]);
  const [showMore, setShowMore] = useState(false); // State to toggle between card sets
  const [cards, setCards] = useState([
    ...initialCardData.map((card) => ({ ...card, key: uuidv4() })),
    ...initialNewCardData.map((card) => ({ ...card, key: uuidv4() })),
  ]);

  const handleLikeCard = (card) => {
    setLikedCards((prevLikedCards) => [...prevLikedCards, card]);
  };

  const handleSeeMoreClick = () => {
    setShowMore(true); // Toggle the state to show new cards
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddCard = (newCard) => {
    setCards([...cards, { ...newCard, key: uuidv4() }]);
  };

  const cardsData = [
    { count: 12, title: "Marketing", subtitle: "Insights" },
    { count: 8, title: "Behavior", subtitle: "Insights" },
    { count: 8, title: "TO-DO", subtitle: "Insights" },
    { count: 12, title: "Liked", subtitle: "Insights" },
    // Add more card data as needed
  ];

  return (
    <>
      <div className="bg-white flex flex-col items-center mx-auto max-w-sm">
        <Header />
        {/* Text Paragraph */}
        <div className="text-center mt-20">
          <p className="text-black font-bold text-2xl">
            <span className="text-base">SMART INSIGHTS TO</span> <br />
            Transform Your Business
          </p>
        </div>
        {/* Hero icons */}
        <div className="flex flex-row gap-8 py-4">
          <img src={icon1} alt="insights" className="w-16 h-16" />
          <img src={icon2} alt="insights" className="w-16 h-16" />
        </div>
        {/* Insights Cards or dashboard_item section */}
        {!showMore && (
          <>
            <div className="mt-8 flex overflow-x-auto space-x-4 w-full px-4 scroll-smooth scrollbar-hide ">
              {cardsData.map((card, index) => (
                <div
                  key={index}
                  className="flex-none w-[209px] h-[209px] bg-[#000000] text-center flex flex-col items-start px-8 justify-center text-yellow-500 font-bold text-2xl rounded-3xl "
                >
                  <span className="text-yellow-500 text-[48px] font-medium mb-2">
                    {card.count}
                  </span>
                  <span className="text-white text-[32px] font-medium">
                    {card.title}
                  </span>
                  <span className="text-white text-[22px] font-light">
                    {card.subtitle}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-400 w-96 my-6"></div>
            {/* To-Do and Liked Insights */}
            <div className="flex space-x-10 ">
              <div className="flex flex-col items-start justify-center">
                <p className="text-black font-semibold text-6xl">08</p>
                <p className="text-black font-normal text-3xl">TO-DO</p>
                <p className="text-black font-medium text-lg">Insights</p>
              </div>
              <div className=" border-s border-gray-400 w- h-28 "></div>
              <div className="flex flex-col items-start justify-center">
                <p className="text-black font-semibold text-6xl">12</p>
                <p className="text-black font-normal text-3xl">Liked </p>
                <p className="text-black font-medium text-lg"> Insights</p>
              </div>
            </div>
            <div className="border-t border-gray-400 w-96 my-4"></div>
            <h2 className="uppercase py-6 font-medium text-black">
              Create Card Here
            </h2>
            <CreateCard onAddCard={handleAddCard} />
            <div className="border-t border-gray-400 w-96 my-4"></div>
            {/* Latest insights cards */}
            <div className="flex items-center justify-center p-4">
              <h1 className="font-medium text-black">LATEST INSIGHTS</h1>
            </div>
            <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-6">
              {cards.map((card) => (
                <Cards
                  key={card.key}
                  title={card.title}
                  heading={card.heading}
                  date={card.date}
                  content={card.content}
                  examples={card.examples}
                  onLike={() => handleLikeCard(card)}
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
          </>
        )}
        {showMore && (
          <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-6">
            {cards.map((card) => (
              <SeeMoreCards
                key={card.key}
                title={card.title}
                heading={card.heading}
                date={card.date}
                content={card.content}
                examples={card.examples}
              />
            ))}
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
