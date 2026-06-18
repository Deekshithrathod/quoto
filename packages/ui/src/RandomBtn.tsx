"use client";

type RandomBtnProps = {
  onClick?: () => void;
};

const RefreshIcon = () => (
  <svg
    aria-hidden="true"
    className="h-4 w-4 transition duration-200 group-hover:rotate-180"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <path d="M21 12a9 9 0 0 1-15.2 6.5" />
    <path d="M3 12A9 9 0 0 1 18.2 5.5" />
    <path d="M3 20v-6h6" />
    <path d="M21 4v6h-6" />
  </svg>
);

const RandomBtn = ({ onClick }: RandomBtnProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-10 items-center gap-2 rounded-full px-3 text-base text-[#4F4F4F] transition hover:bg-[#F7DF94]/25 hover:text-[#333333] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7DF94] dark:text-[#F2F2F2] dark:hover:bg-[#F7DF94]/20 dark:hover:text-white lg:text-base"
    >
      random
      <RefreshIcon />
    </button>
  );
};
export default RandomBtn;
