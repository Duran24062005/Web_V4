import { NavBar } from "../shared/components/NavBar";
import { navBarItems } from "../mock/data/navBarItems";
import { Footer } from "../shared/components/Footer";

export const PrivateZona = () => {
    const firstName = localStorage.getItem('userName');
    const lastName = localStorage.getItem('userLastName');
  return (
    <>
        <NavBar items={navBarItems} />
        <main className="flex justify-center h-screen">
            <div className="flex-col mt-8">
                <h1 className="text-4xl">Hi there! <span className="text-3xl japonesa"> {firstName} {lastName}</span></h1>
                <hr className="mt-2 border-violet-500" />
                <p className="flex justify-center mt-2 text-lg">Welcome to my Web Site</p>
            </div>
        </main>
        <Footer />
    </>
  )
}
