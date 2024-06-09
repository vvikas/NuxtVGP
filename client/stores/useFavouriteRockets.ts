export const useFavouriteRockets = defineStore('favouriteRockets', {
	state: () => ({ favs: [] as string[], persist: true }),
	getters: {
		getFavs: (state) => {
			console.log('>>> inside getFavs', state.favs)
			return state.favs
		},
		isFav: (state) => (value: string) => state.favs.includes(value),
	},
	actions: {
		addFav(newFav: string) {
			console.log('### ' + newFav)
			this.favs.push(newFav)
		},

		clearAll() {
			this.favs = []
		},
	},
})
