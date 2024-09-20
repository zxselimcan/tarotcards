"use client";
import { useEffect, useState } from "react";
import CardsJSON from "./cards.json";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const TarotCard = ({ card }: { card: string }) => {
  const [flipped, setFlipped] = useState(true);

  const cardFront = `/cards/${card}.jpg`;
  const cardBack = `/cards/card-back.jpg`;

  const wAfterScaleDown = `w-[calc(350px/4.2)]`;
  const hAfterScaleDown = `h-[calc(600px/4.2)]`;

  return (
    <div className={`card-container shadow-lg relative rounded-lg overflow-hidden ${wAfterScaleDown} ${hAfterScaleDown} `}>
      <motion.div
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        onClick={() => setFlipped(false)}
        className={`card ${flipped ? 'flipped' : ''} ${wAfterScaleDown} ${hAfterScaleDown}`}
      >
        <div
          className={`card-face card-front ${wAfterScaleDown} ${hAfterScaleDown}`}
          style={{ backgroundImage: `url(${cardFront}) ` }}
        ></div>
        <div
          className={`card-face card-back ${wAfterScaleDown} ${hAfterScaleDown}`}
          style={{ backgroundImage: `url(${cardBack})` }}
        ></div>
      </motion.div>
    </div>
  );
};


const Page = () => {

  const [cards, setCards] = useState<string[]>([])

  useEffect(() => {

    const shuffle = (array: string[]): string[] => {
      let currentIndex = array.length;
      while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    }

    let cardsShuffled = [...CardsJSON];

    for (let i = 0; i < 22; i++) {
      cardsShuffled = shuffle(cardsShuffled);
    }
    setCards(cardsShuffled);

    return () => {
    }
  }, []);

  return (
    <div>
      <div className="my-4 flex justify-center gap-4">
        <Button
          variant={"destructive"}
          onClick={() => {
            window.location.reload();
          }}
        >
          Tekrar Karıştır
        </Button>
      </div>
      <div className="flex flex-wrap justify-center items-start gap-2 mt-2">
        {
          cards.length > 0 && cards.map((card) => <TarotCard key={card} card={card} />)
        }
      </div>

    </div>
  )
}

export default Page;