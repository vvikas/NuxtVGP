<template>
	<div>
		<h3 class="my-5">
			Rocket details
			<v-btn class="{ favourite: isFavourite }" @click="toggleFavourite(rocket.id)">
				{{ isFavourite ? '<3' : 'Favourite' }}
			</v-btn>
		</h3>
		<v-table>
			<thead>
				<tr>
					<th class="text-left">Id</th>
					<th class="text-left">Name</th>
					<th class="text-left">Description</th>
					<th class="text-left">First flight date</th>
					<th class="text-left">Height(meters)</th>
					<th class="text-left">Diameter(meters)</th>
					<th class="text-left">Mass(Kg)</th>
					<th class="text-left">Stages</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="rocket">
					<td>{{ rocket.id }}</td>
					<td>{{ rocket.name }}</td>
					<td>{{ rocket.description }}</td>
					<td>{{ rocket.first_flight }}</td>
					<td>{{ rocket.height.meters }}</td>
					<td>{{ rocket.diameter.meters }}</td>
					<td>{{ rocket.mass.kg }}</td>
					<td>{{ rocket.stages }}</td>
				</tr>
				<tr v-else>
					<td colspan="8">Rocket not found ...</td>
				</tr>
			</tbody>
		</v-table>
	</div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'

const store = useFavouriteRockets()

const rocketId = useRoute().query.id?.toString()

const isFavourite = computed(() => (rocketId ? store.isFav(rocketId) : false))

const query = gql`
	query getRocket($id: ID!) {
		rocket(id: $id) {
			id
			name
			description
			first_flight
			height {
				meters
			}
			diameter {
				meters
			}
			mass {
				kg
			}
			stages
		}
	}
`
const { data } = useAsyncQuery<{
	rocket: {
		id: string
		name: string
		description: string
		first_flight: Date
		height: { meters: Number }
		diameter: { meters: Number }
		mass: { kg: Number }
		stages: Number
	}
}>(query, {
	id: rocketId,
})

const rocket = computed(() => data.value?.rocket ?? null)

function toggleFavourite(id: string) {
	console.log('>>> inside toggleFavourite, isFav = ', isFavourite.value)
	if (!isFavourite.value) {
		store.addFav(id)
	}
}
</script>
<style>
.favourite {
	background-color: lightcoral;
	color: white;
}
</style>
