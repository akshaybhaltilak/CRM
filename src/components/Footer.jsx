import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-white py-6 w-full">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-around items-center gap-8">

          {/* Akshay's Section */}
          <div className="flex flex-col items-center">
            <img
              src="https://www.akshaybhaltilak.live/assets/images/my%20img.jpg"
              alt="Akshay Bhaltilak"
              className="rounded-full mb-3 h-20 w-20 border-4 border-white shadow-lg transition-transform transform hover:scale-105"
            />
            <h3 className="text-lg font-bold hover:text-gray-200 transition duration-300 cursor-pointer">
              Akshay Bhaltilak
            </h3>
            <p className="text-xs">Full-Stack Developer</p>
            <a
              href="https://www.akshaybhaltilak.live"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-gray-300 text-sm transition duration-300"
            >
              Visit Portfolio
            </a>
          </div>

          {/* Shriyash's Section */}
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/100" // Replace with Shriyash's real image URL
              alt="Shriyash Rulhe"
              className="rounded-full mb-3 h-20 w-20 border-4 border-white shadow-lg transition-transform transform hover:scale-105"
            />
            <h3 className="text-lg font-bold hover:text-gray-200 transition duration-300 cursor-pointer">
              Shriyash Rulhe
            </h3>
            <p className="text-xs">Full-Stack Developer</p>
            <a
              href="https://www.shriyashrulhe.live"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-gray-300 text-sm transition duration-300"
            >
              Visit Portfolio
            </a>
          </div>

          {/* Webreich Information */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-md font-semibold mb-2 underline decoration-white decoration-2">
              About Webreich Web Services
            </h4>
            <p className="text-xs max-w-xs leading-relaxed">
              We, Akshay Bhaltilak and Shriyash Rulhe, co-founders of Webreich Web Services, are committed to delivering exceptional web solutions for businesses to grow in the digital world.
            </p>
            <p className="text-xs mt-2">
              Contact Us:{' '}
              <a
                href="mailto:webreich@gmail.com"
                className="text-gray-200 hover:text-gray-300 transition duration-300"
              >
                webreich@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 text-center border-t border-gray-200 pt-4">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} <span className="font-semibold">Akshay Bhaltilak</span> &{' '}
          <span className="font-semibold">Shriyash Rulhe</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
