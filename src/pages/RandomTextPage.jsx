// src/pages/RandomTextPage.jsx
import React, { useState, useEffect } from 'react';
import '../style\/RandomTextPage.css';

const RandomTextPage = ({ sidebarOpen = true, isMobile = false }) => {
  const [screenSize, setScreenSize] = useState('');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('xsmall');
      else if (width < 600) setScreenSize('small');
      else if (width < 768) setScreenSize('medium');
      else if (width < 992) setScreenSize('tablet');
      else if (width < 1200) setScreenSize('desktop');
      else setScreenSize('large');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsiveClass = () => {
    if (isMobile) return 'mobile-view';
    if (!sidebarOpen) return 'with-sidebar sidebar-collapsed';
    return 'with-sidebar';
  };

  return (
    <div className={`random-text-page ${getResponsiveClass()}`}>
      <header className="page-header">
        <h1>Random Text Page</h1>
        <p className="subtitle">Fully  Design</p>
        <p className="subtitle visible-mobile">
          Screen: {screenSize} | {isMobile ? 'Mobile' : 'Desktop'}
        </p>
        <p className="subtitle hidden-mobile">
        </p>
      </header>
      
      <main className="page-content">
        <section className="text-section">
          <h2>First Random Paragraph</h2>
          <p className="paragraph">
            The café was exactly as she remembered it—the same worn oak counter, 
            the same brass espresso machine that hissed like a contented cat, 
            the same smell of ground coffee and cinnamon. For ten years, she had 
            traveled the world, tasting exotic brews in bustling cities, but nothing 
            compared to the bitter perfection of this place. The barista, now gray 
            at the temples, smiled in recognition. "The usual?" he asked, as if she 
            had never left.
          </p>
        </section>
        
        <section className="text-section">
          <h2>Second Random Paragraph</h2>
          <p className="paragraph">
            Beneath the city's glittering surface lay another world entirely. 
            Steam rose from grates in the sidewalk, carrying with it the whispers 
            of forgotten conversations. Tunnels branched like arteries, leading to 
            hidden chambers where artists painted murals that would never see daylight 
            and musicians composed symphonies for an audience of rats and echoes. 
            This underground kingdom operated on its own time, its own rules, unknown 
            to the people who walked the streets above.
          </p>
        </section>
        
        <section className="text-section">
          <h2>Third Random Paragraph</h2>
          <p className="paragraph">
            The clockmaker's shop was a museum of time itself. Shelves groaned under 
            the weight of ticking, tocking, chiming mechanisms—grandfather clocks 
            that had outlived their owners, pocket watches that had once counted 
            moments of great importance, and sundials that now gathered dust. In the 
            back room, the old man worked on his masterpiece: a clock that would tell 
            not just the hour, but the quality of the hour—whether it was one to be 
            savored or merely endured.
          </p>
        </section>
      </main>
      
      <footer className="page-footer">x
      </footer>
    </div>
  );
};

export default RandomTextPage;