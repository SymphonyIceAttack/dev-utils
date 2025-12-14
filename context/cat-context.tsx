"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Item types that can be earned from tools
export type CatItemType =
  | "fish" // URL Encoder success
  | "yarn" // JSON Formatter success
  | "book" // Base64 success
  | "keyboard" // Hash Generator success
  | "coffee" // UUID Generator success
  | "cookie" // Color Converter success
  | "qr" // QR Generator success
  | "sparkles" // Regex Tester success
  | "star"; // Special achievements

export type CatMood = "idle" | "happy" | "curious" | "sleepy" | "excited";

interface FallingItem {
  id: string;
  type: CatItemType;
  x: number;
  y: number;
}

interface CatInventory {
  fish: boolean;
  yarn: boolean;
  book: boolean;
  keyboard: boolean;
  coffee: boolean;
  cookie: boolean;
  qr: boolean;
  sparkles: boolean;
  star: boolean;
}

interface CatState {
  mood: CatMood;
  inventory: CatInventory;
  itemsOnGround: FallingItem[];
  isHomeOpen: boolean;
  catPosition: { x: number; y: number };
  isCatDragging: boolean;
}

interface CatContextType extends CatState {
  spawnItem: (type: CatItemType) => void;
  feedCat: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  setMood: (mood: CatMood) => void;
  openHome: () => void;
  closeHome: () => void;
  setCatPosition: (pos: { x: number; y: number }) => void;
  getUnlockedCount: () => number;
  getTotalItems: () => number;
  setIsCatDragging: (dragging: boolean) => void;
}

const defaultInventory: CatInventory = {
  fish: false,
  yarn: false,
  book: false,
  keyboard: false,
  coffee: false,
  cookie: false,
  qr: false,
  sparkles: false,
  star: false,
};

const CatContext = createContext<CatContextType | null>(null);

export function CatProvider({ children }: { children: ReactNode }) {
  const [mood, setMoodState] = useState<CatMood>("idle");
  const [inventory, setInventory] = useState<CatInventory>(defaultInventory);
  const [itemsOnGround, setItemsOnGround] = useState<FallingItem[]>([]);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [isCatDragging, setIsCatDragging] = useState(false);

  // Load inventory from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cat-inventory");
    if (saved) {
      try {
        setInventory(JSON.parse(saved));
      } catch {
        console.error("Failed to load cat inventory");
      }
    }
  }, []);

  // Save inventory to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cat-inventory", JSON.stringify(inventory));
  }, [inventory]);

  const spawnItem = useCallback((type: CatItemType) => {
    const id = `${type}-${Date.now()}`;
    const x = Math.random() * 60 + 20; // 20-80% of screen width
    setItemsOnGround((prev) => [...prev, { id, type, x, y: -50 }]);
  }, []);

  const feedCat = useCallback((itemId: string) => {
    // 通过setItemsOnGround的回调函数来同时更新inventory和移除物品
    setItemsOnGround((prevItems) => {
      const item = prevItems.find((i) => i.id === itemId);
      if (item) {
        // 更新inventory
        setInventory((prev) => ({ ...prev, [item.type]: true }));
        // 移除物品
        return prevItems.filter((i) => i.id !== itemId);
      }
      return prevItems;
    });
    // Make cat happy
    setMoodState("happy");
    // Reset mood after delay
    setTimeout(() => setMoodState("idle"), 3000);
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItemsOnGround((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const setMood = useCallback((newMood: CatMood) => {
    setMoodState(newMood);
  }, []);

  const openHome = useCallback(() => {
    setIsHomeOpen(true);
  }, []);

  const closeHome = useCallback(() => {
    setIsHomeOpen(false);
  }, []);

  const getUnlockedCount = useCallback(() => {
    return Object.values(inventory).filter(Boolean).length;
  }, [inventory]);

  const getTotalItems = useCallback(() => {
    return Object.keys(inventory).length;
  }, [inventory]);

  return (
    <CatContext.Provider
      value={{
        mood,
        inventory,
        itemsOnGround,
        isHomeOpen,
        catPosition,
        isCatDragging,
        spawnItem,
        feedCat,
        removeItem,
        setMood,
        openHome,
        closeHome,
        setCatPosition,
        getUnlockedCount,
        getTotalItems,
        setIsCatDragging,
      }}
    >
      {children}
    </CatContext.Provider>
  );
}

export function useCat() {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error("useCat must be used within a CatProvider");
  }
  return context;
}
