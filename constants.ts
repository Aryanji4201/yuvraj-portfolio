
import type { Subject } from './types';

export const portfolioData = {
  name: "Yuvraj Singh",
  tagline: "Cinematographer | Visual Storyteller | Lighting & Camera Enthusiast",
  about: {
    title: "Who I Am",
    description: [
      "I am a dedicated visual storyteller with a strong focus on cinematography as my primary medium. Through evolving expertise in camera operation, lighting design, and post-production workflows, I strive to create imagery that carries emotional resonance and narrative clarity. My work is driven by a deep appreciation for visual language and an understanding of how composition, color, and movement shape the viewer's experience.",
      "My creative approach blends technical precision with artistic intention, ensuring that every frame contributes meaningfully to the story being told. I value collaboration, exploration, and continuous learning, allowing each project to challenge and strengthen my craft. As I progress in my journey, I aim to produce cinematic work that not only engages audiences but also leaves a lasting visual and emotional impact."
    ]
  },
  skills: {
    title: "What I Do",
    description: "Through the lens, I do more than capture images — I craft experiences. By combining technical mastery with a refined artistic vision, I translate ideas into visuals that communicate with clarity and impact. My experience spans fashion campaigns, branded content, real estate productions, educational films, and fitness storytelling, with each project offering an opportunity to shape a distinctive visual narrative that resonates with both the brand and its audience.",
    services: [
      { title: "Cinematography", description: "Crafting visual narratives through expert camera work and composition" },
      { title: "Lighting Design", description: "Creating mood and atmosphere through strategic lighting setups" },
      { title: "Pre-Production", description: "Planning and visualization to ensure seamless execution" },
      { title: "Photography", description: "Capturing compelling stills with cinematic quality" },
      { title: "Video Editing", description: "Post-production expertise to enhance visual storytelling" },
      { title: "Visual Storytelling", description: "Translating concepts into engaging visual experiences" }
    ]
  },
  projects: [
    {
      id: 1,
      title: "Fashion Shoot – Outdoor Editorial Campaign",
      role: "Director of Photography",
      clientType: "Independent Client",
      clientDetails: [
        "Natural light adaptation",
        "Cinematic outdoor framing",
        "Brand identity collaboration"
      ],
      roleDescription: "Leading visual style from concept to execution, designing lighting setups for outdoor environment, managing camera operation and framing compositions that highlighted the fashion narrative.",
      links: [{ label: "View Project", url: "#" }]
    },
    {
      id: 2,
      title: "Music Video – Udd Raha Hu Main",
      role: "Director of Photography",
      clientType: "Team Project",
      clientDetails: [
        "Visual direction",
        "Rhythm-emotion alignment",
        "Cohesive visual style"
      ],
      roleDescription: "Shaping visual language, designing lighting schemes, selecting camera angles, and creating dynamic movements that matched the energy and rhythm of the track.",
      links: [{ label: "View Project", url: "#" }]
    },
    {
        id: 3,
        title: "Intense Scene Sequence",
        role: "Director of Photography",
        clientType: "Team Project",
        clientDetails: [
            "Dramatic lighting",
            "Emotional tension capture",
            "Controlled camera movement"
        ],
        roleDescription: "Capturing emotional depth through dramatic lighting setups, close deliberate compositions, and controlled camera movements to heighten raw emotions.",
        links: [{ label: "View Project", url: "#" }]
    },
    {
        id: 4,
        title: "Real Estate – MI CASA Luxury Apartment",
        role: "Director of Photography",
        clientType: "Team Project",
        clientDetails: [
            "Architectural elegance",
            "Premium interior showcase",
            "Luxury branding alignment"
        ],
        roleDescription: "Visually presenting luxury apartment highlighting architectural elegance and premium interiors through enhanced lighting and sophisticated camera movements.",
        links: [{ label: "View Project", url: "#" }]
    },
    {
        id: 5,
        title: "Music Video – Aaj Phir Tumpe",
        role: "Director of Photography & Lighting Designer",
        clientType: "Team Project",
        clientDetails: [
            "Romantic atmosphere",
            "Dual role expertise",
            "Emotional depth"
        ],
        roleDescription: "Dual role shaping visual language and emotional tone, designing romantic atmosphere with balanced natural and artificial lighting sources.",
        links: [{ label: "View Project", url: "#" }]
    },
    {
        id: 6,
        title: "Commercial – Cult Gym",
        role: "Director of Photography",
        clientType: "Independent Project",
        clientDetails: [
            "Independent execution",
            "Dynamic energy capture",
            "Intensity emphasis"
        ],
        roleDescription: "Independent cinematography and lighting design, emphasizing intensity and depth while capturing dynamic movement and energy.",
        links: [
            { label: "View Project", url: "#" }
        ]
    },
    {
        id: 7,
        title: "Music Video – Deva Shree Ganesha",
        role: "Director of Photography",
        clientType: "Independent Project",
        clientDetails: [
            "High-budget production",
            "Large-scale handling",
            "Performance emphasis"
        ],
        roleDescription: "High-budget music video cinematography, translating director's vision into dynamic visual narrative with emphasis on performance and rhythm.",
        links: [{ label: "View Project", url: "#" }]
    },
    {
        id: 8,
        title: "Short Film – The Final Swipe",
        role: "Director of Photography & Gaffer",
        clientType: "Independent Project",
        clientDetails: [
            "Dual role integration",
            "Narrative flow",
            "Dramatic lighting"
        ],
        roleDescription: "Dual role integrating cinematography with lighting design, creating visually impactful narrative with mood-driven dramatic effects.",
        links: [{ label: "View Project", url: "#" }]
    },
    {
        id: 9,
        title: "Event Coverage – Matecia Exhibition",
        role: "Videographer",
        clientType: "Square One Collaboration",
        clientDetails: [
            "Real-time adaptability",
            "Brand alignment",
            "Dynamic atmosphere capture"
        ],
        roleDescription: "Real-time event coverage capturing key moments, interactions, and overall environment with adaptability and quick decision-making.",
        links: [{ label: "View Project", url: "#" }]
    }
  ],
  contact: {
    title: "Let's Connect",
    email: "yuvrajsingh312004@gmail.com",
    phone: "+91 9599780618",
    cv: {
      label: "Download CV",
      url: "https://pdflink.to/8e79a3ad/"
    }
  }
};

