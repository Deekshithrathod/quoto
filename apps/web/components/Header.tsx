"use client";
import RandomBtn from "@repo/ui/src/RandomBtn";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleRandomQuote = () => {
    if (pathname !== "/") {
      router.push("/");
      return;
    }
    router.refresh();
  };

  return (
    <header>
      <nav className="flex items-center justify-end gap-3 pt-8">
        <ThemeToggle />
        <RandomBtn onClick={handleRandomQuote} />
      </nav>
    </header>
  );
};

export default Header;
