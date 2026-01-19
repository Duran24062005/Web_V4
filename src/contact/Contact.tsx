import { navBarItems } from "../mock/data/navBarItems"
import { Footer } from "../shared/components/Footer"
import { NavBar } from "../shared/components/NavBar"
import { ContactComponent } from "./components/ContactComponent"


export const Contact = () => {
    
  return (
    <>
      <NavBar items={navBarItems} />
      <ContactComponent />
      <Footer />
    </>
  )
}