export const ALL_SUBJECTS: { [key: number]: string[] } = {
    2: ["English", "Mathematics", "Environmental Science"],
    3: ["English", "Mathematics", "Environmental Science"],
    4: ["English", "Mathematics", "Environmental Science"],
    5: ["English", "Mathematics", "Environmental Science"],
    6: ["English", "Mathematics", "Science", "Social Studies"],
    7: ["English", "Mathematics", "Science", "Social Studies"],
    8: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography"],
    9: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography"],
    10: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography"],
};

export const SUBJECT_DATA: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: 'Calculator',
    chapters: [
      { id: 'm1', title: 'Numbers and Operations', hasVideo: true, hasNotes: true, hasTest: true },
      { id: 'm2', title: 'Algebra', hasVideo: true, hasNotes: true, hasTest: false },
      { id: 'm3', title: 'Geometry', hasVideo: false, hasNotes: true, hasTest: true },
    ],
  },
  {
    id: 'science',
    name: 'Science',
    icon: 'Beaker',
    chapters: [
      { id: 's1', title: 'Living Things', hasVideo: true, hasNotes: true, hasTest: true },
      { id: 's2', title: 'Matter and Materials', hasVideo: true, hasNotes: true, hasTest: true },
      { id: 's3', title: 'Forces and Energy', hasVideo: true, hasNotes: true, hasTest: true },
    ],
  },
  {
    id: 'english',
    name: 'English',
    icon: 'BookOpen',
    chapters: [
        { id: 'e1', title: 'Grammar Basics', hasVideo: true, hasNotes: true, hasTest: true },
        { id: 'e2', title: 'Reading Comprehension', hasVideo: false, hasNotes: true, hasTest: true },
    ],
  },
  {
    id: 'social',
    name: 'Social Studies',
    icon: 'Globe',
    chapters: [
        { id: 'ss1', title: 'Our Country', hasVideo: true, hasNotes: true, hasTest: true },
        { id: 'ss2', title: 'World History', hasVideo: true, hasNotes: false, hasTest: true },
    ],
  },
    {
    id: 'physics',
    name: 'Physics',
    icon: 'Scale',
    chapters: [
        { id: 'p1', title: 'Laws of Motion', hasVideo: true, hasNotes: true, hasTest: true },
        { id: 'p2', title: 'Light and Optics', hasVideo: true, hasNotes: false, hasTest: true },
    ],
  },
];
