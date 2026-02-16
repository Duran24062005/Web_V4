import { NavBar } from "../shared/components/NavBar";
import { navBarItems } from "../mock/data/navBarItems";
import { Footer } from "../shared/components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AboutMe } from "./components/AboutMe";

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
                    <h1 className="text-4xl">Hi there! <span className="text-3xl japonesa"> {firstName} {lastName}</span></h1>
                    <hr className="mt-2 border-violet-500" />
                    <p className="flex justify-center mt-2 text-lg">Welcome to my Web Site</p>
                </div>
                <AboutMe downText={text}/>
                <section>
                    <h2>CV - Alexi Duran Gómez</h2>
                </section>
            </div>
        </main>
        <Footer />
    </div>
  )
}
