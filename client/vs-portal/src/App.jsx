import './styles/App.css'
import React, { Suspense, lazy} from 'react';

// Dynamically import remote components
const AuthComponent = lazy(() => import('auth/App'))
const VitalSignsComponent = lazy(() => import('vitals/App'))

function App() {
    return (
        <div>
            <h1>Vital Signs Portal</h1>
            <Suspense fallback={<p>Loading Auth...</p>}>
                <AuthComponent />
            </Suspense>
            <Suspense fallback={<p>Loading Vitals...</p>}>
                <VitalSignsComponent />
            </Suspense>
        </div>
    )
}

export default App