// categoryMapping.js
// Utility for strictly matching transaction categories to canonical categories

/**
 * Builds a canonical index from a list of categories.
 * This normalizes categories by removing emojis and standardizing text
 * to make matching more accurate.
 *
 * @param {Array} categories - Array of category objects with 'name' property
 * @returns {Object} - Object mapping normalized keys to canonical category names
 */
export function buildCanonicalIndex(categories) {
  const index = {};

  // Fixed list of canonical categories from the backend
  const canonicalCategories = [
    // Expense categories
    {
      id: "68ad389ce990cc5e9e26baa4",
      name: "🌐 work",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26baaf",
      name: "🏠 DORM TU or GV Rent",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26bab1",
      name: "🌐 TA salary",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26bab9",
      name: "🍗 Food BKD",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26baa8",
      name: "🏪 7-11",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26baaa",
      name: "☕ coffee",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26baab",
      name: "🎁 Lazada",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26baac",
      name: "🍊🍊 Lotus",
      categoryType: "Expense",
    },
    { id: "68ad389ce990cc5e9e26baae", name: "😇 Me", categoryType: "Expense" },
    {
      id: "68ad389ce990cc5e9e26bab0",
      name: "🥞 Food night market",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26bab6",
      name: "✂️ saloon",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26bab7",
      name: "🚲 Anywheel",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26baba",
      name: "🏊 swim",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26babd",
      name: "🍌 Fruits",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26baa6",
      name: "🚖 Transport",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26baad",
      name: "☕ coffee BKD",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26bab2",
      name: "🏛️ Recharge",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26babc",
      name: "📈 Bangkok",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26babe",
      name: "🍕 Pizza",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26baa5",
      name: "🍜 Food",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26baa7",
      name: "📒 Education",
      categoryType: "Expense",
    },
    { id: "68ad389ce990cc5e9e26baa9", name: "🍗 KFC", categoryType: "Expense" },
    {
      id: "68ad389ce990cc5e9e26bab3",
      name: "👦 RONIT",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26bab4",
      name: "🏡 GHAR",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26bab5",
      name: "🛂 immigration",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26bab8",
      name: "🎉 New Year",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26babb",
      name: "🌴 Tour",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26babf",
      name: "💊 medical",
      categoryType: "Expense",
    },
    {
      id: "68ad389ce990cc5e9e26bac0",
      name: "kuch bhi",
      categoryType: "Expense",
    },

    // Income categories
    {
      id: "68ad3991a53fbafe55705814",
      name: "💰 TA Salary",
      categoryType: "Income",
    },
    { id: "68ad3991a53fbafe55705817", name: "Other", categoryType: "Income" },
    {
      id: "68ad3991a53fbafe55705815",
      name: "💵 Other's proctor duty",
      categoryType: "Income",
    },
    {
      id: "68ad3991a53fbafe55705816",
      name: "🏅 Bonus",
      categoryType: "Income",
    },
    {
      id: "68ad3991a53fbafe55705818",
      name: "😘 Other's people TA",
      categoryType: "Income",
    },
    {
      id: "68ad3991a53fbafe55705813",
      name: "🤑 Allowance",
      categoryType: "Income",
    },
    {
      id: "68ad3991a53fbafe55705819",
      name: "🌐 work salary",
      categoryType: "Income",
    },
    {
      id: "68b2660281254fc33f42e886",
      name: "🤓 Bhaya USA",
      categoryType: "Income",
    },
    {
      id: "68c8cf24f4d4016ad65f41f0",
      name: "😎 Ronit",
      categoryType: "Income",
    },
  ];

  // Process the canonical categories first
  for (const category of canonicalCategories) {
    const normalized = normalizeForMatching(category.name);
    index[normalized] = {
      name: category.name,
      prettyName: prettifyCategory(category.name),
      id: category.id,
      categoryType: category.categoryType,
    };
  }

  // Process user-provided categories as fallback
  if (categories && categories.length) {
    for (const cat of categories) {
      if (!cat || !cat.name) continue;

      const normalized = normalizeForMatching(cat.name);
      // Only add if not already in the index
      if (!index[normalized]) {
        index[normalized] = {
          name: cat.name,
          prettyName: prettifyCategory(cat.name),
          id: cat._id || null,
          categoryType: cat.categoryType || "Expense",
        };
      }
    }
  }

  return index;
}

