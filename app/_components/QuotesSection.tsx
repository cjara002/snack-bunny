const QUOTES = [
  {
    text: "Finally a tracker that doesn't make me feel like garbage on a Tuesday.",
    author: "Maya",
    location: "NYC",
  },
  {
    text: "I named mine Hank. Hank judges me silently. It's working.",
    author: "Devon",
    location: "Austin",
  },
  {
    text: "Took me three days to realize I snack mostly out of boredom. Wild.",
    author: "Priya",
    location: "London",
  },
  {
    text: "My bunny got to stage 5 once. We do not speak of that day.",
    author: "Jordan",
    location: "Toronto",
  },
];

const QuotesSection = () => (
  <section className="py-14">
    <div className="text-center text-xs font-bold tracking-[0.08em] uppercase text-[#E07A5F] mb-3">
      Bunny owners say
    </div>
    <h2 className="text-center font-black text-[clamp(28px,7vw,38px)] leading-[1.05] tracking-tight text-[#4A3728] mb-9 max-w-[16ch] mx-auto">
      People <span className="text-[#E07A5F]">love</span> their chonky boi
    </h2>

    <div className="-mx-5 md:mx-0 overflow-x-auto no-scrollbar snap-x snap-mandatory px-5 md:px-0 pb-6 pt-2">
      <div className="flex gap-[14px] w-max">
        {QUOTES.map(({ text, author, location }) => (
          <div
            key={author}
            className="w-[280px] flex-shrink-0 snap-start bg-white rounded-[1.5rem] p-[22px_20px] shadow-sm"
          >
            <div className="text-[#FBBF24] text-sm tracking-[1px] mb-2">
              ★★★★★
            </div>
            <p className="font-bold text-[15px] leading-[1.45] text-[#4A3728] mb-[14px]">
              &ldquo;{text}&rdquo;
            </p>
            <div className="flex items-center gap-[10px] text-[13px] text-[#A08070] font-bold">
              <div className="w-8 h-8 rounded-full bg-[#FFE8DC] flex items-center justify-center font-black text-[13px] text-[#E07A5F] flex-shrink-0">
                {author[0]}
              </div>
              <span>
                {author} · {location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default QuotesSection;
