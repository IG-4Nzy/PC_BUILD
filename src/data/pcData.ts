import { PcBuild, PcComponent, PcPurpose } from "../context/AppContext";

// PC Components Data
export const cpus: PcComponent[] = [
  {
    id: "cpu-1",
    name: "Ryzen 7 5800X",
    brand: "AMD",
    price: 349.99,
    rating: 4.8,
    image: "https://placehold.co/300x300/6C63FF/FFFFFF?text=Ryzen+7",
    description: "8-core, 16-thread processor with high gaming performance.",
  },
  {
    id: "cpu-2",
    name: "Core i7-12700K",
    brand: "Intel",
    price: 399.99,
    rating: 4.7,
    image: "https://placehold.co/300x300/3F8CFF/FFFFFF?text=Core+i7",
    description: "12-core (8P+4E) processor with excellent multi-threading performance.",
  },
  {
    id: "cpu-3",
    name: "Ryzen 5 5600X",
    brand: "AMD",
    price: 219.99,
    rating: 4.6,
    image: "https://placehold.co/300x300/6C63FF/FFFFFF?text=Ryzen+5",
    description: "6-core, 12-thread processor with great gaming value.",
  },
  {
    id: "cpu-4",
    name: "Core i9-12900K",
    brand: "Intel",
    price: 599.99,
    rating: 4.9,
    image: "https://placehold.co/300x300/3F8CFF/FFFFFF?text=Core+i9",
    description: "16-core (8P+8E) processor for extreme performance needs.",
  },
  {
    id: "cpu-5",
    name: "Ryzen 9 5950X",
    brand: "AMD",
    price: 549.99,
    rating: 4.9,
    image: "https://placehold.co/300x300/6C63FF/FFFFFF?text=Ryzen+9",
    description: "16-core, 32-thread processor for high-end workstations.",
  },
];

export const gpus: PcComponent[] = [
  {
    id: "gpu-1",
    name: "RTX 3070",
    brand: "NVIDIA",
    price: 599.99,
    rating: 4.7,
    image: "https://placehold.co/300x300/76B900/FFFFFF?text=RTX+3070",
    description: "Excellent 1440p and entry 4K gaming performance.",
  },
  {
    id: "gpu-2",
    name: "RX 6800 XT",
    brand: "AMD",
    price: 649.99,
    rating: 4.6,
    image: "https://placehold.co/300x300/ED1C24/FFFFFF?text=RX+6800XT",
    description: "High-performance graphics card for 4K gaming.",
  },
  {
    id: "gpu-3",
    name: "RTX 3080",
    brand: "NVIDIA",
    price: 799.99,
    rating: 4.8,
    image: "https://placehold.co/300x300/76B900/FFFFFF?text=RTX+3080",
    description: "High-end graphics card for 4K gaming and content creation.",
  },
  {
    id: "gpu-4",
    name: "RTX 3060",
    brand: "NVIDIA",
    price: 399.99,
    rating: 4.5,
    image: "https://placehold.co/300x300/76B900/FFFFFF?text=RTX+3060",
    description: "Great value for 1080p and 1440p gaming.",
  },
  {
    id: "gpu-5",
    name: "RX 6600 XT",
    brand: "AMD",
    price: 379.99,
    rating: 4.4,
    image: "https://placehold.co/300x300/ED1C24/FFFFFF?text=RX+6600XT",
    description: "Solid 1080p gaming performance with good value.",
  },
];

export const rams: PcComponent[] = [
  {
    id: "ram-1",
    name: "Corsair Vengeance RGB Pro 32GB",
    brand: "Corsair",
    price: 159.99,
    rating: 4.8,
    image: "https://placehold.co/300x300/FFCC00/000000?text=32GB+RAM",
    description: "32GB (2x16GB) DDR4-3600 with RGB lighting.",
  },
  {
    id: "ram-2",
    name: "G.Skill Trident Z RGB 16GB",
    brand: "G.Skill",
    price: 109.99,
    rating: 4.7,
    image: "https://placehold.co/300x300/FFCC00/000000?text=16GB+RAM",
    description: "16GB (2x8GB) DDR4-3200 with RGB lighting.",
  },
  {
    id: "ram-3",
    name: "Kingston Fury 64GB",
    brand: "Kingston",
    price: 299.99,
    rating: 4.9,
    image: "https://placehold.co/300x300/FFCC00/000000?text=64GB+RAM",
    description: "64GB (2x32GB) DDR4-3600 high-capacity memory.",
  },
];

