export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  modelPath: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'ai';
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "crowdinsight",
    title: "CrowdInsight",
    description: "ML-powered crowd analysis tool with real-time density visualization and 96.7% accuracy",
    tech: ["PyTorch", "OpenCV", "React", "AWS Lambda"],
    github: "https://github.com/akshatsinha0/CrowdInsight.git",
    modelPath: "/models/project-models/crowd.glb", 
    category: "ai",
    highlights: [
      "Implemented CSRNet architecture for crowd density estimation",
      "Achieved 96.7% accuracy on benchmark datasets",
      "Built real-time visualization dashboard",
      "Deployed on AWS with serverless architecture"
    ]
  },
  {
    slug: "chatbox",
    title: "And? - CHATBOX",
    description: "Advanced conversational AI with contextual understanding and personalized responses",
    tech: ["LangChain", "NextJS", "ChromaDB", "OpenAI"],
    github: "https://github.com/akshatsinha0/And-.git",
    modelPath: "/models/project-models/chatbox.glb",
    category: "ai",
    highlights: [
      "Implemented RAG for enhanced contextual responses",
      "Created personalized user profiles for response tuning",
      "Built user-friendly interface with Next.js",
      "Optimized for mobile responsiveness"
    ]
  },
  {
    slug: "takestakestakes",
    title: "TAKES TAKES TAKES",
    description: "Interactive chess platform with advanced visualization and game analysis features",
    tech: ["React", "Chess.js", "Node.js", "Socket.io"],
    github: "https://github.com/akshatsinha0/takestakestakes-chessified.git",
    modelPath: "/models/project-models/chess.glb",
    category: "frontend",
    highlights: [
      "Built interactive 3D chessboard visualization",
      "Implemented real-time multiplayer capabilities",
      "Added AI opponent with multiple difficulty levels",
      "Created detailed move analysis and suggestion system"
    ]
  },
  {
    slug: "movie-vault",
    title: "Movie Vault",
    description: "Feature-rich movie discovery and recommendation platform with personalized suggestions",
    tech: ["React", "TMDb API", "Express", "MongoDB"],
    github: "https://github.com/akshatsinha0/Movie-Vault.git",
    modelPath: "/models/project-models/movie.glb",
    category: "fullstack",
    highlights: [
      "Integrated with TMDb for comprehensive movie data",
      "Implemented advanced filtering and search capabilities",
      "Created personalized recommendation algorithm",
      "Built responsive design for all device sizes"
    ]
  },
  {
    slug: "arcs-frontend",
    title: "Arcs Frontend",
    description: "Modern web interface for the ARCS 2024 event management system",
    tech: ["React", "Tailwind CSS", "GraphQL", "Firebase"],
    github: "https://github.com/akshatsinha0/arcs24-frontend.git",
    modelPath: "/models/project-models/arcs.glb",
    category: "frontend",
    highlights: [
      "Created responsive event management dashboard",
      "Implemented real-time updates with Firebase",
      "Built interactive schedule visualization",
      "Designed intuitive registration workflow"
    ]
  },
  {
    slug: "coding-club",
    title: "CodingClub VIT Vellore",
    description: "Official website for VIT Vellore's Coding Club with event management and resources",
    tech: ["HTML/CSS", "JavaScript", "Bootstrap", "PHP"],
    github: "https://github.com/akshatsinha0/web-mini-project.git",
    modelPath: "/models/project-models/coding.glb",
    category: "frontend",
    highlights: [
      "Designed modern responsive interface",
      "Implemented event registration system",
      "Created resource library for coding tutorials",
      "Built admin dashboard for content management"
    ]
  },
  {
    slug: "cheat-detect",
    title: "Real Time Cheat Detection Engine",
    description: "AI-powered system to detect academic dishonesty in online examinations",
    tech: ["Python", "TensorFlow", "OpenCV", "Flask"],
    github: "https://github.com/akshatsinha0/CheatDetect.git",
    modelPath: "/models/project-models/cheat.glb",
    category: "ai",
    highlights: [
      "Implemented face recognition for student verification",
      "Created gaze tracking to detect suspicious behavior",
      "Built audio analysis for voice detection",
      "Designed low-latency notification system"
    ]
  },
  {
    slug: "hereiam",
    title: "Here I AM",
    description: "Location-based social networking app with augmented reality features",
    tech: ["React Native", "ARKit/ARCore", "Firebase", "Node.js"],
    github: "https://github.com/akshatsinha0/HereIAm.git",
    modelPath: "/models/project-models/location.glb",
    category: "fullstack",
    highlights: [
      "Implemented precise location tracking",
      "Created AR interfaces for nearby points of interest",
      "Built real-time chat and notification system",
      "Designed intuitive user profiles and connections"
    ]
  }
];