/**
 * Normalize a category name for matching by removing emojis, spaces, and converting to lowercase.
 *
 * @param {string} category - The category name to normalize
 * @returns {string} - The normalized category name for matching
 */
function normalizeForMatching(category) {
  if (!category) return "uncategorized";

  // Convert to string and normalize unicode
  let normalized = String(category).normalize("NFKC").trim();

  // Remove zero-width characters
  normalized = normalized.replace(/[\u200B-\u200D\uFEFF]/g, "");

  // Remove variation selectors & combining marks
  normalized = normalized.replace(/[\uFE00-\uFE0F]/g, "");
  normalized = normalized.replace(/\p{M}+/gu, "");

  // Remove all emojis
  normalized = normalized.replace(
    /[\p{Emoji_Presentation}\p{Emoji}\p{Extended_Pictographic}]/gu,
    ""
  );

  // Clean up spaces and punctuation
  normalized = normalized
    .replace(/[_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^[\-:.,]+/, "")
    .replace(/[\-:.,]+$/, "")
    .trim();

  // Convert to lowercase for case-insensitive matching
  return normalized.toLowerCase() || "uncategorized";
}

/**
 * Creates a display-friendly version of a category name by removing emojis
 * but preserving the original capitalization and formatting.
 *
 * @param {string} category - The category name to prettify
 * @returns {string} - The prettified category name for display
 */
export function prettifyCategory(category) {
  if (!category) return "Uncategorized";

  // Convert to string and normalize unicode
  let prettified = String(category).normalize("NFKC").trim();

  // Remove zero-width characters
  prettified = prettified.replace(/[\u200B-\u200D\uFEFF]/g, "");

  // Remove variation selectors & combining marks
  prettified = prettified.replace(/[\uFE00-\uFE0F]/g, "");
  prettified = prettified.replace(/\p{M}+/gu, "");

  // Remove all emojis
  prettified = prettified.replace(
    /[\p{Emoji_Presentation}\p{Emoji}\p{Extended_Pictographic}]/gu,
    ""
  );

  // Clean up spaces and punctuation
  prettified = prettified.replace(/[_]+/g, " ").replace(/\s+/g, " ").trim();

  return prettified || "Uncategorized";
}

/**
 * Classify a transaction category strictly against the canonical index.
 *
 * @param {string} category - The transaction category to classify
 * @param {Object} canonicalIndex - The index built with buildCanonicalIndex
 * @returns {string} - The canonical category name or "Uncategorized" if no match
 */
export function classifyCategory(category, canonicalIndex) {
  // Handle empty or undefined cases with a proper fallback
  if (!category || category === "") return "Uncategorized";
  if (!canonicalIndex) return "Uncategorized";

  // Clean the category string to handle edge cases
  const cleanCategory = String(category).trim();
  if (cleanCategory === "" || cleanCategory === ":" || cleanCategory === "-") {
    return "Uncategorized";
  }

  const normalized = normalizeForMatching(cleanCategory);

  // For special case where only ":" appears
  if (normalized === ":") return "Uncategorized";

  // Direct match in the canonical index
  if (canonicalIndex[normalized]) {
    return canonicalIndex[normalized].name;
  }

  // Check if the normalized category is a substring of any canonical key or vice versa
  const keys = Object.keys(canonicalIndex);

  // First try exact word match
  for (const key of keys) {
    // Skip empty keys
    if (!key || key.length === 0) continue;

    // Split both into words for matching
    const keyWords = key.split(/\s+/);
    const catWords = normalized.split(/\s+/);

    // Check for significant word overlaps
    const matches = keyWords.filter((word) => word && catWords.includes(word));
    if (
      matches.length > 0 &&
      matches.length >= Math.min(keyWords.length, catWords.length) * 0.5
    ) {
      return canonicalIndex[key].name;
    }
  }

  // If no word match, try substring match
  for (const key of keys) {
    if (!key || key.length === 0) continue;
    if (key.includes(normalized) || normalized.includes(key)) {
      return canonicalIndex[key].name;
    }
  }

  // Look for an "Other" category of matching type in the index
  const otherKey = Object.keys(canonicalIndex).find(
    (key) =>
      canonicalIndex[key].name.toLowerCase().includes("other") ||
      canonicalIndex[key].prettyName.toLowerCase() === "other"
  );

  if (otherKey) {
    return canonicalIndex[otherKey].name;
  }

  // No match found - return "Uncategorized" as a last resort
  return "Uncategorized";
}

// Export utility functions
export { normalizeForMatching as normalizeCategory };