export const storages: PcComponent[] = [
  {
    id: "storage-1",
    name: "Samsung 970 EVO Plus 1TB",
    brand: "Samsung",
    price: 149.99,
    rating: 4.9,
    image: "https://placehold.co/300x300/1428A0/FFFFFF?text=1TB+SSD",
    description: "1TB NVMe M.2 SSD with high read/write speeds.",
  },
  {
    id: "storage-2",
    name: "WD Black SN850 2TB",
    brand: "Western Digital",
    price: 299.99,
    rating: 4.8,
    image: "https://placehold.co/300x300/1428A0/FFFFFF?text=2TB+SSD",
    description: "2TB PCIe Gen4 NVMe SSD for maximum performance.",
  },
  {
    id: "storage-3",
    name: "Crucial MX500 1TB",
    brand: "Crucial",
    price: 89.99,
    rating: 4.7,
    image: "https://placehold.co/300x300/1428A0/FFFFFF?text=1TB+SATA",
    description: "1TB SATA SSD with good value for secondary storage.",
  },
];

export const motherboards: PcComponent[] = [
  {
    id: "mb-1",
    name: "ASUS ROG Strix B550-F",
    brand: "ASUS",
    price: 189.99,
    rating: 4.7,
    image: "https://placehold.co/300x300/000000/FFFFFF?text=B550+MB",
    description: "ATX motherboard with good features and connectivity.",
  },
  {
    id: "mb-2",
    name: "MSI MAG Z690 Tomahawk",
    brand: "MSI",
    price: 259.99,
    rating: 4.8,
    image: "https://placehold.co/300x300/000000/FFFFFF?text=Z690+MB",
    description: "High-performance ATX motherboard for Intel 12th gen.",
  },
  {
    id: "mb-3",
    name: "GIGABYTE B660M DS3H",
    brand: "GIGABYTE",
    price: 119.99,
    rating: 4.5,
    image: "https://placehold.co/300x300/000000/FFFFFF?text=B660M+MB",
    description: "Micro-ATX motherboard with essential features.",
  },
];

export const psus: PcComponent[] = [
  {
    id: "psu-1",
    name: "Corsair RM750x",
    brand: "Corsair",
    price: 129.99,
    rating: 4.8,
    image: "https://placehold.co/300x300/333333/FFFFFF?text=750W+PSU",
    description: "750W 80+ Gold fully modular power supply.",
  },
  {
    id: "psu-2",
    name: "EVGA SuperNOVA 850 G5",
    brand: "EVGA",
    price: 149.99,
    rating: 4.7,
    image: "https://placehold.co/300x300/333333/FFFFFF?text=850W+PSU",
    description: "850W 80+ Gold fully modular power supply.",
  },
  {
    id: "psu-3",
    name: "be quiet! Straight Power 11 1000W",
    brand: "be quiet!",
    price: 199.99,
    rating: 4.9,
    image: "https://placehold.co/300x300/333333/FFFFFF?text=1000W+PSU",
    description: "1000W 80+ Platinum fully modular power supply.",
  },
];

export const cases: PcComponent[] = [
  {
    id: "case-1",
    name: "Fractal Design Meshify C",
    brand: "Fractal Design",
    price: 89.99,
    rating: 4.8,
    image: "https://placehold.co/300x300/607D8B/FFFFFF?text=Meshify+C",
    description: "Mid-tower case with excellent airflow and clean design.",
  },
  {
    id: "case-2",
    name: "NZXT H510",
    brand: "NZXT",
    price: 79.99,
    rating: 4.7,
    image: "https://placehold.co/300x300/607D8B/FFFFFF?text=H510",
    description: "Mid-tower case with minimalist design and good cable management.",
  },
  {
    id: "case-3",
    name: "Corsair 4000D Airflow",
    brand: "Corsair",
    price: 94.99,
    rating: 4.8,
    image: "https://placehold.co/300x300/607D8B/FFFFFF?text=4000D",
    description: "Mid-tower case optimized for high airflow.",
  },
];

