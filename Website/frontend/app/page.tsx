'use server';

import Navbar from '@/components/navbar';
import ExploreSection from '@/components/mainpage/ExploreSection';
import InfoSection from '@/components/mainpage/InfoSection';
import LiveChatPresentSection from '@/components/mainpage/LiveChatPresentSection';
import ApiComponent from '@/components/mainpage/ApiSection';
import MoreComingComponent from '@/components/mainpage/MoreComingSection';
import AccountSwitchComponent from '@/components/mainpage/SwitchExplainSection';
import AboutMeSection from '@/components/dashboard/sections/AboutAuthorSection';
import Footer from '@/components/footer';
import ContactUs from '@/components/mainpage/ContactUs';
import Social from '@/components/mainpage/Gallery';
import NavigationBar from '@/components/Navbar/NavigationBar';

export default async function Home() {
  return (
    <main>
      <NavigationBar />
      <ExploreSection />
      <InfoSection />
      <LiveChatPresentSection />
      <ApiComponent />
      <Social />
      <AccountSwitchComponent />
      <MoreComingComponent />
      <AboutMeSection />
      <ContactUs />
      <Footer />
    </main>
  );
}
