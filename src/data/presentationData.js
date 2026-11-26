export const presentationData = {
  hero: {
    title: "My English Presentation",
    subtitle: "Hello! My name is Khaled. Welcome to my presentation.",
    presenter: "Khaled",
    level: "A1 • Present Simple Tense",
  },
  sections: [
    {
      id: "house",
      navLabel: "My House",
      title: "Section 1: My House",
      themeColor: "indigo",
      badge: "Topic 01 • Living Space",
      description: "My apartment, rooms, furniture, and household chores.",
      cards: [
        {
          id: "house-1",
          cardNumber: 1,
          title: "My Home",
          text: "I live in a nice apartment with my family. It is big, clean, and comfortable.",
          icon: "Home",
          verbs: ["live", "is"],
          highlightTokens: [
            { text: "I ", isVerb: false },
            { text: "live", isVerb: true, note: "Present Simple (base form with 'I')" },
            { text: " in a nice apartment with my family. It ", isVerb: false },
            { text: "is", isVerb: true, note: "Verb 'to be' (singular 'it is')" },
            { text: " big, clean, and comfortable.", isVerb: false }
          ],
          keywords: ["nice apartment", "family", "big", "clean", "comfortable"]
        },
        {
          id: "house-2",
          cardNumber: 2,
          title: "The Rooms",
          text: "My house has a living room, a kitchen, three bedrooms, and two bathrooms.",
          icon: "LayoutGrid",
          verbs: ["has"],
          highlightTokens: [
            { text: "My house ", isVerb: false },
            { text: "has", isVerb: true, note: "3rd person singular of 'have' (it has)" },
            { text: " a living room, a kitchen, three bedrooms, and two bathrooms.", isVerb: false }
          ],
          keywords: ["living room", "kitchen", "3 bedrooms", "2 bathrooms"]
        },
        {
          id: "house-3",
          cardNumber: 3,
          title: "The Furniture",
          text: "The living room has a big sofa, a table, and a large TV. My bedroom has a bed, a desk, and a computer.",
          icon: "Armchair",
          verbs: ["has"],
          highlightTokens: [
            { text: "The living room ", isVerb: false },
            { text: "has", isVerb: true, note: "3rd person singular of 'have'" },
            { text: " a big sofa, a table, and a large TV. My bedroom ", isVerb: false },
            { text: "has", isVerb: true, note: "3rd person singular of 'have'" },
            { text: " a bed, a desk, and a computer.", isVerb: false }
          ],
          keywords: ["big sofa", "large TV", "desk", "computer"]
        },
        {
          id: "house-4",
          cardNumber: 4,
          title: "Household Chores",
          text: "My mother cooks food and cleans the kitchen. My sister washes the dishes. I clean my room and take out the trash.",
          icon: "Sparkles",
          verbs: ["cooks", "cleans", "washes", "clean", "take out"],
          highlightTokens: [
            { text: "My mother ", isVerb: false },
            { text: "cooks", isVerb: true, note: "3rd person singular: cook + s" },
            { text: " food and ", isVerb: false },
            { text: "cleans", isVerb: true, note: "3rd person singular: clean + s" },
            { text: " the kitchen. My sister ", isVerb: false },
            { text: "washes", isVerb: true, note: "3rd person singular: wash + es" },
            { text: " the dishes. I ", isVerb: false },
            { text: "clean", isVerb: true, note: "Base form with pronoun 'I'" },
            { text: " my room and ", isVerb: false },
            { text: "take out", isVerb: true, note: "Phrasal verb with pronoun 'I'" },
            { text: " the trash.", isVerb: false }
          ],
          keywords: ["cooks food", "washes dishes", "cleans room", "takes out trash"]
        }
      ]
    },
    {
      id: "freetime",
      navLabel: "Free Time",
      title: "Section 2: Daily & Free Time",
      themeColor: "emerald",
      badge: "Topic 02 • Habits & Free Time",
      description: "My daily routine, solo hobbies, and activities with friends.",
      cards: [
        {
          id: "freetime-1",
          cardNumber: 1,
          title: "Daily Activities",
          text: "I wake up early every day. I study English, work on my computer, and eat healthy food.",
          icon: "Sun",
          verbs: ["wake up", "study", "work", "eat"],
          highlightTokens: [
            { text: "I ", isVerb: false },
            { text: "wake up", isVerb: true, note: "Phrasal verb (routine habit)" },
            { text: " early every day. I ", isVerb: false },
            { text: "study", isVerb: true, note: "Base form with pronoun 'I'" },
            { text: " English, ", isVerb: false },
            { text: "work", isVerb: true, note: "Base form with pronoun 'I'" },
            { text: " on my computer, and ", isVerb: false },
            { text: "eat", isVerb: true, note: "Base form with pronoun 'I'" },
            { text: " healthy food.", isVerb: false }
          ],
          keywords: ["wake up early", "study English", "work on computer", "healthy food"]
        },
        {
          id: "freetime-2",
          cardNumber: 2,
          title: "Free Time Alone",
          text: "In my free time alone, I play video games, watch movies, and listen to music.",
          icon: "Gamepad2",
          verbs: ["play", "watch", "listen"],
          highlightTokens: [
            { text: "In my free time alone, I ", isVerb: false },
            { text: "play", isVerb: true, note: "Base form with pronoun 'I'" },
            { text: " video games, ", isVerb: false },
            { text: "watch", isVerb: true, note: "Base form with pronoun 'I'" },
            { text: " movies, and ", isVerb: false },
            { text: "listen", isVerb: true, note: "Base form with pronoun 'I'" },
            { text: " to music.", isVerb: false }
          ],
          keywords: ["video games", "watch movies", "listen to music"]
        },
        {
          id: "freetime-3",
          cardNumber: 3,
          title: "With My Friends",
          text: "With my friends, I play basketball. We also go to the mall, drink coffee, and talk together.",
          icon: "Users",
          verbs: ["play", "go", "drink", "talk"],
          highlightTokens: [
            { text: "With my friends, I ", isVerb: false },
            { text: "play", isVerb: true, note: "Base form with pronoun 'I'" },
            { text: " basketball. We also ", isVerb: false },
            { text: "go", isVerb: true, note: "Base form with pronoun 'We'" },
            { text: " to the mall, ", isVerb: false },
            { text: "drink", isVerb: true, note: "Base form with pronoun 'We'" },
            { text: " coffee, and ", isVerb: false },
            { text: "talk", isVerb: true, note: "Base form with pronoun 'We'" },
            { text: " together.", isVerb: false }
          ],
          keywords: ["play basketball", "go to mall", "drink coffee", "talk together"]
        }
      ]
    },
    {
      id: "event",
      navLabel: "My Event",
      title: "Section 3: A Regular Event",
      themeColor: "amber",
      badge: "Topic 03 • Weekly Gathering",
      description: "Our weekly family gathering, time and place, and what I wear.",
      cards: [
        {
          id: "event-1",
          cardNumber: 1,
          title: "The Event",
          text: "I usually attend our weekly family gathering. Everyone meets, eats together, and talks.",
          icon: "HeartHandshake",
          verbs: ["attend", "meets", "eats", "talks"],
          highlightTokens: [
            { text: "I usually ", isVerb: false },
            { text: "attend", isVerb: true, note: "Routine action with frequency adverb 'usually'" },
            { text: " our weekly family gathering. Everyone ", isVerb: false },
            { text: "meets", isVerb: true, note: "Indefinite pronoun 'everyone' takes singular verb (-s)" },
            { text: ", ", isVerb: false },
            { text: "eats", isVerb: true, note: "Singular verb (-s)" },
            { text: " together, and ", isVerb: false },
            { text: "talks", isVerb: true, note: "Singular verb (-s)" },
            { text: ".", isVerb: false }
          ],
          keywords: ["weekly family gathering", "meets", "eats together", "talks"]
        },
        {
          id: "event-2",
          cardNumber: 2,
          title: "Time & Place",
          text: "It happens every Friday at 3:00 PM. We meet at our family house.",
          icon: "Clock",
          verbs: ["happens", "meet"],
          highlightTokens: [
            { text: "It ", isVerb: false },
            { text: "happens", isVerb: true, note: "3rd person singular 'it' + s" },
            { text: " every Friday at 3:00 PM. We ", isVerb: false },
            { text: "meet", isVerb: true, note: "Base form with pronoun 'We'" },
            { text: " at our family house.", isVerb: false }
          ],
          keywords: ["every Friday", "3:00 PM", "family house"]
        },
        {
          id: "event-3",
          cardNumber: 3,
          title: "What I Wear",
          text: "I wear comfortable home clothes. I wear a soft t-shirt, comfortable sweatpants, and slippers.",
          icon: "Shirt",
          verbs: ["wear"],
          highlightTokens: [
            { text: "I ", isVerb: false },
            { text: "wear", isVerb: true, note: "Base form with pronoun 'I'" },
            { text: " comfortable home clothes. I ", isVerb: false },
            { text: "wear", isVerb: true, note: "Base form with pronoun 'I'" },
            { text: " a soft t-shirt, comfortable sweatpants, and slippers.", isVerb: false }
          ],
          keywords: ["comfortable home clothes", "soft t-shirt", "sweatpants", "slippers"]
        }
      ]
    }
  ]
};

// Flattened list of cards for Slide / Presenter mode
export const allCards = presentationData.sections.flatMap(section => 
  section.cards.map(card => ({
    ...card,
    sectionId: section.id,
    sectionTitle: section.title,
    themeColor: section.themeColor
  }))
);