export const coolings: PcComponent[] = [
  {
    id: "cooling-1",
    name: "Noctua NH-D15",
    brand: "Noctua",
    price: 99.99,
    rating: 4.9,
    image: "https://placehold.co/300x300/A0522D/FFFFFF?text=NH-D15",
    description: "High-performance dual-tower air cooler.",
  },
  {
    id: "cooling-2",
    name: "NZXT Kraken X63",
    brand: "NZXT",
    price: 149.99,
    rating: 4.7,
    image: "https://placehold.co/300x300/A0522D/FFFFFF?text=Kraken+X63",
    description: "280mm AIO liquid cooler with RGB pump head.",
  },
  {
    id: "cooling-3",
    name: "Corsair H150i Elite Capellix",
    brand: "Corsair",
    price: 189.99,
    rating: 4.8,
    image: "https://placehold.co/300x300/A0522D/FFFFFF?text=H150i",
    description: "360mm AIO liquid cooler with RGB fans and pump.",
  },
];

// PC Builds Data
export const pcBuilds: PcBuild[] = [
  {
    id: "build-1",
    name: "Ultimate Gaming Rig",
    purpose: ["gaming", "streaming"] as PcPurpose[],
    price: 2499.99,
    rating: 4.9,
    image: "https://placehold.co/800x600/6C63FF/FFFFFF?text=Gaming+PC",
    components: {
      cpu: cpus[3], // Core i9-12900K
      gpu: gpus[2], // RTX 3080
      ram: rams[0], // Corsair 32GB
      storage: storages[1], // WD Black 2TB
      motherboard: motherboards[1], // MSI Z690
      psu: psus[2], // 1000W PSU
      case: cases[2], // Corsair 4000D
      cooling: coolings[2], // Corsair H150i
    },
    description: "A high-end gaming PC capable of running the latest AAA titles at 4K resolution with high frame rates. Also excellent for streaming and content creation.",
    performanceScore: 95,
  },
  {
    id: "build-2",
    name: "Creative Pro Workstation",
    purpose: ["video-editing", "3d-modeling"],
    price: 2199.99,
    rating: 4.8,
    image: "https://placehold.co/800x600/3F8CFF/FFFFFF?text=Workstation+PC",
    components: {
      cpu: cpus[4], // Ryzen 9 5950X
      gpu: gpus[2], // RTX 3080
      ram: rams[2], // Kingston 64GB
      storage: storages[1], // WD Black 2TB
      motherboard: motherboards[0], // ASUS B550
      psu: psus[1], // 850W PSU
      case: cases[0], // Meshify C
      cooling: coolings[1], // NZXT Kraken
    },
    description: "A powerful workstation optimized for video editing, 3D modeling, and other creative professional tasks. Features high multi-threaded performance and ample RAM.",
    performanceScore: 92,
  },
  {
    id: "build-3",
    name: "Mid-Range Gaming PC",
    purpose: ["gaming", "programming"],
    price: 1399.99,
    rating: 4.7,
    image: "https://placehold.co/800x600/00E5FF/FFFFFF?text=Mid-Range+PC",
    components: {
      cpu: cpus[0], // Ryzen 7 5800X
      gpu: gpus[0], // RTX 3070
      ram: rams[1], // G.Skill 16GB
      storage: storages[0], // Samsung 970 1TB
      motherboard: motherboards[0], // ASUS B550
      psu: psus[0], // 750W PSU
      case: cases[1], // NZXT H510
      cooling: coolings[0], // Noctua
    },
    description: "A balanced gaming PC that provides excellent performance at 1440p resolution. Great for most modern games and productivity tasks.",
    performanceScore: 85,
  },
  {
    id: "build-4",
    name: "Budget Gaming PC",
    purpose: ["gaming", "everyday-use"],
    price: 899.99,
    rating: 4.5,
    image: "https://placehold.co/800x600/607D8B/FFFFFF?text=Budget+PC",
    components: {
      cpu: cpus[2], // Ryzen 5 5600X
      gpu: gpus[4], // RX 6600 XT
      ram: rams[1], // G.Skill 16GB
      storage: storages[2], // Crucial 1TB
      motherboard: motherboards[2], // GIGABYTE B660M
      psu: psus[0], // 750W PSU
      case: cases[1], // NZXT H510
      cooling: coolings[0], // Noctua
    },
    description: "An affordable gaming PC that can handle most games at 1080p with high settings. Also suitable for everyday tasks and light productivity.",
    performanceScore: 75,
  },
  {
    id: "build-5",
    name: "Developer Workstation",
    purpose: ["programming", "everyday-use"],
    price: 1699.99,
    rating: 4.6,
    image: "https://placehold.co/800x600/2C3E50/FFFFFF?text=Dev+PC",
    components: {
      cpu: cpus[1], // Core i7-12700K
      gpu: gpus[3], // RTX 3060
      ram: rams[0], // Corsair 32GB
      storage: storages[0], // Samsung 970 1TB
      motherboard: motherboards[1], // MSI Z690
      psu: psus[0], // 750W PSU
      case: cases[0], // Meshify C
      cooling: coolings[1], // NZXT Kraken
    },
    description: "A powerful PC optimized for software development with fast compile times and smooth multitasking. Great for running multiple VMs and containers.",
    performanceScore: 88,
  },
];

