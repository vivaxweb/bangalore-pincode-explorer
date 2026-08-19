import { useState, useEffect } from 'react'
import MapView from './components/MapView'
import './index.css'

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedPincode, setSelectedPincode] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)

  // Fetch initial data for the map pins
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch('/api/pincodes')
        const data = await res.json()
        setResults(data.data || [])
      } catch (err) {
        console.error("Failed to fetch initial data", err)
      }
    }
    
    if (query === '') {
      fetchInitialData()
    }
  }, [query])

  // Search functionality
  useEffect(() => {
    if (!query) {
      setShowDropdown(false)
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(`/api/pincodes/search?q=${query}`)
        const data = await res.json()
        setResults(data.data || [])
        setShowDropdown(true)
      } catch (err) {
        console.error("Failed to search", err)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  const handleSelect = (item) => {
    setSelectedPincode(item)
    setShowDropdown(false)
    setQuery(item.pincode)
  }

  // Helper to generate deterministic data based on pincode string
  const generateStats = (pincodeStr) => {
    if (!pincodeStr) return null;
    let hash = 0;
    for (let i = 0; i < pincodeStr.length; i++) {
      hash = pincodeStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const positiveHash = Math.abs(hash);
    
    // Array of high quality neighborhood/building images
    const images = [
      "https://images.unsplash.com/photo-1595844730298-b960fac0f15f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Modern building
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // House with pool
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Business district
      "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Cozy street
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Apartment complex
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Luxury home
    ];

    return {
      age: (positiveHash % 30 + 1) + 'Y',
      visitors: ((positiveHash % 15000) + 1000).toLocaleString(),
      temp: (22 + (positiveHash % 10)) + '°C',
      members: ((positiveHash % 90) / 10 + 1).toFixed(1) + 'k',
      image: images[positiveHash % images.length]
    };
  }

  const dynamicStats = generateStats(selectedPincode?.pincode);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <nav className="sidebar-nav">
        <div className="logo-placeholder"></div>
        {/* Dummy icons to match inspiration */}
        <div className="nav-icon active" style={{mask: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\'/%3E%3Cpolyline points=\'9 22 9 12 15 12 15 22\'/%3E%3C/svg%3E") no-repeat center / contain', backgroundColor: 'var(--text-main)'}}></div>
        <div className="nav-icon" style={{mask: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\'/%3E%3Ccircle cx=\'12\' cy=\'10\' r=\'3\'/%3E%3C/svg%3E") no-repeat center / contain', backgroundColor: 'var(--text-muted)'}}></div>
        <div className="nav-icon" style={{mask: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Crect x=\'3\' y=\'3\' width=\'18\' height=\'18\' rx=\'2\' ry=\'2\'/%3E%3Cline x1=\'3\' y1=\'9\' x2=\'21\' y2=\'9\'/%3E%3Cline x1=\'9\' y1=\'21\' x2=\'9\' y2=\'9\'/%3E%3C/svg%3E") no-repeat center / contain', backgroundColor: 'var(--text-muted)'}}></div>
      </nav>

      <main className="main-content">
        {/* Top Section: Map with Floating Search */}
        <section className="top-section">
          {/* Floating Search Bar */}
          <div className="floating-search">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              className="search-input"
              placeholder="Search pincode or area..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => { if(query) setShowDropdown(true) }}
            />
            {showDropdown && results.length > 0 && (
              <div className="search-dropdown">
                {results.map(item => (
                  <div key={item.id} className="dropdown-item" onClick={() => handleSelect(item)}>
                    <strong>{item.pincode}</strong> - {item.area}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="map-wrapper">
             <MapView 
                results={results} 
                selectedPincode={selectedPincode} 
                onMarkerClick={(item) => setSelectedPincode(item)}
              />
          </div>
        </section>

        {/* Bottom Section: Details Cards */}
        <section className="bottom-section">
          {selectedPincode ? (
            <>
              {/* Location Card */}
              <div className="info-card">
                <div className="card-header">
                  <span className="card-title">Location Snapshot</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
                <div className="location-details">
                  <strong>Pincode:</strong> {selectedPincode.pincode}<br/>
                  <strong>Area:</strong> {selectedPincode.area}<br/>
                  Bangalore, Karnataka
                </div>
                <div className="stats-row">
                  <div className="stat-box">
                    <div className="stat-label">Avg Est. Age</div>
                    <div className="stat-value">{dynamicStats.age}</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-label">Daily Footfall</div>
                    <div className="stat-value">{dynamicStats.visitors}</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-label">Local Temp</div>
                    <div className="stat-value">{dynamicStats.temp}</div>
                  </div>
                </div>
              </div>
              
              {/* Dynamic Image Card */}
              <div className="info-card" style={{ padding: 0, overflow: 'hidden' }}>
                <img src={dynamicStats.image} alt="Neighborhood" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Tenants / Community Card */}
              <div className="info-card">
                <div className="card-header">
                  <span className="card-title">Community Growth</span>
                </div>
                <div className="location-details">
                  Join our growing network of active members and businesses in the {selectedPincode.area} district.
                </div>
                <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                  <div style={{ width: '100px', height: '100px', border: '8px solid var(--accent)', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopColor: '#edf2f7', transition: 'all 0.5s ease-in-out' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{dynamicStats.members}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>active</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="info-card" style={{ alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Select a pin on the map or search to view area analytics
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
