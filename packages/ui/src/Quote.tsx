const Quote = ({ quote }: { quote: string }) => {
  return (
    // TODO: Mobile First
    // limit max width
    // text align left
    <div className="text-xl tracking-wide w-2/3 max-w-s border-l-[#F7DF94] pl-10 border-l-8 mx-auto lg:text-4xl lg:max-w-3xl ">
      "{quote}"
    </div>
  );
};
export default Quote;
