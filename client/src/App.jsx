import { useState, useEffect } from 'react'
import MapView from './components/MapView'
import './index.css'

// Icon components (inline SVG to avoid dependencies)
const Icon = ({ d, size = 18, color = 'currentColor', fill = 'none' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedPin, setSelectedPin] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [wikiSummary, setWikiSummary] = useState(null)
  const [wikiLoading, setWikiLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Fetch all pins on load
  useEffect(() => {
    if (query !== '') return
    fetch('/api/pincodes')
      .then(r => r.json())
      .then(d => setResults(d.data || []))
      .catch(console.error)
  }, [query])

  // Search debounce
  useEffect(() => {
    if (!query) { setShowDropdown(false); return }
    const t = setTimeout(() => {
      fetch(`/api/pincodes/search?q=${query}`)
        .then(r => r.json())
        .then(d => { setResults(d.data || []); setShowDropdown(true) })
        .catch(console.error)
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  // Fetch Wikipedia summary when area is selected
  useEffect(() => {
    if (!selectedPin) return
    setWikiSummary(null)
    setWikiLoading(true)
    const mainArea = selectedPin.area.split(',')[0].trim()

    const tryFetch = async (title) => {
      const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
      if (!r.ok) throw new Error('not found')
      const d = await r.json()
      if (d.type === 'disambiguation') throw new Error('disambiguation')
      return d
    }

    tryFetch(mainArea)
      .catch(() => tryFetch(`${mainArea}, Bangalore`))
      .then(d => setWikiSummary(d))
      .catch(() => setWikiSummary(null))
      .finally(() => setWikiLoading(false))
  }, [selectedPin])

  const handleSelect = (item) => {
    setSelectedPin(item)
    setShowDropdown(false)
    setQuery(item.pincode)
  }

  const copyPincode = () => {
    navigator.clipboard.writeText(selectedPin.pincode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(selectedPin.area + ', Bangalore')}/@${selectedPin.lat},${selectedPin.lng},14z`
    window.open(url, '_blank')
  }

  const openStreetView = () => {
    const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${selectedPin.lat},${selectedPin.lng}`
    window.open(url, '_blank')
  }

  const openIndiaPost = () => {
    window.open(`https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx`, '_blank')
  }

  const openWikipedia = () => {
    if (wikiSummary?.content_urls?.desktop?.page)
      window.open(wikiSummary.content_urls.desktop.page, '_blank')
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className="sidebar-nav">
        <div className="logo-mark">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="black" stroke="none"/>
          </svg>
        </div>
        <div className="nav-item active" title="Explorer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        </div>
        <div className="nav-item" title="Map" onClick={() => setSelectedPin(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
        </div>
        <div className="nav-item" title="India Post" onClick={openIndiaPost}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
      </nav>

      <main className="main-content">
        {/* Map Section */}
        <section className="top-section">
          <div className="floating-search">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search pincode or area (e.g. 560034, Koramangala)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => { if (query) setShowDropdown(true) }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            {query && <button className="clear-btn" onClick={() => { setQuery(''); setSelectedPin(null); }}>✕</button>}
            {showDropdown && results.length > 0 && (
              <div className="search-dropdown">
                {results.map(item => (
                  <div key={item.id} className="dropdown-item" onMouseDown={() => handleSelect(item)}>
                    <span className="dd-pin">{item.pincode}</span>
                    <span className="dd-area">{item.area}</span>
                    <span className="dd-po">{item.post_office}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Map Stats Overlay */}
          {selectedPin && (
            <div className="map-stats-overlay">
              <div className="map-stat-pill">
                <span className="map-stat-label">Pincode</span>
                <span className="map-stat-value">{selectedPin.pincode}</span>
              </div>
              <div className="map-stat-pill">
                <span className="map-stat-label">Type</span>
                <span className="map-stat-value">{selectedPin.office_type?.replace(' Office','')}</span>
              </div>
              <div className="map-stat-pill">
                <span className="map-stat-label">Delivery</span>
                <span className="map-stat-value" style={{color: '#22c55e'}}>✓ Active</span>
              </div>
            </div>
          )}

          <div className="map-wrapper">
            <MapView results={results} selectedPincode={selectedPin} onMarkerClick={handleSelect} />
          </div>
        </section>

        {/* Bottom Cards */}
        <section className="bottom-section">
          {selectedPin ? (
            <>
              {/* Card 1: Post Office Details */}
              <div className="info-card">
                <div className="card-header">
                  <div className="card-title-row">
                    <div className="card-icon-wrap" style={{background: '#fff7ed'}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <span className="card-title">Post Office Info</span>
                  </div>
                  <span className={`delivery-badge ${selectedPin.delivery_status === 'Delivery' ? 'badge-green' : 'badge-gray'}`}>
                    {selectedPin.delivery_status}
                  </span>
                </div>

                <div className="po-grid">
                  <div className="po-field">
                    <div className="po-label">Post Office</div>
                    <div className="po-value">{selectedPin.post_office}</div>
                  </div>
                  <div className="po-field">
                    <div className="po-label">Office Type</div>
                    <div className="po-value">{selectedPin.office_type}</div>
                  </div>
                  <div className="po-field">
                    <div className="po-label">District</div>
                    <div className="po-value">{selectedPin.district}</div>
                  </div>
                  <div className="po-field">
                    <div className="po-label">State / Circle</div>
                    <div className="po-value">{selectedPin.state}</div>
                  </div>
                  <div className="po-field">
                    <div className="po-label">PIN Code</div>
                    <div className="po-value po-pincode">{selectedPin.pincode}</div>
                  </div>
                  <div className="po-field">
                    <div className="po-label">Division</div>
                    <div className="po-value">Bangalore South</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-row">
                  <button className="action-btn primary-btn" onClick={copyPincode}>
                    {copied ? '✓ Copied!' : '⎘ Copy PIN'}
                  </button>
                  <button className="action-btn secondary-btn" onClick={openGoogleMaps}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
                    Google Maps
                  </button>
                  <button className="action-btn secondary-btn" onClick={openStreetView}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
                    Street View
                  </button>
                  <button className="action-btn secondary-btn" onClick={openIndiaPost}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Track Mail
                  </button>
                </div>
              </div>

              {/* Card 2: Wikipedia Area Summary */}
              <div className="info-card wiki-card">
                <div className="card-header">
                  <div className="card-title-row">
                    <div className="card-icon-wrap" style={{background: '#f0fdf4'}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    </div>
                    <span className="card-title">Area Overview</span>
                  </div>
                  {wikiSummary && (
                    <button className="wiki-link-btn" onClick={openWikipedia}>Wikipedia ↗</button>
                  )}
                </div>

                {wikiLoading ? (
                  <div className="wiki-loading">
                    <div className="loading-dots"><span/><span/><span/></div>
                    <p>Fetching area info...</p>
                  </div>
                ) : wikiSummary ? (
                  <>
                    {wikiSummary.thumbnail?.source && (
                      <div className="wiki-thumb-container">
                        <img src={wikiSummary.thumbnail.source} alt={selectedPin.area} className="wiki-thumb" />
                        <div className="wiki-thumb-overlay">
                          <span>{selectedPin.area}</span>
                        </div>
                      </div>
                    )}
                    <p className="wiki-extract">{wikiSummary.extract}</p>
                  </>
                ) : (
                  <div className="wiki-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    <p>No Wikipedia article found for this area.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="info-card empty-card">
              <div className="empty-state-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
                <h3>Select any area on the map</h3>
                <p>Click a pin or search above to view post office details, area information, and quick actions.</p>
                <div className="area-chips">
                  {results.slice(0, 6).map(r => (
                    <button key={r.id} className="area-chip" onClick={() => handleSelect(r)}>{r.area.split(',')[0]}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
