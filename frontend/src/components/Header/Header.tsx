import { useState } from "react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDarkMode(true);
    } else {
      html.classList.add('dark');
      setIsDarkMode(false);
    }
  };

  return (
    <header className="w-full p-4 bg-white border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/tmb.jpg"
            alt="Logo TMB Educação"
            className="w-14 h-14 rounded-full"
          />
          <span className="text-xl font-semibold md:text-2xl lg:text-3xl text-gray-700 dark:text-white">TMB Educação</span>
        </div>
        <div className="flex items-center ml-10">
          <div className="relative">
            <button
              onClick={toggleTheme}
                className="p-2 w-10 h-10 flex items-center justify-center rounded-full 
                bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {isDarkMode ? (
                <i className="fa fa-sun text-gray-600" />
              ) : (
                <i className="fa fa-moon text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
