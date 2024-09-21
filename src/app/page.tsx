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
    <div
      className={`card-container cursor-pointer shadow-lg relative rounded-lg overflow-hidden ${wAfterScaleDown} ${hAfterScaleDown}`}
      style={{ perspective: "1000px" }} // Enables 3D flip effect
    >
      <motion.div
        onClick={() => setFlipped(!flipped)} // Toggle flip state
        className={`inner-card ${wAfterScaleDown} ${hAfterScaleDown}`}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.8s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", // 3D flip
        }}
      >
        <motion.img
          src={cardFront}
          alt="Card Front"
          className={`absolute ${wAfterScaleDown} ${hAfterScaleDown}`}
          style={{
            backfaceVisibility: "hidden",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: flipped ? 0 : 1 }}
        />

        <motion.img
          src={cardBack}
          alt="Card Back"
          className={`absolute ${wAfterScaleDown} ${hAfterScaleDown}`}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: flipped ? 1 : 0 }}
        />
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