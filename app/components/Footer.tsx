// Footer.tsx
import Link from "next/link";
import Image from "next/image"; // Import next/image for optimization
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            {/* Mintly Logo (Replaces the "Mintly" text) */}
            <div className="flex items-center">
              {/* Image Component to render the logo */}
              <Image
                src="/Images/mintly_simple.jpg" // Correct path to your image
                alt="Mintly Logo"
                width={120} // Set appropriate width
                height={40} // Set appropriate height
                className="mr-4" // Optional, for spacing around the logo
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Empowering your financial future with AI
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/ronaldoemf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ronaldo-figueira-24910318a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400" />
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Zyra.</p>
          <div className="mt-2 space-x-4">
            <Link
              href="/privacy"
              className="hover:text-green-600 dark:hover:text-green-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-green-600 dark:hover:text-green-400"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
