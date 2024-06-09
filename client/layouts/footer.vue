<template>
	<footer class="footer">
		<p>&copy; 2024 Your Company. All rights reserved.</p>
	</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AppFooter',
})
</script>

<style scoped>
.footer {
	background-color: #333;
	color: white;
	padding: 1rem;
	text-align: center;
	position: fixed;
	width: 100%;
	bottom: 0;
}
</style>
