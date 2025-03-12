"use client";

import { useState, useRef, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image"; // Import the Image component
import MintlyLogo from "@/images/mintly_logo.png"; // Adjust the path as necessary

const tabs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Features", path: "/#features" },
  { name: "Services", path: "/#services" },
  { name: "Contact", path: "/#contact" },
  { name: "Pricing", path: "/pricing" },
];

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInSection, setIsInSection] = useState("");
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "features", "services", "contact"];
      let currentSection = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }

      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        if (contactRect.top <= window.innerHeight / 2) {
          currentSection = "contact";
        }
      }

      setIsInSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let newActiveIndex = tabs.findIndex((tab) => tab.path === pathname);
    if (
      newActiveIndex === -1 &&
      pathname !== "/signin" &&
      pathname !== "/signup"
    ) {
      newActiveIndex = 0;
    }
    if (isInSection) {
      const sectionIndex = tabs.findIndex(
        (tab) => tab.path === `/#${isInSection}`,
      );
      if (sectionIndex !== -1) {
        newActiveIndex = sectionIndex;
      }
    }
    setActiveIndex(newActiveIndex);
  }, [pathname, isInSection]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleTabClick = async (index: number, path: string) => {
    setActiveIndex(index);
    if (path === "/") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        await router.push(path);
      }
    } else if (path.startsWith("/#")) {
      const sectionId = path.slice(2);
      if (pathname !== "/") {
        await router.push("/");
      }
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      await router.push(path);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-[1200px] h-[80px] mx-auto relative flex items-center justify-between px-4">
        <Link href="/" className="flex items-center -ml-8">
          {" "}
          {/* Increased negative margin here */}
          <Image
            src={MintlyLogo}
            alt="Mintly Logo"
            width={120} // Adjust the width as needed
            height={40} // Adjust the height as needed
            className="object-contain"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div
              className="absolute h-[30px] transition-all duration-300 ease-out bg-green-100 dark:bg-green-800/30 rounded-[6px] flex items-center"
              style={{
                ...hoverStyle,
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
            />

            {activeIndex !== -1 && (
              <div
                className="absolute bottom-[-2px] h-[2px] bg-green-600 dark:bg-green-400 transition-all duration-300 ease-out"
                style={activeStyle}
              />
            )}

            <div className="relative flex space-x-[6px] items-center">
              {tabs.map((tab, index) => (
                <div
                  key={tab.name}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                    index === activeIndex
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleTabClick(index, tab.path)}
                >
                  <div className="text-sm font-medium leading-5 whitespace-nowrap flex items-center justify-center h-full">
                    {tab.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/signin">
            <Button
              variant={pathname === "/signin" ? "default" : "outline"}
              size="sm"
              className={`${
                pathname === "/signin"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white dark:border-green-400 dark:text-green-400 dark:bg-gray-800 dark:hover:bg-green-400 dark:hover:text-gray-900"
              }`}
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant={pathname === "/signup" ? "default" : "outline"}
              size="sm"
              className={`${
                pathname === "/signup"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white dark:border-green-400 dark:text-green-400 dark:bg-gray-800 dark:hover:bg-green-400 dark:hover:text-gray-900"
              }`}
            >
              Sign Up
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-gray-600 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
          >
            {isDarkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
