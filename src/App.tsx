import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import ErrorBoundary from './utils/ErrorBoundary';


const CharactersPage = lazy(() => import('./pages/CharactersPage'));
const CharacterDetailsPage = lazy(() => import('./pages/CharacterDetailsPage'));

function App()
{
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<CharactersPage />} />
            <Route path="/character/:id" element={<CharacterDetailsPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;