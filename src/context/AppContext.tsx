
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PcPurpose = 
  | 'gaming' 
  | 'video-editing' 
  | 'programming' 
  | '3d-modeling' 
  | 'everyday-use' 
  | 'streaming'
  | 'other';

export type PcComponent = {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
  description: string;
};

export type PcBuild = {
  id: string;
  name: string;
  purpose: PcPurpose[];
  price: number;
  rating: number;
  image: string;
  components: {
    cpu: PcComponent;
    gpu: PcComponent;
    ram: PcComponent;
    storage: PcComponent;
    motherboard: PcComponent;
    psu: PcComponent;
    case: PcComponent;
    cooling: PcComponent;
  };
  description: string;
  performanceScore: number;
};

export type CustomBuildComponents = {
  cpu: PcComponent | null;
  gpu: PcComponent | null;
  ram: PcComponent | null;
  storage: PcComponent | null;
  motherboard: PcComponent | null;
  psu: PcComponent | null;
  case: PcComponent | null;
  cooling: PcComponent | null;
};

export type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type AppContextType = {
  selectedPurpose: PcPurpose | null;
  setSelectedPurpose: (purpose: PcPurpose) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedBuild: PcBuild | null;
  setSelectedBuild: (build: PcBuild | null) => void;
  customBuild: CustomBuildComponents;
  setCustomBuild: (build: CustomBuildComponents) => void;
  updateCustomComponent: (type: keyof CustomBuildComponents, component: PcComponent) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChatMessages: () => void;
  finalBuild: PcBuild | null;
  setFinalBuild: (build: PcBuild | null) => void;
  isCustomBuild: boolean;
  setIsCustomBuild: (isCustom: boolean) => void;
};

const defaultCustomBuild: CustomBuildComponents = {
  cpu: null,
  gpu: null,
  ram: null,
  storage: null,
  motherboard: null,
  psu: null,
  case: null,
  cooling: null,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPurpose, setSelectedPurpose] = useState<PcPurpose | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 3000]);
  const [selectedBuild, setSelectedBuild] = useState<PcBuild | null>(null);
  const [customBuild, setCustomBuild] = useState<CustomBuildComponents>(defaultCustomBuild);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [finalBuild, setFinalBuild] = useState<PcBuild | null>(null);
  const [isCustomBuild, setIsCustomBuild] = useState(false);

  const updateCustomComponent = (type: keyof CustomBuildComponents, component: PcComponent) => {
    setCustomBuild(prev => ({
      ...prev,
      [type]: component
    }));
  };

  const addChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const clearChatMessages = () => {
    setChatMessages([]);
  };

  const value = {
    selectedPurpose,
    setSelectedPurpose,
    priceRange,
    setPriceRange,
    selectedBuild,
    setSelectedBuild,
    customBuild,
    setCustomBuild,
    updateCustomComponent,
    chatMessages,
    addChatMessage,
    clearChatMessages,
    finalBuild,
    setFinalBuild,
    isCustomBuild,
    setIsCustomBuild
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
