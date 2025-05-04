import React, { useState, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  backUrl?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  showBackButton = true,
  backUrl = '/'
}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {showBackButton && (
        <div className="mt-5 px-5 text-gray-600 text-sm">
          <a href={backUrl}>
            <FontAwesomeIcon icon={faChevronLeft} size="xs" /> back
          </a>
        </div>
      )}

      <div className="flex flex-1 relative">
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:py-5 md:mr-[60px]">
          <h1 className="text-xl md:text-2xl font-bold mb-3 md:pl-[50px] lg:pl-0 pb-3">
            {title}
          </h1>

          <div className="space-y-4 md:space-y-8 md:pl-[50px]">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;