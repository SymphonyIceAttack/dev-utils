"use client";

import { AnimatePresence } from "framer-motion";
import { useCat } from "@/context/cat-context";
import { CatHomeModal } from "./cat-home-modal";
import { CatMascot } from "./cat-mascot";
import { FallingItem } from "./falling-item";

export function CatSystem() {
  const { itemsOnGround } = useCat();

  return (
    <>
      {/* Falling items */}
      <AnimatePresence>
        {itemsOnGround.map((item) => (
          <FallingItem
            key={item.id}
            id={item.id}
            type={item.type}
            initialX={item.x}
          />
        ))}
      </AnimatePresence>

      {/* Cat mascot */}
      <CatMascot />

      {/* Cat home modal */}
      <CatHomeModal />
    </>
  );
}