// Helper function to filter builds by purpose
export const getRecommendedBuilds = (purpose: PcPurpose, priceRange: [number, number]): PcBuild[] => {
  return pcBuilds.filter(
    (build) =>
      build.purpose.includes(purpose) &&
      build.price >= priceRange[0] &&
      build.price <= priceRange[1]
  );
};

// Helper function to get build by ID
export const getBuildById = (id: string | undefined): PcBuild | undefined => {
  return pcBuilds.find((build) => build.id === id);
};

// Helper function to get component options by type
export const getComponentsByType = (type: string) => {
  switch (type) {
    case 'cpu':
      return cpus;
    case 'gpu':
      return gpus;
    case 'ram':
      return rams;
    case 'storage':
      return storages;
    case 'motherboard':
      return motherboards;
    case 'psu':
      return psus;
    case 'case':
      return cases;
    case 'cooling':
      return coolings;
    default:
      return [];
  }
};

// Chatbot response data for common questions
export const chatbotResponses = {
  greeting: "Hello! I'm your PC building assistant. How can I help you today?",
  fallback: "I'm not sure I understand. Could you please rephrase your question?",
  components: {
    cpu: "The CPU (Central Processing Unit) is the 'brain' of your computer. It executes instructions and processes data. For gaming, consider at least a 6-core processor. For content creation, more cores are beneficial.",
    gpu: "The GPU (Graphics Processing Unit) handles rendering images, videos, and animations. It's crucial for gaming performance and certain professional applications like video editing and 3D modeling.",
    ram: "RAM (Random Access Memory) provides temporary storage for data that active programs need. For gaming, 16GB is recommended. For content creation or heavy multitasking, consider 32GB or more.",
    storage: "Storage devices like SSDs (Solid State Drives) store your operating system, programs, and files. SSDs are much faster than traditional HDDs and provide better overall system responsiveness.",
    motherboard: "The motherboard connects all your components together. Ensure it's compatible with your CPU and has all the features and expansion slots you need.",
    psu: "The PSU (Power Supply Unit) provides power to all your components. Always choose a reliable PSU with sufficient wattage for your system.",
    cooling: "Cooling solutions prevent your CPU and other components from overheating. Options include air coolers and liquid cooling systems.",
  },
  purposes: {
    gaming: "For gaming PCs, prioritize a strong GPU and a capable CPU. 16GB of RAM is typically sufficient, and an SSD for faster load times is highly recommended.",
    "video-editing": "Video editing benefits from a powerful CPU with many cores, plenty of RAM (32GB+), a decent GPU, and fast storage with large capacity.",
    programming: "Programming benefits from a multi-core CPU, at least 16GB of RAM for running VMs or containers, and fast SSD storage for quick compile times.",
    "3d-modeling": "3D modeling and rendering require a powerful GPU, a high-core-count CPU, and plenty of RAM (32GB+).",
    "everyday-use": "For everyday computing, a mid-range CPU, 8-16GB of RAM, and an SSD will provide a smooth experience for web browsing, office work, and light entertainment.",
  },
};
