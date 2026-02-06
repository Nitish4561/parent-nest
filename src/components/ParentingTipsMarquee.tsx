import { cn } from "../lib/utils";
import { Marquee } from "./Marquee";

const parentingTips = [
  {
    category: "Pregnancy Tips",
    tip: "Stay hydrated and take prenatal vitamins daily for optimal baby development",
    icon: "🤰",
    color: "from-pink-500 to-rose-400"
  },
  {
    category: "Newborn Care",
    tip: "Skin-to-skin contact helps regulate baby's temperature and promotes bonding",
    icon: "👶",
    color: "from-blue-500 to-cyan-400"
  },
  {
    category: "Toddler Development",
    tip: "Read together daily - it builds vocabulary and strengthens your connection",
    icon: "📚",
    color: "from-green-500 to-emerald-400"
  },
  {
    category: "Pregnancy Tips",
    tip: "Gentle exercise like walking can ease pregnancy discomfort and boost energy",
    icon: "🚶‍♀️",
    color: "from-purple-500 to-violet-400"
  },
  {
    category: "Newborn Care",
    tip: "Follow safe sleep guidelines: back sleeping, firm mattress, no loose bedding",
    icon: "😴",
    color: "from-indigo-500 to-blue-400"
  },
  {
    category: "Toddler Development",
    tip: "Encourage independence by letting them help with simple household tasks",
    icon: "🧹",
    color: "from-orange-500 to-amber-400"
  },
  {
    category: "Pregnancy Tips",
    tip: "Practice relaxation techniques to manage stress and prepare for labor",
    icon: "🧘‍♀️",
    color: "from-teal-500 to-cyan-400"
  },
  {
    category: "Newborn Care",
    tip: "Trust your instincts - you know your baby better than anyone else",
    icon: "💝",
    color: "from-red-500 to-pink-400"
  },
  {
    category: "Toddler Development",
    tip: "Set consistent routines - they provide security and help with behavior",
    icon: "⏰",
    color: "from-yellow-500 to-orange-400"
  },
  {
    category: "Pregnancy Tips",
    tip: "Attend prenatal classes to prepare for childbirth and early parenting",
    icon: "🎓",
    color: "from-emerald-500 to-green-400"
  },
  {
    category: "Newborn Care",
    tip: "Burp baby frequently during feeding to prevent gas and discomfort",
    icon: "🍼",
    color: "from-sky-500 to-blue-400"
  },
  {
    category: "Toddler Development",
    tip: "Use positive reinforcement to encourage good behavior instead of punishment",
    icon: "⭐",
    color: "from-violet-500 to-purple-400"
  }
];

const firstRow = parentingTips.slice(0, parentingTips.length / 2);
const secondRow = parentingTips.slice(parentingTips.length / 2);

const TipCard = ({
  category,
  tip,
  icon,
  color,
}: {
  category: string;
  tip: string;
  icon: string;
  color: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6 transition-all hover:scale-105",
        // light styles
        "border-gray-200 bg-white hover:bg-gray-50",
        // dark styles
        "dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-3">
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r text-xl",
          color
        )}>
          {icon}
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-gray-900 dark:text-white">
            {category}
          </figcaption>
        </div>
      </div>
      <blockquote className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {tip}
      </blockquote>
    </figure>
  );
};

export function ParentingTipsMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-8">
      <Marquee pauseOnHover className="[--duration:40s]">
        {firstRow.map((tip, index) => (
          <TipCard key={`first-${index}`} {...tip} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s]">
        {secondRow.map((tip, index) => (
          <TipCard key={`second-${index}`} {...tip} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-gray-800"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-gray-800"></div>
    </div>
  );
}