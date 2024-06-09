<template>
	<nav class="navbar">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/launches">Launches</a></li>
			<li><a href="/favouriteRockets">Favourite rockets</a></li>
		</ul>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavBar',
})
</script>

<style scoped>
.navbar {
	background-color: #333;
	color: white;
	padding: 1rem;
}

.navbar ul {
	list-style: none;
	padding: 0;
}

.navbar li {
	display: inline;
	margin-right: 1rem;
}

.navbar a {
	color: white;
	text-decoration: none;
}

.navbar a:hover {
	text-decoration: underline;
}
</style>
