<template>
	<v-app>
		<div>
			<NavBar />
		</div>
		<v-main>
			<slot />
		</v-main>
		<div>
			<AppFooter />
		</div>
	</v-app>
</template>
<script>
import NavBar from './navbar.vue'
import AppFooter from './footer.vue'

export default {
	name: 'DefaultLayout',
	components: {
		NavBar,
		AppFooter,
	},
}
</script>
