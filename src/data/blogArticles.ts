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
  content: [
    {
      paragraphs: [
        "Before a performance reaches the stage, there are hours of preparation that most people never get to see. Practice sessions are where ideas begin to take shape, movements become more precise, and everyone works together toward the same goal.",
        "But practice is not only about repetition. Between serious moments of preparation, there are conversations, laughter, small mistakes, and spontaneous memories that make the journey behind the scenes just as meaningful as the final performance.",
      ],
    },
    {
      heading: "More Than Just Practice",
      paragraphs: [
        "A practice room may look simple, but it becomes a place where many parts of a performance come together. Timing, movement, positioning, and communication all need attention before everything can feel natural.",
        "Every repetition helps build confidence. Something that may feel difficult at the beginning gradually becomes familiar as everyone continues working together.",
      ],
    },
    {
      heading: "The Moments Between Rehearsals",
      paragraphs: [
        "Some of the most memorable moments can happen when the music stops. A short break, a shared joke, or a conversation between practice sessions can become part of the memories surrounding the entire experience.",
        "These quieter moments show another side of the journey — one that is less about the final result and more about the people sharing the process together.",
      ],
    },
    {
      heading: "Growing Through the Process",
      paragraphs: [
        "Preparation also creates opportunities to learn from one another. Every person brings different strengths, perspectives, and ways of approaching a challenge.",
        "Through practice, those differences can become part of something shared. Progress is often built through patience, communication, and the willingness to keep improving together.",
      ],
    },
    {
      heading: "Before the Stage Lights",
      paragraphs: [
        "When the final performance begins, the audience sees the result. Behind that moment, however, are countless smaller moments of preparation that helped make it possible.",
        "Practice day is one part of that story — a reminder that some of the most meaningful memories are created long before the stage lights turn on.",
      ],
    },
  ],
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
  content: [
    {
      paragraphs: [
        "The moments before a show often carry a feeling of their own. Behind the stage, preparation continues while excitement slowly begins to build.",
        "There may be final checks, quiet conversations, shared laughter, and a few moments to relax before everything changes once the performance begins.",
      ],
    },
    {
      heading: "Before the Curtain Opens",
      paragraphs: [
        "Backstage is where the final pieces of preparation come together. Costumes are checked, small details are adjusted, and everyone prepares themselves for the moment ahead.",
        "Even after hours of practice, the minutes before stepping onto the stage can still feel different. There is anticipation, focus, and the awareness that the performance is about to become real.",
      ],
    },
    {
      heading: "Small Moments, Lasting Memories",
      paragraphs: [
        "Not every memorable moment happens under the spotlight. Sometimes the memories that remain longest are created through simple conversations and spontaneous laughter behind the scenes.",
        "These moments may never become part of the performance itself, but they become part of the story surrounding it.",
      ],
    },
    {
      heading: "Supporting One Another",
      paragraphs: [
        "A performance is rarely an individual effort. Behind the scenes, encouragement and communication can help everyone feel more prepared before stepping onto the stage.",
        "A few words of support, a smile, or simply knowing that everyone is experiencing the same moment can make the atmosphere feel completely different.",
      ],
    },
    {
      heading: "When the Stage Becomes Real",
      paragraphs: [
        "Eventually, the waiting ends. The lights change, the music begins, and the backstage atmosphere gives way to the energy of the performance.",
        "What the audience sees may last only for a few minutes, but behind those minutes are countless memories created before the show even started.",
      ],
    },
  ],
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
  content: [
    {
      paragraphs: [
        "Every person carries a different story. Different personalities, experiences, and perspectives can shape the way each person sees the journey ahead.",
        "But when those differences come together around one shared dream, they can create something that feels bigger than any individual story.",
      ],
    },
    {
      heading: "Different Voices",
      paragraphs: [
        "A group is never made up of identical personalities. Each person brings something different — a different way of communicating, a different strength, and a different perspective.",
        "Those differences are not something that need to disappear. They are often what give a group its character and make every shared moment feel unique.",
      ],
    },
    {
      heading: "One Shared Direction",
      paragraphs: [
        "Even with different personalities, a shared goal can create a strong connection. Everyone may arrive through a different path, but the direction ahead can still be the same.",
        "Working toward that shared direction means learning how to support one another, communicate, and continue moving forward together.",
      ],
    },
    {
      heading: "Stronger Together",
      paragraphs: [
        "The journey becomes more meaningful when challenges and achievements are experienced together. One person's strength can support another, while every new experience becomes something the whole group can remember.",
        "Over time, those shared experiences become part of the identity that connects everyone involved.",
      ],
    },
    {
      heading: "A Dream Shared With ICONIA",
      paragraphs: [
        "The journey does not exist only between the members themselves. Every story also connects with the people who continue to support, remember, and celebrate those moments.",
        "ICONIA becomes part of that larger story — a community connected by memories, appreciation, and the stories that continue to be shared.",
      ],
    },
    {
      heading: "The Story Keeps Growing",
      paragraphs: [
        "A shared dream is not defined by a single moment. It continues through new experiences, memories, and stories that are created along the way.",
        "Seven voices may begin from different places, but together they can become part of one journey — and one story that continues to grow.",
      ],
    },
  ],
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
  content: [
    {
      paragraphs: [
        "Indonesia is made up of thousands of islands, cities, cultures, and communities. Across those different places, people can still become connected through the same memories, interests, and stories.",
        "For ICONIA, distance does not have to mean separation. A community can grow across regions when people continue sharing experiences and supporting the same journey together.",
      ],
    },
    {
      heading: "Connected Across Regions",
      paragraphs: [
        "Every region has its own character and its own community. Some fans may live in large cities, while others may be separated by hundreds or even thousands of kilometers.",
        "Even with that distance, digital spaces make it possible for stories, conversations, and memories to travel far beyond a single location.",
      ],
    },
    {
      heading: "Local Communities, One Identity",
      paragraphs: [
        "Local communities can become important places for fans to meet others who share the same interest. Each community may have different activities, traditions, and ways of connecting.",
        "Those differences make the larger ICONIA community more diverse while still allowing everyone to share one common identity.",
      ],
    },
    {
      heading: "The Role of Fan Representatives",
      paragraphs: [
        "Fan representatives can help connect local communities with the wider ICONIA network. They can become a point of contact for information, activities, and stories from their respective regions.",
        "As this platform grows, the Fan Representatives section will help make those connections easier to discover and explore.",
      ],
    },
    {
      heading: "Stories From Across Indonesia",
      paragraphs: [
        "Every city and region has stories worth remembering. Community gatherings, friendships, personal experiences, and memorable moments can all become part of the larger archive.",
        "By collecting those stories in one digital space, ICONIA from different parts of Indonesia can discover experiences beyond their own local communities.",
      ],
    },
    {
      heading: "From Sabang to Merauke",
      paragraphs: [
        "A community does not have to exist in only one place. It can stretch across islands, provinces, and cities while continuing to grow through the people who take part in it.",
        "From Sabang to Merauke, every community adds another voice to the story — and every voice becomes another part of ICONIA.",
      ],
    },
  ],
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
  content: [
    {
      paragraphs: [
        "Behind every performance is a person with their own personality, experiences, and way of seeing the world. The moments audiences remember on stage are only one part of a much larger story.",
        "Member Spotlight is a space to look beyond performances and explore the smaller details, memories, and personal stories that help make every member unique.",
      ],
    },
    {
      heading: "More Than What We See on Stage",
      paragraphs: [
        "Performances often show confidence, energy, and carefully prepared moments. Away from the stage, however, there are many other sides to a person's story.",
        "Interests, habits, friendships, challenges, and everyday experiences can reveal a different perspective and help create a more complete picture.",
      ],
    },
    {
      heading: "The Personality Behind the Performance",
      paragraphs: [
        "Every member brings a different personality to the group. Some moments may feel energetic and expressive, while others may be quieter and more reflective.",
        "Those differences help create variety and make interactions between members feel natural, memorable, and unique.",
      ],
    },
    {
      heading: "Small Moments That Matter",
      paragraphs: [
        "A smile during rehearsal, a conversation backstage, or an unexpected moment of laughter may seem simple, but these moments often become memories that fans remember for years.",
        "They remind us that the story is not only about major performances or milestones. Sometimes the smallest moments can leave the strongest impression.",
      ],
    },
    {
      heading: "Growing Through Every Chapter",
      paragraphs: [
        "Every journey changes over time. New experiences can bring new perspectives, greater confidence, and different ways of approaching the future.",
        "Looking back at earlier moments can make that growth easier to see and give each chapter of the journey its own meaning.",
      ],
    },
    {
      heading: "A Story Worth Discovering",
      paragraphs: [
        "Member Spotlight is not about a single image or moment. It is about collecting the details that make each story feel personal and memorable.",
        "As the 7ICONS Web continues to grow, future member stories and profiles will offer more ways to explore those individual journeys and the memories connected to them.",
      ],
    },
  ],
},
];