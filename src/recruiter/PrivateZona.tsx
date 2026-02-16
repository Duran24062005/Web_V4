import { NavBar } from "../shared/components/NavBar";
import { navBarItems } from "../mock/data/navBarItems";
import { Footer } from "../shared/components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AboutMe } from "./components/AboutMe";
import { Github, Instagram, Linkedin } from "lucide-react";

export const PrivateZona = () => {

    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
    const token = localStorage.getItem('token');
    const firstName = localStorage.getItem('userName');
    const lastName = localStorage.getItem('userLastName');

    const navigate = useNavigate();

    useEffect(()=>{
        if (currentPath === '/privated-zone' && !token) {
            navigate('/')
        }
    }, [currentPath, navigate, token])

    const text: string[] = [];

  return (
    <div className="h-screen">
        <NavBar items={navBarItems} />
        <main className="flex justify-center">
            <div className="container">
                <div className="flex-col mt-8">
                    <h1 className="flex justify-center text-4xl">Hi there! <span className="text-3xl japonesa"> {firstName} {lastName}</span></h1>
                    <hr className="mt-2 border-violet-500" />
                    <p className="flex justify-center mt-2 text-lg">Welcome to my Web Site</p>
                </div>
                <section className="flex-col justify-center my-8">
                    <h2 className="text-2xl flex justify-center my-4">CV - Alexi Duran Gómez</h2>
                    <div className="flex justify-center">
                        <img src="https://raw.githubusercontent.com/Duran24062005/Web_V4/refs/heads/main/public/image/AlexiDuranGomez%20Tecnolog%C3%ADa%20Curr%C3%ADculum.png" alt="" />
                    </div>
                </section>
                <section className="flex-col justify-center my-8">
                    <h2 className="text-2xl flex justify-center my-4">Contacto</h2>
                    <div className="flex justify-center">
                        <ul>
                            <li><span className="font-bold">Cel:</span> 3216123545</li>
                            <li><span className="font-bold">email:</span> alexisdurangomez588@gmail.com</li>
                            <li><span className="font-bold">GitHub:</span> Duran24062005</li>
                            <div className="flex justify-center my-4 gap-4">
                                <a href="https://github.com/Duran24062005" className="text-gray-400 hover:text-white">
                                    <Github />
                                </a>
                                <a href="https://www.instagram.com/alexis_duran_dg/" className="text-gray-400 hover:text-pink-600">
                                    <Instagram />
                                {/* <i className="fab fa-instagram"></i> */}
                                </a>
                                <a href="https://www.linkedin.com/in/alexi-duran-gomez-6b17042a3/" className="text-gray-400 hover:text-blue-600">
                                    <Linkedin />
                                </a>
                            </div>
                        </ul>
                    </div>
                </section>
            </div>
        </main>
        <Footer />
    </div>
  )
}
