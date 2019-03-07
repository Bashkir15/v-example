const App = () => `
	<div>
		<p>App</p>
	</div>
`

function renderApp() {
	const root = document.getElementById('root') as HTMLElement
	root.innerHTML = App()
}

renderApp()
