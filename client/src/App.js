import { useState, useEffect } from 'react'

function App() {
  const [ apiConnection, setApiConnection ] = useState(null)

  useEffect(() => {
    fetch('/api')
    .then(res => res.json())
    .then(json => setApiConnection(json))
  }, [])

  return (
    <div className="main">
      <div>Social Media App</div>
      <div>
        {apiConnection && apiConnection.message}
      </div>
    </div>
  );
}

export default App;
