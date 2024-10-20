import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-white py-4 w-full">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-around items-center">

          {/* Developers Section */}
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <img 
              src="https://www.akshaybhaltilak.live/assets/images/my%20img.jpg" 
              alt="Akshay Bhaltilak"
              className="rounded-full mb-2 h-16 w-16 border-4 border-white shadow-lg"
            />
            <h3 className="text-lg font-bold">Akshay Bhaltilak</h3>
            <p className="text-xs">Full-Stack Developer</p>
            <a 
              href="https://www.akshaybhaltilak.live"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition duration-300 text-xs mt-1"
            >
              My Portfolio
            </a>
          </div>

          <div className="flex flex-col items-center mb-4 md:mb-0">
            <img 
              src="https://via.placeholder.com/100" // Replace with Shriyash's image URL
              alt="Shriyash Rulhe"
              className="rounded-full mb-2 h-16 w-16 border-4 border-white shadow-lg"
            />
            <h3 className="text-lg font-bold">Shriyash Rulhe</h3>
            <p className="text-xs">Full-Stack Developer</p>
            <a 
              href="https://www.shriyashrulhe.live" // Replace with Shriyash's portfolio link
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition duration-300 text-xs mt-1"
            >
              Shriyash's Portfolio
            </a>
          </div>

          {/* Webreich Information */}
          <div className="flex flex-col items-center">
            <h4 className="text-md font-semibold mb-1">About Webreich Web Services</h4>
            <p className="text-xs text-center max-w-xs">
              We, Akshay Bhaltilak and Shriyash Rulhe, are the developers of this website and co-founders of Webreich Web Services. 
              Our mission is to provide top-notch web development and digital solutions to businesses.
            </p>
            <p className="text-xs mt-1">Contact: <a href="mailto:webreich@gmail.com" className="text-white hover:text-gray-300">webreich@gmail.com</a></p>
          </div>

        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-xs">&copy; {new Date().getFullYear()} Akshay Bhaltilak & Shriyash Rulhe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
