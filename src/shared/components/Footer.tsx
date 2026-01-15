import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bottom-0 left-0 w-full bg-gray-900 py-2 z-40">
      <div className="conatiner mx-auto px-6 justify-center">
        <div className="flex flex-col md:flex-row lg:justify-between md:w-[60vh]">
          <div className="flex justify-center space-x-4 mt-4">
            <p className="text-[0.2vh] md:text-sm">
              Copyright &copy; 2024{" "}
              <span className="Alexi md:text-lg">Alexi Dg</span>.
            </p>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://www.facebook.com/alexis.duran.54772728" className="text-gray-400 hover:text-blue-600">
              <Facebook />
              {/* <i className="fab fa-facebook"></i> */}
            </a>
            <a href="https://github.com/Duran24062005" className="text-gray-400 hover:text-white">
              <Github />
              {/* <i className="fab fa-github"></i> */}
            </a>
            <a href="https://www.instagram.com/alexis_duran_dg/" className="text-gray-400 hover:text-pink-600">
              <Instagram />
              {/* <i className="fab fa-instagram"></i> */}
            </a>
            <a href="https://www.linkedin.com/in/alexi-duran-gomez-6b17042a3/" className="text-gray-400 hover:text-blue-600">
              <Linkedin />
              {/* <i className="fab fa-linkedin"></i> */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

