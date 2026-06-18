const Footer = ({ classes }: { classes?: string }) => {
  return (
    <div
      className={`text-center ${classes} w-full py-4 text-sm font-medium text-[#828282]`}
    >
      created by{" "}
      <a
        href="https://github.com/DeekshithRathod"
        className="underline font-bold"
        rel="noreferrer"
        target="_blank"
      >
        Deekshith Rathod
      </a>
    </div>
  );
};
export default Footer;
