export type RepresentativeSection = {
  heading?: string;
  paragraphs: string[];
};

export type FanRepresentative = {
  id: number;
  slug: string;
  name: string;
  region: string;
  city: string;
  role: string;
  image: string;
  shortBio: string;
  since: string;

  instagram?: string;
  instagramUrl?: string;
  whatsapp?: string;

  profile?: {
    description: string;
    mission: string;
    motto: string;
    sections: RepresentativeSection[];
  };
};

export const fanRepresentatives: FanRepresentative[] = [
  {
    id: 1,
    slug: "aulia-rahma-jakarta",
    name: "Aulia Rahma",
    region: "DKI Jakarta",
    city: "Jakarta",
    role: "ICONIA Fan Representative",
    image: "/fan-representatives/representative-01.png",
    shortBio:
      "Connecting ICONIA in Jakarta through community activities, shared stories, and support for 7ICONS.",
    since: "2026",

    instagram: "@aulia.iconia",
    instagramUrl: "https://instagram.com/aulia.iconia",
    whatsapp: "6200000000001",

    profile: {
      description:
        "Meet Aulia Rahma, an ICONIA Fan Representative helping connect the fan community in Jakarta and preserve local stories from the continuing journey with 7ICONS.",

      mission:
        "Build a positive, welcoming, and connected ICONIA community in Jakarta.",

      motto:
        "Different stories, one community.",

      sections: [
        {
          heading: "About",
          paragraphs: [
            "Aulia represents the ICONIA community in Jakarta and helps create connections between fans who share the same enthusiasm for 7ICONS.",
            "Her representative profile is a space to preserve local stories, activities, and memorable moments from the Jakarta ICONIA community.",
          ],
        },
        {
          heading: "Community Role",
          paragraphs: [
            "As a Fan Representative, Aulia helps share information, connect local fans, and support positive community activities related to 7ICONS.",
            "The role is not only about representing a region, but also about helping ICONIA feel connected as part of a wider community across Indonesia.",
          ],
        },
        {
          heading: "Local Community",
          paragraphs: [
            "Jakarta brings together ICONIA from many different backgrounds and experiences. Community activities can become opportunities for fans to meet, share stories, and build new memories together.",
            "Those local experiences become part of the larger ICONIA journey documented through this digital home.",
          ],
        },
        {
          heading: "Supporting ICONIA",
          paragraphs: [
            "Every Fan Representative contributes in a different way, but the shared goal remains the same: keeping ICONIA connected, informed, and supportive of one another.",
            "Through communication and community participation, each region can add its own chapter to the story surrounding 7ICONS.",
          ],
        },
      ],
    },
  },

  {
    id: 2,
    slug: "nadia-putri-jawa-barat",
    name: "Nadia Putri",
    region: "Jawa Barat",
    city: "Bandung",
    role: "ICONIA Fan Representative",
    image: "/fan-representatives/representative-02.png",
    shortBio:
      "Helping connect ICONIA across West Java and bringing local community stories closer together.",
    since: "2026",

    instagram: "@nadia.iconia",
    instagramUrl: "https://instagram.com/nadia.iconia",
    whatsapp: "6200000000002",

    profile: {
      description:
        "Meet Nadia Putri, an ICONIA Fan Representative helping connect fans across Bandung and the wider West Java community.",

      mission:
        "Create stronger connections between ICONIA communities across West Java.",

      motto:
        "Connected by stories, united by support.",

      sections: [
        {
          heading: "About",
          paragraphs: [
            "Nadia represents ICONIA in West Java and helps strengthen connections between fans from Bandung and surrounding areas.",
            "Her profile preserves stories, experiences, and memorable community moments from this part of the ICONIA journey.",
          ],
        },
        {
          heading: "Community Role",
          paragraphs: [
            "Nadia helps local fans stay connected with community activities and important information surrounding 7ICONS.",
            "Her role also encourages positive communication and collaboration between ICONIA from different cities across West Java.",
          ],
        },
        {
          heading: "Local Community",
          paragraphs: [
            "West Java is home to fans from many cities and backgrounds, each bringing different stories and experiences into the community.",
            "Those differences help create a diverse local network connected through shared enthusiasm for 7ICONS.",
          ],
        },
        {
          heading: "Supporting ICONIA",
          paragraphs: [
            "Community support can begin with simple things such as sharing information, welcoming new fans, and maintaining positive communication.",
            "Together, those efforts help strengthen the relationship between local communities and ICONIA across Indonesia.",
          ],
        },
      ],
    },
  },

  {
    id: 3,
    slug: "rizka-amalia-jawa-tengah",
    name: "Rizka Amalia",
    region: "Jawa Tengah",
    city: "Semarang",
    role: "ICONIA Fan Representative",
    image: "/fan-representatives/representative-03.png",
    shortBio:
      "Representing ICONIA in Central Java and supporting community connections around the 7ICONS journey.",
    since: "2026",

    instagram: "@rizka.iconia",
    instagramUrl: "https://instagram.com/rizka.iconia",
    whatsapp: "6200000000003",

    profile: {
      description:
        "Meet Rizka Amalia, an ICONIA Fan Representative helping connect the community in Semarang and other parts of Central Java.",

      mission:
        "Keep ICONIA in Central Java connected, informed, and welcoming to everyone.",

      motto:
        "Every connection becomes part of the journey.",

      sections: [
        {
          heading: "About",
          paragraphs: [
            "Rizka represents the ICONIA community in Central Java and helps bring together fans who share their support for 7ICONS.",
            "Her representative profile highlights the stories and experiences created by local communities around Semarang and beyond.",
          ],
        },
        {
          heading: "Community Role",
          paragraphs: [
            "Her role includes helping distribute useful updates, supporting community communication, and encouraging positive fan activities.",
            "These efforts help local ICONIA feel connected to a larger community beyond their own city.",
          ],
        },
        {
          heading: "Local Community",
          paragraphs: [
            "Central Java brings together communities from many different places, each with its own way of celebrating and supporting 7ICONS.",
            "Sharing those local experiences helps preserve a richer picture of the ICONIA community.",
          ],
        },
        {
          heading: "Supporting ICONIA",
          paragraphs: [
            "A strong community grows through communication, respect, and shared experiences.",
            "By maintaining those connections, Rizka helps local fans remain part of the wider ICONIA journey.",
          ],
        },
      ],
    },
  },

  {
    id: 4,
    slug: "citra-lestari-jawa-timur",
    name: "Citra Lestari",
    region: "Jawa Timur",
    city: "Surabaya",
    role: "ICONIA Fan Representative",
    image: "/fan-representatives/representative-04.png",
    shortBio:
      "Building connections among ICONIA in East Java through local activities and shared experiences.",
    since: "2026",

    instagram: "@citra.iconia",
    instagramUrl: "https://instagram.com/citra.iconia",
    whatsapp: "6200000000004",

    profile: {
      description:
        "Meet Citra Lestari, an ICONIA Fan Representative supporting connections between fans in Surabaya and communities across East Java.",

      mission:
        "Encourage an active, supportive, and connected ICONIA community across East Java.",

      motto:
        "Growing together through every chapter.",

      sections: [
        {
          heading: "About",
          paragraphs: [
            "Citra represents ICONIA in East Java and helps connect fans through local community activities and shared experiences.",
            "Her profile serves as a place to preserve stories from Surabaya and other communities within the region.",
          ],
        },
        {
          heading: "Community Role",
          paragraphs: [
            "Citra helps create a bridge for communication between local ICONIA and the wider fan community.",
            "Sharing updates and supporting positive activities are important parts of keeping the community connected.",
          ],
        },
        {
          heading: "Local Community",
          paragraphs: [
            "East Java has communities spread across many cities, creating different experiences and stories surrounding the same support for 7ICONS.",
            "Those local stories become meaningful parts of the broader ICONIA archive.",
          ],
        },
        {
          heading: "Supporting ICONIA",
          paragraphs: [
            "Supporting a community means helping people feel welcomed and included while keeping communication positive.",
            "Through those efforts, every local community can continue contributing its own identity to ICONIA.",
          ],
        },
      ],
    },
  },

  {
    id: 5,
    slug: "ayu-maharani-bali",
    name: "Ayu Maharani",
    region: "Bali",
    city: "Denpasar",
    role: "ICONIA Fan Representative",
    image: "/fan-representatives/representative-05.png",
    shortBio:
      "Connecting the ICONIA community in Bali and sharing memorable moments from the local fan journey.",
    since: "2026",

    instagram: "@ayu.iconia",
    instagramUrl: "https://instagram.com/ayu.iconia",
    whatsapp: "6200000000005",

    profile: {
      description:
        "Meet Ayu Maharani, an ICONIA Fan Representative helping connect fans in Denpasar and preserve community memories from Bali.",

      mission:
        "Build a warm and welcoming community where ICONIA in Bali can connect and share their stories.",

      motto:
        "One island, many stories, one ICONIA.",

      sections: [
        {
          heading: "About",
          paragraphs: [
            "Ayu represents the ICONIA community in Bali and helps local fans stay connected through shared stories and activities.",
            "Her profile captures community memories and experiences created throughout the local journey.",
          ],
        },
        {
          heading: "Community Role",
          paragraphs: [
            "Ayu helps communicate updates and encourages local fans to participate positively within the community.",
            "Her role also helps create stronger connections between ICONIA in Bali and fans from other regions.",
          ],
        },
        {
          heading: "Local Community",
          paragraphs: [
            "Bali's ICONIA community brings together people with different experiences who share the same appreciation for 7ICONS.",
            "Local gatherings and conversations can create memories that become part of a much wider community story.",
          ],
        },
        {
          heading: "Supporting ICONIA",
          paragraphs: [
            "A supportive community is built through respect, communication, and the willingness to welcome others.",
            "These values help the local ICONIA community continue growing while remaining connected with fans across Indonesia.",
          ],
        },
      ],
    },
  },

  {
    id: 6,
    slug: "dinda-safira-sumatera-utara",
    name: "Dinda Safira",
    region: "Sumatera Utara",
    city: "Medan",
    role: "ICONIA Fan Representative",
    image: "/fan-representatives/representative-06.png",
    shortBio:
      "Representing ICONIA in North Sumatra and helping local fans stay connected with the wider community.",
    since: "2026",

    instagram: "@dinda.iconia",
    instagramUrl: "https://instagram.com/dinda.iconia",
    whatsapp: "6200000000006",

    profile: {
      description:
        "Meet Dinda Safira, an ICONIA Fan Representative helping connect fans in Medan and communities throughout North Sumatra.",

      mission:
        "Strengthen communication and community connections between ICONIA across North Sumatra.",

      motto:
        "Stay connected, support together.",

      sections: [
        {
          heading: "About",
          paragraphs: [
            "Dinda represents ICONIA in North Sumatra and helps local fans remain connected with the wider community surrounding 7ICONS.",
            "Her profile preserves stories and moments created by the community in Medan and neighboring areas.",
          ],
        },
        {
          heading: "Community Role",
          paragraphs: [
            "Helping fans access information and connect with one another is an important part of Dinda's representative role.",
            "She also helps encourage positive communication and participation within the local community.",
          ],
        },
        {
          heading: "Local Community",
          paragraphs: [
            "North Sumatra adds another unique regional story to ICONIA's growing community across Indonesia.",
            "Every shared activity and conversation helps create stronger relationships among local fans.",
          ],
        },
        {
          heading: "Supporting ICONIA",
          paragraphs: [
            "Community representatives help make large fan networks feel more personal and accessible at a local level.",
            "That connection allows fans to share their enthusiasm while remaining part of something much larger.",
          ],
        },
      ],
    },
  },

  {
    id: 7,
    slug: "nabila-azizah-sulawesi-selatan",
    name: "Nabila Azizah",
    region: "Sulawesi Selatan",
    city: "Makassar",
    role: "ICONIA Fan Representative",
    image: "/fan-representatives/representative-07.png",
    shortBio:
      "Bringing together ICONIA in South Sulawesi through community connections and shared enthusiasm for 7ICONS.",
    since: "2026",

    instagram: "@nabila.iconia",
    instagramUrl: "https://instagram.com/nabila.iconia",
    whatsapp: "6200000000007",

    profile: {
      description:
        "Meet Nabila Azizah, an ICONIA Fan Representative helping connect fans in Makassar and communities across South Sulawesi.",

      mission:
        "Bring local ICONIA together through positive communication, activities, and shared experiences.",

      motto:
        "Together from every corner.",

      sections: [
        {
          heading: "About",
          paragraphs: [
            "Nabila represents ICONIA in South Sulawesi and helps connect fans from Makassar and surrounding communities.",
            "Her profile highlights stories, memories, and community experiences connected with the continuing 7ICONS journey.",
          ],
        },
        {
          heading: "Community Role",
          paragraphs: [
            "Nabila helps share information and encourages connections between local fans who may otherwise be separated by distance.",
            "Her representative role provides another point of connection between local communities and ICONIA across Indonesia.",
          ],
        },
        {
          heading: "Local Community",
          paragraphs: [
            "South Sulawesi contributes its own personality and stories to the wider fan community.",
            "Local interactions and activities help turn individual fans into a community connected through shared support.",
          ],
        },
        {
          heading: "Supporting ICONIA",
          paragraphs: [
            "The strength of ICONIA comes from many communities supporting the same journey in different ways.",
            "By keeping communication open and welcoming, each region becomes an important part of the larger network.",
          ],
        },
      ],
    },
  },

  {
    id: 8,
    slug: "keyla-anindya-kalimantan-timur",
    name: "Keyla Anindya",
    region: "Kalimantan Timur",
    city: "Samarinda",
    role: "ICONIA Fan Representative",
    image: "/fan-representatives/representative-08.png",
    shortBio:
      "Helping grow connections between ICONIA in East Kalimantan and the wider fan community across Indonesia.",
    since: "2026",

    instagram: "@keyla.iconia",
    instagramUrl: "https://instagram.com/keyla.iconia",
    whatsapp: "6200000000008",

    profile: {
      description:
        "Meet Keyla Anindya, an ICONIA Fan Representative helping connect the community in Samarinda and other parts of East Kalimantan.",

      mission:
        "Help ICONIA in East Kalimantan stay connected with one another and the wider community.",

      motto:
        "Distance never stops a community.",

      sections: [
        {
          heading: "About",
          paragraphs: [
            "Keyla represents ICONIA in East Kalimantan and helps connect local fans with the wider community surrounding 7ICONS.",
            "Her representative profile preserves regional stories and experiences from Samarinda and nearby communities.",
          ],
        },
        {
          heading: "Community Role",
          paragraphs: [
            "Keyla helps local fans discover information, communicate with each other, and participate in positive community activities.",
            "Her role strengthens the bridge between fans in East Kalimantan and ICONIA communities from other regions.",
          ],
        },
        {
          heading: "Local Community",
          paragraphs: [
            "Geographic distance does not prevent communities from sharing the same enthusiasm and experiences.",
            "Digital connections and local activities allow East Kalimantan's ICONIA community to remain active and represented.",
          ],
        },
        {
          heading: "Supporting ICONIA",
          paragraphs: [
            "Every region deserves a place within the larger community story.",
            "By preserving local memories and maintaining communication, representatives help ensure those stories remain connected to the wider ICONIA journey.",
          ],
        },
      ],
    },
  },

  {
    id: 9,
    slug: "shafa-nuraini-yogyakarta",
    name: "Shafa Nuraini",
    region: "DI Yogyakarta",
    city: "Yogyakarta",
    role: "ICONIA Fan Representative",
    image: "/fan-representatives/representative-09.png",
    shortBio:
      "Representing ICONIA in Yogyakarta and helping preserve local stories, activities, and community memories.",
    since: "2026",

    instagram: "@shafa.iconia",
    instagramUrl: "https://instagram.com/shafa.iconia",
    whatsapp: "6200000000009",

    profile: {
      description:
        "Meet Shafa Nuraini, an ICONIA Fan Representative helping connect fans in Yogyakarta and preserve memorable stories from the local community.",

      mission:
        "Create a friendly space where ICONIA in Yogyakarta can connect, share, and grow together.",

      motto:
        "Memories connect every chapter.",

      sections: [
        {
          heading: "About",
          paragraphs: [
            "Shafa represents ICONIA in Yogyakarta and helps local fans build connections through shared stories, conversations, and community activities.",
            "Her profile provides a place to preserve memories from the Yogyakarta ICONIA community.",
          ],
        },
        {
          heading: "Community Role",
          paragraphs: [
            "Shafa helps fans stay informed and connected while encouraging positive interaction within the community.",
            "Her role also helps bring local stories into the wider ICONIA network across Indonesia.",
          ],
        },
        {
          heading: "Local Community",
          paragraphs: [
            "Yogyakarta's community combines many different personalities and experiences within one shared interest.",
            "Every activity, conversation, and memorable moment adds another piece to the local ICONIA story.",
          ],
        },
        {
          heading: "Supporting ICONIA",
          paragraphs: [
            "Fan communities become stronger when members feel connected and valued.",
            "Through communication and shared experiences, local representatives help maintain that sense of belonging across the wider ICONIA community.",
          ],
        },
      ],
    },
  },
];