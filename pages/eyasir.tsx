import Head from 'next/head';
import Biography from '../components/martyr/Biography';
import Timeline from '../components/martyr/Timeline';
import DeathDetails from '../components/martyr/DeathDetails';
import Gallery from '../components/martyr/Gallery';
import References from '../components/martyr/References';
import TopNav from '../components/martyr/TopNav';
import RememberStrip from '../components/martyr/RememberStrip';
import Hero from '../components/martyr/Hero';
import Footer from '../components/martyr/Footer';
import { LanguageProvider } from '../contexts/LanguageContext';
import { martyrData } from '../data/martyr';

export default function EyasirPage() {
  return (
    <LanguageProvider>
      <Head>
        <title>Shohid Eyasir Sarker — A July 2024 Martyr</title>
        <meta
          name="description"
          content="Memorial for Shohid Md Eyasir Sarker, a 17-year-old student martyred during Bangladesh's July 2024 uprising."
        />
      </Head>
      <div id="top" className="martyr-page min-h-screen">
        <TopNav />
        <main>
          <Hero data={martyrData} />
          <RememberStrip />
          <Biography data={martyrData} />
          <Timeline data={martyrData} />
          <DeathDetails data={martyrData} />
          <Gallery data={martyrData} />
          <References data={martyrData} />
        </main>
        <Footer data={martyrData} />
      </div>
    </LanguageProvider>
  );
}
