import { RandomWordOptions, generateSlug } from "random-word-slugs";

const options: RandomWordOptions<2> = {
  categories: {
    noun: [
      "animals",
      "business",
      "education",
      "food",
      "health",
      "media",
      "place",
      "profession",
      "science",
      "sports",
      "technology",
      "thing",
      "time",
      "transportation",
    ],
    adjective: [
      "appearance",
      "color",
      "condition",
      "personality",
      "quantity",
      "shapes",
      "size",
      "sounds",
      "taste",
      "time",
      "touch",
    ],
  },
  partsOfSpeech: ["adjective", "noun"],
};

const randomRoomCode = () => generateSlug(2, options);

export default randomRoomCode;
