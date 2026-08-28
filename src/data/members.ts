export type MemberSection = {
  heading?: string;
  paragraphs: string[];
};

export type MemberProfile = {
  id: number;
  slug: string;
  name: string;
  status: "Current Member" | "Former Member";
  role: string;
  image: string;
  shortBio: string;
  profile?: {
    displayName: string;
    position: string;
    description: string;
    sections: MemberSection[];
  };
};

export const members: MemberProfile[] = [
  {
    id: 1,
    slug: "member-01",
    name: "Member 01",
    status: "Current Member",
    role: "7ICONS Member",
    image: "/members/member-01.png",
    shortBio:
      "Discover the personality, stories, memorable moments, and journey behind this member of 7ICONS.",
    profile: {
      displayName: "Member 01",
      position: "7ICONS Member",
      description:
        "Get to know the personality, memorable moments, and journey behind one of the members of 7ICONS.",
      sections: [
        {
          heading: "About",
          paragraphs: [
            "Every member brings a different personality, story, and perspective to the journey of 7ICONS. Those differences become part of what makes every shared moment memorable.",
            "This profile is a space to explore more than performances alone — from personality and memories to the experiences that form part of the larger 7ICONS story.",
          ],
        },
        {
          heading: "Personality",
          paragraphs: [
            "The personality behind a performance can often be seen through smaller moments: conversations, interactions with other members, and the way different experiences are approached.",
            "These details help give every member their own identity while still being part of one shared journey.",
          ],
        },
        {
          heading: "Memorable Moments",
          paragraphs: [
            "Performances may become some of the most visible memories, but many meaningful moments are also created outside the spotlight.",
            "Practice sessions, backstage conversations, community memories, and everyday interactions can all become part of the stories remembered by ICONIA.",
          ],
        },
        {
          heading: "The Journey",
          paragraphs: [
            "Every chapter adds something new to the story. Experiences can bring growth, new memories, and different ways of looking at the journey ahead.",
            "As the 7ICONS archive continues to grow, this profile will become a place where those moments can be collected and remembered.",
          ],
        },
      ],
    },
  },

  {
  id: 2,
  slug: "member-02",
  name: "Member 02",
  status: "Current Member",
  role: "7ICONS Member",
  image: "/members/member-02.png",
  shortBio:
    "Discover the personality, memorable moments, and journey behind Member 02 of 7ICONS.",
  profile: {
    displayName: "Member 02",
    position: "7ICONS Member",
    description:
      "Explore the personality, memorable moments, and journey behind another unique member of 7ICONS.",
    sections: [
      {
        heading: "About",
        paragraphs: [
          "Every member adds a different character to the story of 7ICONS. Individual experiences, personalities, and perspectives help make each chapter of the journey feel unique.",
          "This profile brings together some of the smaller details and memories that help tell the story beyond performances and public appearances.",
        ],
      },
      {
        heading: "Personality",
        paragraphs: [
          "Personality can often be seen through the way someone interacts with the people around them. Small reactions, conversations, and spontaneous moments can reveal a side that performances alone may not show.",
          "Those personal qualities help create a distinct presence while also contributing to the chemistry shared between the members.",
        ],
      },
      {
        heading: "Memorable Moments",
        paragraphs: [
          "Some memories are created through major performances, while others come from quieter moments behind the scenes.",
          "Practice sessions, shared laughter, backstage conversations, and moments with ICONIA can all become meaningful parts of the journey.",
        ],
      },
      {
        heading: "Growing Together",
        paragraphs: [
          "Being part of a group also means learning and growing alongside other people. Different experiences can create opportunities to understand one another and become stronger together.",
          "Over time, those shared experiences become part of the memories that shape both the individual member and the group as a whole.",
        ],
      },
      {
        heading: "The Journey Continues",
        paragraphs: [
          "Every new experience adds another piece to the story. Some moments may become milestones, while others remain simple memories that are meaningful in their own way.",
          "As the 7ICONS digital archive continues to grow, this profile can become a place to preserve more of those stories and moments over time.",
        ],
      },
    ],
  },
},

  {
  id: 3,
  slug: "member-03",
  name: "Member 03",
  status: "Current Member",
  role: "7ICONS Member",
  image: "/members/member-03.png",
  shortBio:
    "Discover the personality, memorable moments, and journey behind Member 03 of 7ICONS.",
  profile: {
    displayName: "Member 03",
    position: "7ICONS Member",
    description:
      "Get to know the personality, memorable moments, and journey behind Member 03 as part of the 7ICONS story.",
    sections: [
      {
        heading: "About",
        paragraphs: [
          "Every member contributes something different to the identity of 7ICONS. Individual personality, perspective, and experience help shape the atmosphere created together as a group.",
          "This profile is a space to explore the smaller details that make Member 03's journey feel personal, memorable, and connected to the larger story.",
        ],
      },
      {
        heading: "Personality",
        paragraphs: [
          "Personality is often revealed through everyday interactions rather than major moments. A reaction during practice, the way someone communicates, or a spontaneous conversation can say a lot about who they are.",
          "These qualities help create a unique presence while also influencing the chemistry shared with the other members.",
        ],
      },
      {
        heading: "Memorable Moments",
        paragraphs: [
          "Some of the strongest memories can come from moments that were never planned to become memorable. Small conversations, shared laughter, rehearsals, and backstage experiences can stay meaningful long after they happen.",
          "Those moments become part of the personal history that connects each member with the journey of 7ICONS and ICONIA.",
        ],
      },
      {
        heading: "Learning Through Experience",
        paragraphs: [
          "Every new experience creates an opportunity to learn. Performances, preparation, teamwork, and challenges can all contribute to personal growth over time.",
          "Being part of a shared journey means that individual growth can also become part of the growth experienced by the group together.",
        ],
      },
      {
        heading: "Looking Forward",
        paragraphs: [
          "A journey is always shaped by both what has already happened and what is still ahead. Every chapter creates new stories while adding more meaning to the memories that came before.",
          "As the 7ICONS archive develops, this profile can continue to grow with more stories, moments, and memories connected to Member 03.",
        ],
      },
    ],
  },
},

  {
  id: 4,
  slug: "member-04",
  name: "Member 04",
  status: "Current Member",
  role: "7ICONS Member",
  image: "/members/member-04.png",
  shortBio:
    "Discover the personality, memorable moments, and journey behind Member 04 of 7ICONS.",
  profile: {
    displayName: "Member 04",
    position: "7ICONS Member",
    description:
      "Explore the personality, memorable moments, and experiences that make Member 04 part of the continuing 7ICONS story.",
    sections: [
      {
        heading: "About",
        paragraphs: [
          "Every member carries their own experiences into the journey of 7ICONS. Different perspectives, personalities, and memories help create a group story that is richer than any single moment.",
          "This profile is a place to discover more about Member 04 beyond the stage, including the small details and experiences that become part of the larger journey.",
        ],
      },
      {
        heading: "Personality",
        paragraphs: [
          "A person's character can often be noticed through the little things: the way they respond to a situation, communicate with others, or bring energy into a shared moment.",
          "Those personal qualities help Member 04 maintain an individual identity while still contributing naturally to the chemistry of 7ICONS.",
        ],
      },
      {
        heading: "Memorable Moments",
        paragraphs: [
          "Memories are not created only through major events. Rehearsals, backstage moments, conversations, and spontaneous laughter can become just as meaningful over time.",
          "Each of those experiences adds another detail to the story shared between the members and the ICONIA community.",
        ],
      },
      {
        heading: "Sharing the Journey",
        paragraphs: [
          "Being part of a group means experiencing both achievements and challenges alongside other people. Those shared experiences can strengthen relationships and create memories that belong to everyone involved.",
          "The journey becomes more meaningful when individual stories continue to connect with the stories of the people around them.",
        ],
      },
      {
        heading: "Another Chapter",
        paragraphs: [
          "Every chapter of the journey brings something new. Some experiences become important milestones, while others remain quiet memories that gain meaning as time passes.",
          "As the 7ICONS Web continues to develop, this profile can grow into a deeper archive of stories and moments connected to Member 04.",
        ],
      },
    ],
  },
},

  {
  id: 5,
  slug: "member-05",
  name: "Member 05",
  status: "Current Member",
  role: "7ICONS Member",
  image: "/members/member-05.png",
  shortBio:
    "Discover the personality, memorable moments, and journey behind Member 05 of 7ICONS.",
  profile: {
    displayName: "Member 05",
    position: "7ICONS Member",
    description:
      "Explore the personality, memorable moments, and experiences that shape Member 05 as part of the 7ICONS journey.",
    sections: [
      {
        heading: "About",
        paragraphs: [
          "Every member brings a different presence to 7ICONS. Personal experiences, character, and perspective help create the variety that makes the group's story feel alive and memorable.",
          "This profile offers a closer look at Member 05 beyond performances, focusing on the moments and experiences that become part of the wider journey.",
        ],
      },
      {
        heading: "Personality",
        paragraphs: [
          "Personality can appear through many small details, from the way someone communicates to the energy they bring into a shared moment.",
          "Those qualities help Member 05 stand out individually while still contributing naturally to the connection shared across the group.",
        ],
      },
      {
        heading: "Memorable Moments",
        paragraphs: [
          "Some memories become meaningful because they happen unexpectedly. A rehearsal, a backstage conversation, a shared laugh, or a simple interaction can stay memorable long after the moment has passed.",
          "These experiences become part of the personal story that connects Member 05 with 7ICONS and ICONIA.",
        ],
      },
      {
        heading: "Growing With the Journey",
        paragraphs: [
          "Every new experience can bring a different lesson. Performances, preparation, teamwork, and challenges all create opportunities to grow and see the journey from a new perspective.",
          "That growth becomes even more meaningful when it happens alongside people sharing the same direction.",
        ],
      },
      {
        heading: "Memories for the Future",
        paragraphs: [
          "The story of a member is never defined by a single moment. It continues through new chapters, experiences, and memories that gradually become part of something larger.",
          "As the 7ICONS archive continues to develop, this profile can grow with more stories and moments connected to Member 05.",
        ],
      },
    ],
  },
},

  {
  id: 6,
  slug: "member-06",
  name: "Member 06",
  status: "Current Member",
  role: "7ICONS Member",
  image: "/members/member-06.png",
  shortBio:
    "Discover the personality, memorable moments, and journey behind Member 06 of 7ICONS.",
  profile: {
    displayName: "Member 06",
    position: "7ICONS Member",
    description:
      "Discover the personality, memorable experiences, and journey that make Member 06 part of the continuing story of 7ICONS.",
    sections: [
      {
        heading: "About",
        paragraphs: [
          "Every member contributes a different voice to the story of 7ICONS. Personal experiences, individual character, and the way each person approaches the journey help create a group identity made from many different perspectives.",
          "This profile offers a closer look at Member 06 through the moments, memories, and experiences that exist beyond performances alone.",
        ],
      },
      {
        heading: "Personality",
        paragraphs: [
          "A person's personality often becomes most visible in ordinary moments. Conversations, reactions, humor, and the way someone interacts with others can reveal details that are difficult to see from the stage.",
          "Those individual qualities allow Member 06 to maintain a distinct presence while still becoming part of the chemistry shared across 7ICONS.",
        ],
      },
      {
        heading: "Memorable Moments",
        paragraphs: [
          "Memorable experiences do not always need to be major milestones. Practice sessions, backstage conversations, spontaneous laughter, and moments shared with ICONIA can become equally important over time.",
          "Together, those memories form a collection of smaller stories that help preserve the journey in a more personal way.",
        ],
      },
      {
        heading: "Sharing Experiences",
        paragraphs: [
          "Being part of a shared journey means experiencing preparation, challenges, achievements, and changes alongside other people.",
          "Those experiences can create stronger connections and become reminders that every individual chapter is also connected to a larger story.",
        ],
      },
      {
        heading: "Continuing the Story",
        paragraphs: [
          "Every journey continues to change as new experiences are added. Some moments become landmarks, while others gain meaning only after enough time has passed.",
          "As the 7ICONS digital archive grows, this profile can continue collecting the stories and memories connected to Member 06.",
        ],
      },
    ],
  },
},

  {
  id: 7,
  slug: "former-member-01",
  name: "Former Member 01",
  status: "Former Member",
  role: "Former 7ICONS Member",
  image: "/members/former-member-01.png",
  shortBio:
    "Remember the stories, moments, and journey of Former Member 01 as part of the history of 7ICONS.",
  profile: {
    displayName: "Former Member 01",
    position: "Former 7ICONS Member",
    description:
      "Look back at the memories, experiences, and contributions that made Former Member 01 part of the 7ICONS journey.",
    sections: [
      {
        heading: "About",
        paragraphs: [
          "Every person who becomes part of a group's journey leaves behind their own collection of stories, experiences, and memories. Former members remain an important part of the chapters that helped shape 7ICONS over time.",
          "This profile preserves some of the memories connected to Former Member 01 and recognizes their place within the wider story of 7ICONS.",
        ],
      },
      {
        heading: "Personality",
        paragraphs: [
          "Each member brings their own personality and presence into the group. Those individual qualities can be remembered through performances, interactions, conversations, and many smaller moments shared along the way.",
          "The personality of Former Member 01 became part of the chemistry and memories created during their chapter with 7ICONS.",
        ],
      },
      {
        heading: "Memorable Moments",
        paragraphs: [
          "Some memories remain meaningful even after a particular chapter has ended. Performances, rehearsals, backstage moments, and interactions with ICONIA can all become part of the history that continues to be remembered.",
          "These moments help preserve a more complete picture of the journey and the people who were part of it.",
        ],
      },
      {
        heading: "Part of the Journey",
        paragraphs: [
          "A former member may no longer be part of the group's current chapter, but the experiences shared during their time together still belong to the larger story.",
          "Every contribution, memory, and shared experience becomes one piece of the history that helped shape the journey of 7ICONS.",
        ],
      },
      {
        heading: "Remembering the Chapter",
        paragraphs: [
          "Looking back is not only about remembering what has ended. It is also a way of recognizing the people and moments that helped create everything that followed.",
          "This archive keeps the chapter of Former Member 01 connected to the continuing history of 7ICONS and ICONIA.",
        ],
      },
    ],
  },
},

  {
  id: 8,
  slug: "former-member-02",
  name: "Former Member 02",
  status: "Former Member",
  role: "Former 7ICONS Member",
  image: "/members/former-member-02.png",
  shortBio:
    "Explore the memories, experiences, and journey of Former Member 02 as part of the history of 7ICONS.",
  profile: {
    displayName: "Former Member 02",
    position: "Former 7ICONS Member",
    description:
      "Remember the moments, experiences, and stories that made Former Member 02 part of an important chapter in the 7ICONS journey.",
    sections: [
      {
        heading: "About",
        paragraphs: [
          "Every chapter of a group's history is shaped by the people who were part of it. Former members remain connected to the story through the experiences, memories, and moments they shared during their time with 7ICONS.",
          "This profile preserves the chapter of Former Member 02 and recognizes their place within the wider history of the group.",
        ],
      },
      {
        heading: "Personality",
        paragraphs: [
          "Individual personality often becomes part of how a member is remembered. Expressions, interactions, humor, and the way someone responds to different situations can leave a lasting impression.",
          "Those qualities helped Former Member 02 bring their own identity into the group while contributing to the chemistry created together.",
        ],
      },
      {
        heading: "Memorable Moments",
        paragraphs: [
          "The most memorable moments are not always the biggest ones. Rehearsals, backstage experiences, conversations, performances, and interactions with ICONIA can all become meaningful pieces of a shared history.",
          "These memories help keep the story connected to the people who experienced each chapter together.",
        ],
      },
      {
        heading: "A Chapter in the Story",
        paragraphs: [
          "Although the journey eventually moves into a new chapter, the experiences from earlier periods remain part of everything that came before.",
          "Former Member 02 represents one of those chapters, carrying memories that continue to belong to the larger 7ICONS story.",
        ],
      },
      {
        heading: "Remembering the Journey",
        paragraphs: [
          "Preserving the history of a group also means remembering the people who helped shape it at different points in time.",
          "Through this digital archive, the memories connected to Former Member 02 can remain part of the continuing story shared by 7ICONS and ICONIA.",
        ],
      },
    ],
  },
},

  {
  id: 9,
  slug: "former-member-03",
  name: "Former Member 03",
  status: "Former Member",
  role: "Former 7ICONS Member",
  image: "/members/former-member-03.png",
  shortBio:
    "Discover the memories, experiences, and journey of Former Member 03 as part of the history of 7ICONS.",
  profile: {
    displayName: "Former Member 03",
    position: "Former 7ICONS Member",
    description:
      "Look back at the stories, memories, and experiences that made Former Member 03 part of the 7ICONS journey.",
    sections: [
      {
        heading: "About",
        paragraphs: [
          "Every era of a group's journey is shaped by the people who were part of it. Former members remain connected to that history through the moments, experiences, and memories they shared along the way.",
          "This profile preserves the chapter of Former Member 03 and recognizes their place within the continuing story of 7ICONS.",
        ],
      },
      {
        heading: "Personality",
        paragraphs: [
          "A member's personality often becomes part of the memories people carry forward. Expressions, conversations, reactions, and everyday interactions can create impressions that remain long after a particular chapter has ended.",
          "Those individual qualities helped Former Member 03 bring a unique presence into the group during their time with 7ICONS.",
        ],
      },
      {
        heading: "Memorable Moments",
        paragraphs: [
          "Meaningful memories can come from performances, rehearsals, backstage experiences, or simple moments shared between members and ICONIA.",
          "Together, these experiences become part of a larger history that reflects not only where the group is today, but also the journey that came before.",
        ],
      },
      {
        heading: "Part of the History",
        paragraphs: [
          "When a member moves on, their chapter does not disappear. The moments they shared remain part of the story that helped shape the group over time.",
          "Former Member 03 represents one of those chapters and remains connected to the wider history of 7ICONS through those shared experiences.",
        ],
      },
      {
        heading: "Remembering the Journey",
        paragraphs: [
          "Preserving the past helps keep the full story complete. Every member, every era, and every shared moment adds something meaningful to the history of the group.",
          "Through this digital archive, the memories connected to Former Member 03 can continue to be remembered as part of the story shared by 7ICONS and ICONIA.",
        ],
      },
    ],
  },
},
];