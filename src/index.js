import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './app/store'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<MantineProvider withGlobalStyles withNormalizeCSS>
				<ModalsProvider>
					<App />
				</ModalsProvider>
			</MantineProvider>
		</Provider>
	</React.StrictMode>
)
