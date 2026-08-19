import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'
import MapView from './components/MapView'
import './index.css'

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedPincode, setSelectedPincode] = useState(null)

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/pincodes')
        const data = await res.json()
        setResults(data.data || [])
      } catch (err) {
        console.error("Failed to fetch initial data", err)
      } finally {
        setLoading(false)
      }
    }
    
    if (query === '') {
      fetchInitialData()
    }
  }, [query])

  useEffect(() => {
    if (!query) return;

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/pincodes/search?q=${query}`)
        const data = await res.json()
        setResults(data.data || [])
      } catch (err) {
        console.error("Failed to search", err)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  return (
    <>
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>
      
      <div className="app-wrapper">
        <header>
          <h1>Bangalore Pincode Explorer</h1>
          <p className="subtitle">Premium Interactive Map Dashboard</p>
        </header>

        <main className="dashboard-grid">
          {/* Sidebar with search and results */}
          <section className="glass-panel sidebar">
            <SearchBar query={query} setQuery={setQuery} />
            
            <div className="results-container">
              {loading ? (
                <div className="empty-state">Searching...</div>
              ) : results.length > 0 ? (
                results.map((item, index) => (
                  <div key={item.id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <ResultCard 
                      pincode={item.pincode} 
                      area={item.area} 
                      isActive={selectedPincode?.id === item.id}
                      onClick={() => setSelectedPincode(item)}
                    />
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No areas or pincodes found for "{query}"</p>
                </div>
              )}
            </div>
          </section>

          {/* Map Area */}
          <section className="glass-panel map-container">
             <MapView results={results} selectedPincode={selectedPincode} />
          </section>
        </main>
      </div>
    </>
  )
}

export default App
