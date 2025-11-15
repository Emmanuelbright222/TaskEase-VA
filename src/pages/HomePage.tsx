import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import Projects from '../sections/Projects';
import Testimonials from '../sections/Testimonials';
import Tools from '../sections/Tools';
import Pricing from '../sections/Pricing';
import Blog from '../sections/Blog';
import Contact from '../sections/Contact';

const HomePage = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <Tools />
      <Pricing />
      <Blog />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default HomePage;
