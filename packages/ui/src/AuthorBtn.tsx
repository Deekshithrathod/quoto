const ArrowRightIcon = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5 translate-x-[-4px] opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const AuthorBtn = ({
  author,
  genre,
  href,
}: {
  author: string;
  genre: string;
  href: string;
}) => {
  return (
    <a
      href={href}
      className="quote-enter group mt-8 flex w-full items-center justify-between bg-transparent p-6 pl-6 text-[#4F4F4F] transition duration-200 hover:bg-[#333333] hover:text-[#F2F2F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7DF94] active:scale-[0.99] dark:text-[#C9C9C9] dark:hover:bg-[#F7DF94] dark:hover:text-[#333333] lg:mt-12 lg:p-10"
    >
      <span className="flex min-w-0 flex-col items-start">
        <span className="max-w-full truncate text-xl capitalize">{author}</span>
        <span className="text-sm lowercase text-[#828282] transition group-hover:text-[#d9d9d9] dark:group-hover:text-[#4F4F4F]">
          {genre}
        </span>
      </span>
      <ArrowRightIcon />
    </a>
  );
};
export default AuthorBtn;
