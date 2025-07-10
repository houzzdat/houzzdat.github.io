import React, { useState, useCallback, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Chart data for Slide 8 (Revenue Growth)
const revenueData = {
  labels: ['Q2-24', 'Q3-24', 'Q4-24', 'Q1-25'],
  datasets: [
    {
      label: 'Revenue (₹ Crores)',
      data: [0.66, 1.02, 1.53, 2.61],
      backgroundColor: '#1D3E91',
      hoverBackgroundColor: '#0F1E50',
      borderRadius: 8,
    },
  ],
};
const revenueOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return '₹' + value + ' Cr';
        },
      },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (context) {
          return '₹' + context.parsed.y + ' Cr';
        },
      },
    },
  },
};

// Chart data for Slide 12 (Fund Deployment)
const deploymentData = {
  labels: ['Working Capital', 'Sales & Operations', 'Technology'],
  datasets: [
    {
      data: [70, 15, 15],
      backgroundColor: ['#0F1E50', '#F7931E', '#1D3E91'],
      borderWidth: 0,
    },
  ],
};
const deploymentOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  cutout: '60%',
};

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
  // Slide 6: Product
  {
    key: 5,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 6</div>
        <div className="slide-header">
          <h2>Platform Overview</h2>
          <p>Comprehensive digital platform streamlining the entire procurement process</p>
        </div>
        <div className="product-container">
          <div className="workflow-section">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <h3>Quote</h3>
              <p>Real-time pricing engine</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">2</div>
              <h3>Order</h3>
              <p>Credit underwriting & approval</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">3</div>
              <h3>Delivery</h3>
              <p>Tracking & quality assurance</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">4</div>
              <h3>Payment</h3>
              <p>Automated invoicing & collections</p>
            </div>
          </div>
          <div className="platform-features">
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <span>Real-time pricing engine</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <span>Credit underwriting & approval</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📍</div>
              <span>Delivery tracking & quality assurance</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🧾</div>
              <span>Automated invoicing & collections</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // Slide 7: Business Model
  {
    key: 6,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 7</div>
        <div className="slide-header">
          <h2>Multiple Revenue Streams</h2>
          <p>Diversified revenue model with strong unit economics</p>
        </div>
        <div className="business-model-container">
          <div className="revenue-streams">
            <div className="stream-item primary">
              <div className="stream-icon">🏪</div>
              <h3>Trading Margin</h3>
              <p className="stream-rate">4-8%</p>
              <p>on material sales</p>
              <span className="stream-label">Primary</span>
            </div>
            <div className="stream-item growth">
              <div className="stream-icon">💳</div>
              <h3>Credit Interest</h3>
              <p className="stream-rate">18-24%</p>
              <p>APR on working capital</p>
              <span className="stream-label">Growth driver</span>
            </div>
            <div className="stream-item emerging">
              <div className="stream-icon">🚛</div>
              <h3>Market-place commission</h3>
              <p className="stream-rate">1-3%</p>
              <p>on delivery value</p>
              <span className="stream-label">Emerging</span>
            </div>
          </div>
          <div className="unit-economics">
            <h3>Unit Economics</h3>
            <div className="economics-grid">
              <div className="metric">
                <span className="metric-label">AOV</span>
                <span className="metric-value">₹2.1L</span>
              </div>
              <div className="metric">
                <span className="metric-label">Gross Margin</span>
                <span className="metric-value">8.3%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Operating Margin</span>
                <span className="metric-value">4.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // Slide 8: Traction
  {
    key: 7,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 8</div>
        <div className="slide-header">
          <h2>Strong Growth & Unit Economics</h2>
          <p>Consistent quarter-over-quarter growth with improving margins</p>
        </div>
        <div className="traction-container">
          <div className="growth-chart">
            <h3>Revenue Growth</h3>
            <div className="chart-container" style={{ height: 250 }}>
              <Bar data={revenueData} options={revenueOptions} />
            </div>
          </div>
          <div className="key-metrics">
            <div className="metric-card">
              <h4>Current ARR</h4>
              <p className="metric-big">₹10.8 Cr</p>
              <span>FY25-26</span>
            </div>
            <div className="metric-card">
              <h4>QoQ Growth</h4>
              <p className="metric-big">71%</p>
              <span>Q4 to Q1</span>
            </div>
            <div className="metric-card">
              <h4>Gross Margin</h4>
              <p className="metric-big">8.3%</p>
              <span>Improving</span>
            </div>
            <div className="metric-card">
              <h4>Orders/Quarter</h4>
              <p className="metric-big">~105</p>
              <span>orders</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // Slide 9: Financials
  {
    key: 8,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 9</div>
        <div className="slide-header">
          <h2>Path to Profitability & Scale</h2>
          <p>Strong financial trajectory with clear path to sustainable profitability</p>
        </div>
        <div className="financials-container">
          <div className="projections-table">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Revenue</th>
                  <th>Gross Margin</th>
                  <th>EBITDA Margin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>FY25</td>
                  <td>₹10Cr</td>
                  <td>8%</td>
                  <td>4%</td>
                </tr>
                <tr>
                  <td>FY26</td>
                  <td>₹17Cr</td>
                  <td>8%</td>
                  <td>4%</td>
                </tr>
                <tr>
                  <td>FY27</td>
                  <td>₹30Cr</td>
                  <td>9%</td>
                  <td>5%</td>
                </tr>
                <tr>
                  <td>FY28</td>
                  <td>₹60Cr</td>
                  <td>9%</td>
                  <td>6%</td>
                </tr>
                <tr className="highlight">
                  <td>FY29</td>
                  <td>₹112Cr</td>
                  <td>10%</td>
                  <td>9%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="financial-highlights">
            <div className="highlight-item">
              <h4>Key Assumptions</h4>
              <ul>
                <li>Market share growth</li>
                <li>Margin improvement</li>
                <li>Operational leverage</li>
              </ul>
            </div>
            <div className="highlight-item">
              <h4>Milestones</h4>
              <ul>
                <li>Break-even achieved Q4-24</li>
                <li>Sustainable profitability</li>
                <li>Strong cash generation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // Slide 10: Go-to-Market
  {
    key: 9,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 10</div>
        <div className="slide-header">
          <h2>Proven Customer Acquisition Strategy</h2>
          <p>Multi-channel approach with strong customer conversion and retention</p>
        </div>
        <div className="gtm-container">
          <div className="acquisition-channels">
            <div className="channel-item">
              <div className="channel-icon">👥</div>
              <h3>Project MOUs</h3>
              <p>Tie-ups with Large Builders</p>
              <span className="conversion-rate">Predictable Sales</span>
            </div>
            <div className="channel-item">
              <div className="channel-icon">🤝</div>
              <h3>Supplier Partnerships</h3>
              <p>Cement manufacturer tie-ups</p>
              <span className="conversion-rate">Strategic partnerships</span>
            </div>
            <div className="channel-item">
              <div className="channel-icon">🌐</div>
              <h3>Inbound enquiry</h3>
              <p>Referrals & online leads</p>
              <span className="conversion-rate">Growing channel</span>
            </div>
          </div>
          <div className="case-study">
            <h3>Customer Success Story</h3>
            <div className="case-study-content">
              <p><strong>10,00,000 sq ft project</strong> saved <strong>10% cost</strong> & <strong>8 months timeline</strong> using Houzzdat's platform</p>
            </div>
          </div>
          <div className="expansion-plan">
            <h3>Geographic Expansion</h3>
            <p>Current: 1 state → Target: 4 states by FY26</p>
          </div>
        </div>
      </div>
    ),
  },
  // Slide 11: Team
  {
    key: 10,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 11</div>
        <div className="slide-header">
          <h2>Experienced Leadership Team</h2>
          <p>Domain expertise and proven track record in construction and technology</p>
        </div>
        <div className="team-container">
          <div className="founder-profiles">
            <div className="founder-card">
              <div className="founder-avatar">SR</div>
              <h3>Sushmith Reddy Kunta</h3>
              <p className="founder-title">Co-Founder & CEO</p>
              <p className="founder-background">MS University of Texas Dallas<br/>12+ years Construction & Operations</p>
            </div>
            <div className="founder-card">
              <div className="founder-avatar">RA</div>
              <h3>Raghu Ram Ambati</h3>
              <p className="founder-title">Co-Founder & COO</p>
              <p className="founder-background">MBA IIM Bangalore<br/>7+ years Product Management & Sales</p>
            </div>
          </div>
          <div className="team-strengths">
            <div className="strength-item">
              <h4>Domain Expertise</h4>
              <p>Deep understanding of construction industry challenges and needs</p>
            </div>
            <div className="strength-item">
              <h4>Proven Execution</h4>
              <p>Strong track record of building and scaling technology products</p>
            </div>
            <div className="strength-item">
              <h4>Strategic Network</h4>
              <p>Industry veterans & strategic investors as advisors</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // Slide 12: Funding Ask
  {
    key: 11,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 12</div>
        <div className="slide-header">
          <h2>Funding to Scale Leadership Position</h2>
          <p>Strategic investment to accelerate growth and market expansion</p>
        </div>
        <div className="funding-container">
          <div className="funding-ask">
            <h3>₹50 Crores ($6M) Series A</h3>
          </div>
          <div className="fund-deployment">
            <h4>Fund Deployment Plan</h4>
            <div className="deployment-chart" style={{ height: 300, width: 300 }}>
              <Doughnut data={deploymentData} options={deploymentOptions} />
            </div>
            <div className="deployment-details">
              <div className="deployment-item">
                <span className="deployment-color working-capital"></span>
                <div className="deployment-info">
                  <h5>Working Capital (90%)</h5>
                  <p>₹45Cr - Finance trade credit & inventory</p>
                </div>
              </div>
              <div className="deployment-item">
                <span className="deployment-color sales-ops"></span>
                <div className="deployment-info">
                  <h5>Sales & Operations (2%)</h5>
                  <p>₹1 Cr - Expand sales team & operations</p>
                </div>
              </div>
              <div className="deployment-item">
                <span className="deployment-color technology"></span>
                <div className="deployment-info">
                  <h5>Technology (4%)</h5>
                  <p>₹4 Cr - Platform development & automation</p>
                </div>
              </div>
            </div>
          </div>
          <div className="milestones">
            <h4>18-Month Milestones</h4>
            <div className="milestone-grid">
              <div className="milestone-item">
                <span className="milestone-number">10x</span>
                <p>Revenue Growth</p>
              </div>
              <div className="milestone-item">
                <span className="milestone-number">4</span>
                <p>State Expansion</p>
              </div>
              <div className="milestone-item">
                <span className="milestone-number">100+</span>
                <p>Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // Slide 13: Vision & Roadmap
  {
    key: 12,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 13</div>
        <div className="slide-header">
          <h2>Building India's Construction OS</h2>
          <p>Roadmap to become the backbone of India's construction industry</p>
        </div>
        <div className="vision-container">
          <div className="roadmap-timeline">
            <div className="timeline-item">
              <div className="timeline-year">FY 2025</div>
              <div className="timeline-content">
                <h4>Cement domination in 4 states</h4>
                <p>Establish market leadership in core cement procurement, Establish micro-vendor network</p>
              </div>
              <div className="timeline-icon">
                {/* Cement bag/factory SVG */}
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="7" y="12" width="22" height="14" rx="3" fill="#F7931E"/>
                  <rect x="11" y="8" width="14" height="6" rx="2" fill="#1D3E91"/>
                  <rect x="15" y="22" width="6" height="4" rx="1" fill="#fff"/>
                </svg>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">FY 2026</div>
              <div className="timeline-content">
                <h4>Steel & aggregates expansion, lending vertical</h4>
                <p>Diversify into adjacent construction materials and scale financing</p>
              </div>
              <div className="timeline-icon">
                {/* Steel bar/crane SVG */}
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="24" width="20" height="4" rx="2" fill="#1D3E91"/>
                  <rect x="12" y="10" width="12" height="4" rx="2" fill="#F7931E"/>
                  <rect x="16" y="6" width="4" height="18" rx="2" fill="#0F1E50"/>
                </svg>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">FY 2027</div>
              <div className="timeline-content">
                <h4>Pan-India presence, ₹1000Cr revenue run rate</h4>
                <p>National scale with comprehensive construction material ecosystem & One-stop construction ERP</p>
              </div>
              <div className="timeline-icon">
                {/* Map/graph trending up SVG */}
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="28" width="6" height="4" rx="2" fill="#1D3E91"/>
                  <rect x="14" y="20" width="6" height="12" rx="2" fill="#F7931E"/>
                  <rect x="22" y="12" width="6" height="20" rx="2" fill="#0F1E50"/>
                  <polyline points="8,28 17,21 25,13" stroke="#F7931E" strokeWidth="2.5" fill="none"/>
                  <circle cx="25" cy="13" r="2" fill="#F7931E"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="vision-statement">
            <h3>Our Vision</h3>
            <p>"To be the backbone of India's construction industry through technology-enabled procurement and financing"</p>
          </div>
        </div>
      </div>
    ),
  },
  // Slide 14: AI-Powered Construction Commerce & Credit Infrastructure
  {
    key: 13,
    content: (
      <div className="slide-content">
        <div className="slide-number">Slide 14</div>
        <div className="slide-header">
          <h2>AI-Powered Construction Commerce &amp; Credit Infrastructure</h2>
          <p>Bringing intelligence to procurement and construction credit</p>
        </div>
        <div className="ai-infra-container">
          <div className="ai-infra-columns">
            {/* Left Column: Key AI Applications */}
            <div className="ai-infra-left">
              <h3>Key AI Applications</h3>
              <ul className="ai-app-list">
                <li><strong>Dynamic Pricing Engine</strong></li>
                <li><strong>Smart Credit Underwriting</strong></li>
                <li><strong>Procurement Automation</strong></li>
                <li><strong>Fraud Detection</strong></li>
                <li><strong>Demand Forecasting</strong></li>
                <li><strong>Customer Insights</strong></li>
              </ul>
            </div>
            {/* Right Column: Visual/Highlights */}
            <div className="ai-infra-right">
              <div className="ai-callout-box">
                <p className="ai-quote">"Procurement that learns. Credit that trusts. Execution that flows."</p>
                <p className="ai-explainer">Houzzdat's AI models continuously improve using proprietary transaction and fulfillment data, building a data moat that powers smarter procurement and risk decisions over time.</p>
                <div className="ai-stat">Credit approval time reduced from <strong>2 days</strong> to <strong>10 minutes</strong>.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
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
