import { NavBar } from '../shared/components/NavBar';
import { navBarItems } from '../mock/data/navBarItems';
import { Footer } from '../shared/components/Footer';
import { ServiceComponent } from './components/ServiceComponent';

export const Services = () => {

  return (
    <>
    <NavBar items={navBarItems}/>
    <ServiceComponent />
    <Footer/>
    </>
  );
};
