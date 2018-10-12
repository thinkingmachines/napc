import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App'
import map from './map'

const root = document.getElementById('root')
const load = () => render((
  <AppContainer>
    <BrowserRouter><App map={map} /></BrowserRouter>
  </AppContainer>
), root)

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./components/App', load)
}

load()
