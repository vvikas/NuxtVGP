<template>
	<div>
		<h3 class="my-5">
			Favourite Rockets
			<v-btn class="favourite" @click="store.clearAll">Clear all</v-btn>
		</h3>
		<v-table v-if="!loading">
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
				<tr v-for="rocket in rockets" :key="rocket.id">
					<td>{{ rocket.id ?? 0 }}</td>
					<td>{{ rocket.name ?? '-' }}</td>
					<td>{{ rocket.description ?? '-' }}</td>
					<td>{{ rocket.first_flight ?? '-' }}</td>
					<td>{{ rocket.height.meters ?? '-' }}</td>
					<td>{{ rocket.diameter.meters ?? '-' }}</td>
					<td>{{ rocket.mass.kg ?? '-' }}</td>
					<td>{{ rocket.stages ?? '-' }}</td>
				</tr>
			</tbody>
		</v-table>
		<p v-else>Loading...</p>
	</div>
</template>

<script lang="ts" setup>
const store = useFavouriteRockets()
const apollo = useApolloClient()

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

type Rocket = {
	id: string
	name: string
	description: string
	first_flight: string // Use string instead of Date for simplicity
	height: { meters: number }
	diameter: { meters: number }
	mass: { kg: number }
	stages: number
}

const rockets = ref<Rocket[]>([])
const loading = ref(true)

async function fetchRockets() {
	loading.value = true
	try {
		const rocketPromises = store.getFavs.map(async (id) => {
			const { data } = await apollo.client.query<{ rocket: Rocket }>({
				query,
				variables: { id },
			})
			return data.rocket
		})

		rockets.value = (await Promise.all(rocketPromises)).filter(
			(rocket): rocket is Rocket => rocket !== null,
		)
	} catch (error) {
		console.error('Error fetching rockets:', error)
	} finally {
		loading.value = false
	}
}

onMounted(fetchRockets)

watch(
	() => store.getFavs,
	async () => {
		await fetchRockets()
	},
)
</script>
