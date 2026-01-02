"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ============================================================================
// Item Registry - Single source of truth for all items
// To add a new item: just add it to this array
// ============================================================================
export const CAT_ITEMS = [
  { id: "fish", emoji: "🐟", tool: "URL Encoder" },
  { id: "yarn", emoji: "🧶", tool: "Encoding Converter" },
  { id: "book", emoji: "📖", tool: "Base64 Encoder" },
  { id: "keyboard", emoji: "⌨", tool: "MD5 Generator" },
  { id: "coffee", emoji: "☕", tool: "UUID Generator" },
  { id: "sparkles", emoji: "✨", tool: "Password Generator" },
  { id: "binary", emoji: "💠", tool: "Binary Code Translator" },
] as const;

// Derive types from the registry
export type CatItemType = (typeof CAT_ITEMS)[number]["id"];
export type CatInventory = Record<CatItemType, boolean>;

// Storage version for future migrations
const STORAGE_VERSION = 1;
const STORAGE_KEY = "cat-inventory-v1";

interface StoredData {
  version: number;
  inventory: Partial<Record<string, boolean>>;
}

// Generate default inventory from registry
function createDefaultInventory(): CatInventory {
  return CAT_ITEMS.reduce(
    (acc, item) => {
      acc[item.id] = false;
      return acc;
    },
    {} as Record<CatItemType, boolean>,
  );
}

// Load inventory with migration support
function loadInventory(): CatInventory {
  const defaultInventory = createDefaultInventory();

  try {
    // Try new format first
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data: StoredData = JSON.parse(saved);
      if (data.version === STORAGE_VERSION && data.inventory) {
        return { ...defaultInventory, ...data.inventory };
      }
    }

    // Migrate from old format
    const oldSaved = localStorage.getItem("cat-inventory");
    if (oldSaved) {
      const oldData = JSON.parse(oldSaved);
      localStorage.removeItem("cat-inventory");
      return { ...defaultInventory, ...oldData };
    }
  } catch {
    console.error("Failed to load cat inventory");
  }

  return defaultInventory;
}

// Save inventory
function saveInventory(inventory: CatInventory): void {
  const data: StoredData = {
    version: STORAGE_VERSION,
    inventory,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ============================================================================
// Context Types
// ============================================================================
export type CatMood = "idle" | "happy" | "curious" | "sleepy" | "excited";

interface FallingItem {
  id: string;
  type: CatItemType;
  x: number;
  y: number;
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
  getItemInfo: (id: CatItemType) => (typeof CAT_ITEMS)[number] | undefined;
}

// ============================================================================
// Context Provider
// ============================================================================
const CatContext = createContext<CatContextType | null>(null);

export function CatProvider({ children }: { children: ReactNode }) {
  const [mood, setMoodState] = useState<CatMood>("idle");
  const [inventory, setInventory] = useState<CatInventory>(
    createDefaultInventory,
  );
  const [itemsOnGround, setItemsOnGround] = useState<FallingItem[]>([]);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [isCatDragging, setIsCatDragging] = useState(false);

  // Load inventory from localStorage on mount
  useEffect(() => {
    setInventory(loadInventory());
  }, []);

  // Save inventory to localStorage when it changes
  useEffect(() => {
    saveInventory(inventory);
  }, [inventory]);

  const spawnItem = useCallback((type: CatItemType) => {
    const id = `${type}-${Date.now()}`;
    const x = Math.random() * 60 + 20;
    setItemsOnGround((prev) => [...prev, { id, type, x, y: -50 }]);
  }, []);

  const feedCat = useCallback((itemId: string) => {
    setItemsOnGround((prevItems) => {
      const item = prevItems.find((i) => i.id === itemId);
      if (item) {
        setInventory((prev) => ({ ...prev, [item.type]: true }));
        return prevItems.filter((i) => i.id !== itemId);
      }
      return prevItems;
    });
    setMoodState("happy");
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
    return CAT_ITEMS.length;
  }, []);

  const getItemInfo = useCallback((id: CatItemType) => {
    return CAT_ITEMS.find((item) => item.id === id);
  }, []);

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
        getItemInfo,
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
