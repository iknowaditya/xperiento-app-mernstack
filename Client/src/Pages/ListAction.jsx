import React, { useContext } from "react";
import Cards from "../Components/Cards";
import Header from "./Header";
import icon1 from "../assets/icon3.svg";
import icon2 from "../assets/icon4.svg";

function ListAction({ likedCards = [] }) {
  return (
    <>
      <div className="bg-white h-screen flex flex-col items-center mx-auto max-w-sm">
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
        <div className="my-list-of-actions">
          <div className="text-center">
            <p className="text-black font-bold text-2xl p-4">
              <span className="text-base">My List of Actions</span> <br /> Liked
              and Disliked Cards
            </p>
            {likedCards && likedCards.length > 0 ? (
              likedCards.map((card) => {
                const { itemId, ...otherProps } = card;
                console.log("My card", card);
                console.log("Props passed to Cards component", {
                  itemId,
                  ...otherProps,
                });
                return <Cards key={itemId} itemId={itemId} {...otherProps} />;
              })
            ) : (
              <p className="text-gray-800">No liked cards available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListAction;
