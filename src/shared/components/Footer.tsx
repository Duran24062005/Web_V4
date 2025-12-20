import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 mt-auto z-20 relative">
      <div className="container mx-auto px-6 text-center">
        <p>
          Copyright &copy; 2024{" "}
          <span className="Alexi">Alexi Dg</span>.
        </p>
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
    </footer>
  );
};

