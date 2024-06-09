import type { PiniaPluginContext } from 'pinia'

const persistStatePlugin = (context: PiniaPluginContext) => {
	const { store } = context

	if (process.client) {
		const key = store.$id

		// Load the initial state from localStorage
		if (store.$state.persist) {
			const storedState = localStorage.getItem(key)
			if (storedState) {
				store.$patch(JSON.parse(storedState))
			}
		}

		// Subscribe to store changes and persist them in localStorage
		store.$subscribe((_, state) => {
			if (state.persist) {
				localStorage.setItem(key, JSON.stringify(state))
			}
		})

		// Listen for localStorage changes and update the store
		window.addEventListener('storage', (event) => {
			if (event.key === key && event.newValue) {
				store.$patch(JSON.parse(event.newValue))
			} else if (event.key === key && !event.newValue) {
				store.$reset()
			}
		})
	}
}

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.$pinia.use(persistStatePlugin)
})
