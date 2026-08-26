export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogArticle = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  filterCategory: string;
  date: string;
  image: string;
  content?: ArticleSection[];
};

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    slug: "the-beginning-of-our-journey",
    title: "The Beginning of Our Journey",
    excerpt:
      "A story about beginnings, memories, and the moments that brought 7ICONS and ICONIA together.",
    category: "Story",
    filterCategory: "Story",
    date: "August 26, 2026",
    image: "/blog/blog-journey.png",
    content: [
      {
        paragraphs: [
          "Every journey begins with a moment worth remembering. Some beginnings arrive quietly, while others grow through shared stories, memories, and the people who choose to experience them together.",
          "For 7ICONS and ICONIA, the journey is about more than looking back. It is also about preserving moments, celebrating connections, and creating a digital space where those stories can continue to live.",
        ],
      },
      {
        heading: "Where the Story Begins",
        paragraphs: [
          "The beginning of a journey often becomes more meaningful with time. Small moments can eventually become memories that represent an entire era, especially when they are shared by a community.",
          "This website was created with that idea in mind: bringing stories, articles, member information, archives, and the ICONIA community together in one place.",
        ],
      },
      {
        heading: "Stories Worth Remembering",
        paragraphs: [
          "Music, performances, friendships, community activities, and personal memories can all become part of a larger story. Each one may feel small on its own, but together they form something much bigger.",
          "Through articles and future archive features, these moments can be collected and presented in a way that remains easy to explore for both longtime ICONIA and people discovering the story for the first time.",
        ],
      },
      {
        heading: "Growing Together",
        paragraphs: [
          "A community becomes stronger when its members can connect through shared experiences. From different cities and regions across Indonesia, every story adds another perspective to the journey.",
          "That is also why fan representatives and community stories will become an important part of this platform as it continues to grow.",
        ],
      },
      {
        heading: "The Journey Continues",
        paragraphs: [
          "This is only the beginning. More stories, memories, profiles, archives, and community features will continue to be added over time.",
          "Every voice carries a story, and every story becomes another part of the journey shared by 7ICONS and ICONIA.",
        ],
      },
    ],
  },

  {
    id: 2,
    slug: "behind-the-scenes-practice-day",
    title: "Behind the Scenes: Practice Day",
    excerpt:
      "A closer look at preparation, practice, laughter, and the moments shared behind the scenes.",
    category: "Behind the Scene",
    filterCategory: "Behind the Scene",
    date: "August 24, 2026",
    image: "/blog/blog-practice-day.png",
  },

  {
    id: 3,
    slug: "backstage-moments",
    title: "Backstage Moments Before the Show",
    excerpt:
      "Small conversations, shared laughter, and unforgettable memories before stepping onto the stage.",
    category: "Behind the Scene",
    filterCategory: "Behind the Scene",
    date: "August 22, 2026",
    image: "/blog/blog-backstage.png",
  },

  {
    id: 4,
    slug: "7-voices-1-dream",
    title: "7 Voices, 1 Dream",
    excerpt:
      "Different personalities and different stories connected through one dream and one unforgettable journey.",
    category: "Story",
    filterCategory: "Story",
    date: "August 20, 2026",
    image: "/blog/blog-unity.png",
  },

  {
    id: 5,
    slug: "iconia-across-indonesia",
    title: "ICONIA Across Indonesia",
    excerpt:
      "Stories of communities, friendships, and representatives connecting ICONIA from across Indonesia.",
    category: "Community",
    filterCategory: "Community",
    date: "August 18, 2026",
    image: "/blog/blog-iconia-indonesia.png",
  },

  {
    id: 6,
    slug: "member-spotlight",
    title: "Member Spotlight: A Story Behind the Smile",
    excerpt:
      "Get closer to the personalities, stories, and memorable moments behind the members of 7ICONS.",
    category: "Member Spotlight",
    filterCategory: "News",
    date: "August 16, 2026",
    image: "/blog/blog-member-spotlight.png",
  },
];