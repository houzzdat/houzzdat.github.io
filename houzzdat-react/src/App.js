import React, { useState, useCallback, useEffect } from 'react';

const slidesData = [
  // Slide 1: Cover
  {
    key: 0,
    content: (
      <div className="slide-content cover-slide">
        <div className="slide-number">Slide 1</div>
        <div className="logo-section">
          <div className="logo">
            <div className="logo-icon">H</div>
            <h1>Houzzdat</h1>
          </div>
        </div>
        <div className="tagline-section">
          <h2>Building the future of construction material procurement in India</h2>
          <p className="subtitle">Investor Presentation • July 2025</p>
        </div>
        <div className="cover-visual">
          <div className="construction-icon">🏗️</div>
        </div>
      </div>
    ),
  },
  // Slide 2: Problem
  {
    key: 1,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 2</div>
        <div className="slide-header">
          <h2>Construction Procurement is Broken</h2>
          <p>Builders face critical challenges that impact project timelines and profitability</p>
        </div>
        <div className="problem-grid">
          <div className="problem-item">
            <div className="problem-icon">📈</div>
            <h3>Price Volatility</h3>
            <p>Cement prices fluctuate 25-30% without notice</p>
          </div>
          <div className="problem-item">
            <div className="problem-icon">🔗</div>
            <h3>Fragmented Supply</h3>
            <p>1000s of unorganized suppliers, no visibility</p>
          </div>
          <div className="problem-item">
            <div className="problem-icon">⏰</div>
            <h3>Credit Delays</h3>
            <p>60-90 day payment cycles strain working capital</p>
          </div>
          <div className="problem-item">
            <div className="problem-icon">🚚</div>
            <h3>Delivery Issues</h3>
            <p>30-40% of deliveries delayed causing project overruns</p>
          </div>
        </div>
      </div>
    ),
  },
  // Slide 3: Solution
  {
    key: 2,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 3</div>
        <div className="slide-header">
          <h2>End-to-End Procurement Excellence</h2>
          <p>Houzzdat transforms construction material procurement through technology and partnerships</p>
        </div>
        <div className="solution-grid">
          <div className="solution-item">
            <div className="solution-icon">💰</div>
            <h3>Transparent Pricing</h3>
            <p>Real-time rates from verified suppliers</p>
          </div>
          <div className="solution-item">
            <div className="solution-icon">💳</div>
            <h3>Credit Solutions</h3>
            <p>Flexible payment terms up to 60 days</p>
          </div>
          <div className="solution-item">
            <div className="solution-icon">✅</div>
            <h3>Assured Delivery</h3>
            <p>Direct manufacturer partnerships & logistics</p>
          </div>
          <div className="solution-item">
            <div className="solution-icon">📱</div>
            <h3>Digital Platform</h3>
            <p>Quote → Order → Track → Pay workflow</p>
          </div>
        </div>
        <div className="process-flow">
          <div className="flow-step">Quote</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">Order</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">Track</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">Pay</div>
        </div>
      </div>
    ),
  },
  // Slide 4: Vision
  {
    key: 3,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 4</div>
        <div className="slide-header">
          <h2>Our Vision: India's Construction OS, Powered by Vertical AI</h2>
        </div>
        <div className="vision-statement" style={{ marginBottom: 32 }}>
          <p>"To be India's most trusted construction partner — a vertical AI platform that simplifies procurement, project management, and construction finance, all in one place."</p>
        </div>
        <ul className="vision-bullets" style={{ maxWidth: 600, margin: '0 auto 40px auto', fontSize: 18, color: '#0F1E50', lineHeight: 2, listStyle: 'disc inside', fontWeight: 500 }}>
          <li>Discover reliable construction partners</li>
          <li>Procure materials seamlessly with real-time insights</li>
          <li>Access project-based embedded credit</li>
          <li>Track site-level progress, payments, and budgets</li>
        </ul>
        <div className="vision-tagline" style={{ background: 'linear-gradient(135deg, #F7931E 0%, #FF8C00 100%)', color: '#fff', borderRadius: 14, boxShadow: '0 4px 16px rgba(247,147,30,0.13)', padding: '18px 24px', maxWidth: 500, margin: '0 auto', fontSize: 18, fontStyle: 'italic', textAlign: 'center', fontWeight: 600 }}>
          "Procurement that learns. Credit that trusts. Execution that flows."
        </div>
      </div>
    ),
  },
  // Slide 5: Market Opportunity
  {
    key: 4,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 5</div>
        <div className="slide-header">
          <h2>Massive & Growing Market</h2>
          <p>India's construction materials market presents enormous opportunity</p>
        </div>
        <div className="market-container">
          <div className="market-circles">
            <div className="market-circle tam">
              <div className="circle-content">
                <h3>TAM</h3>
                <p>$42.58B</p>
                <span>Indian Construction Materials</span>
              </div>
            </div>
            <div className="market-circle sam">
              <div className="circle-content">
                <h3>SAM</h3>
                <p>$2.4B</p>
                <span>Building Materials market</span>
              </div>
            </div>
            <div className="market-circle som">
              <div className="circle-content">
                <h3>SOM</h3>
                <p>$240M</p>
                <span>Target Market</span>
              </div>
            </div>
          </div>
          <div className="market-stats">
            <div className="stat-item">
              <h4>Cement Market CAGR</h4>
              <p className="stat-value">7.6%</p>
            </div>
            <div className="stat-item">
              <h4>Construction Materials CAGR</h4>
              <p className="stat-value">4.3%</p>
            </div>
            <div className="stat-item">
              <h4>Government Support</h4>
              <p className="stat-value">Smart Cities, PMAY, Infrastructure Pipeline</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // ... Continue for slides 6-13 ...
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slidesData.length;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') setCurrentSlide((s) => Math.max(0, s - 1));
      if (e.key === 'ArrowRight') setCurrentSlide((s) => Math.min(totalSlides - 1, s + 1));
    },
    [totalSlides]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="presentation-container">
      {/* Slide Navigation */}
      <div className="slide-navigator">
        <div className="slide-dots">
          {slidesData.map((_, idx) => (
            <span
              key={idx}
              className={`dot${idx === currentSlide ? ' active' : ''}`}
              data-slide={idx}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
        <div className="slide-counter">
          <span className="current-slide">{currentSlide + 1}</span> / <span className="total-slides">{totalSlides}</span>
        </div>
      </div>

      {/* Slides */}
      {slidesData.map((slide, idx) => (
        <div
          key={slide.key}
          className={`slide${idx === currentSlide ? ' active' : ''}${idx < currentSlide ? ' prev' : ''}`}
          data-slide={idx}
        >
          {slide.content}
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="navigation-controls">
        <button
          className="nav-btn"
          onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
          disabled={currentSlide === 0}
          id="prevBtn"
        >
          Previous
        </button>
        <button
          className="nav-btn"
          onClick={() => setCurrentSlide((s) => Math.min(totalSlides - 1, s + 1))}
          disabled={currentSlide === totalSlides - 1}
          id="nextBtn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
