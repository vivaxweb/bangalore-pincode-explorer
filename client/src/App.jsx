import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'
import './index.css'

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Initial fetch of some data
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
    }, 300) // Debounce for 300ms

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  return (
    <>
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>
      
      <div className="app-container">
        <header>
          <h1>Bangalore Pincodes</h1>
          <p className="subtitle">Explore areas and postal codes effortlessly</p>
        </header>

        <main>
          <SearchBar query={query} setQuery={setQuery} />
          
          <div className="results-container mt-4">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : results.length > 0 ? (
              results.map((item, index) => (
                <div key={item.id} style={{ animationDelay: `${index * 0.05}s` }}>
                  <ResultCard pincode={item.pincode} area={item.area} />
                </div>
              ))
            ) : (
              <div className="glass empty-state">
                <p>No areas or pincodes found for "{query}"</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default App
