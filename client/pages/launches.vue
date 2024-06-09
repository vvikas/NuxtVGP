<template>
	<div>
		<h3 class="my-5">SpaceX Launches</h3>

		<label for="yearFilter">Filter by Year:</label>
		<select id="yearFilter" v-model="selectedYear" @change="setYearFilter(selectedYear)">
			<option value="">All Years</option>
			<option v-for="year in uniqueYears" :key="year" :value="year">{{ year }}</option>
		</select>

		<label for="sortOrder">Sort Order:</label>
		<select id="sortOrder" v-model="sortOrder" @change="toggleSortOrder">
			<option value="asc">Ascending</option>
			<option value="desc">Descending</option>
		</select>

		<p>There are {{ launches?.length || 0 }} launches.</p>
		<v-table>
			<thead>
				<tr>
					<th class="text-left">Mission name</th>
					<th class="text-left">Launch date</th>
					<th class="text-left">Launch site</th>
					<th class="text-left">Rocket</th>
					<th class="text-left">Details</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="launch in sortedAndFilteredLaunches" :key="launch.mission_name">
					<td>{{ launch.mission_name }}</td>
					<td>{{ new Date(launch.launch_date_local).toDateString() }}</td>
					<td>{{ launch.launch_site?.site_name || '' }}</td>
					<td>
						<a :href="'/rocket?id=' + launch.rocket?.rocket.id" target="_blank">
							{{ launch.rocket?.rocket_name || '' }}
						</a>
					</td>
					<td>{{ launch.details }}</td>
				</tr>
			</tbody>
		</v-table>
	</div>
</template>
<script lang="ts" setup>
import useLaunchFilters, { type Launch } from '~/composables/filters'

const query = gql`
	query getLaunchs {
		launches {
			id
			mission_name
			launch_date_local
			launch_site {
				site_id
				site_name
				site_name_long
			}
			rocket {
				rocket_name
				rocket {
					id
				}
			}
			details
		}
	}
`
const { data } = useAsyncQuery<{
	launches: {
		id: String
		mission_name: String
		launch_date_local: Date
		launch_site: { site_name: String }
		rocket: { rocket_name: String; rocket: { id: String } }
		details: String
	}[]
}>(query)
const launches = computed(() => data.value?.launches ?? [])

const { selectedYear, sortedLaunches, toggleSortOrder, uniqueYears, setYearFilter } =
	useLaunchFilters(launches)
const sortOrder = ref<'asc' | 'desc'>('asc') // Default sorting order is ascending
const sortedAndFilteredLaunches: Ref<Launch[]> = ref([]) // Holds launches after both filtering and sorting

// Watch for changes in selectedYear, sortedLaunches, and sortOrder to update sortedAndFilteredLaunches
watchEffect(() => {
	const filtered = selectedYear.value
		? sortedLaunches.value.filter(
				(launch) => new Date(launch.launch_date_local).getFullYear() === selectedYear.value,
		  )
		: sortedLaunches.value
	sortedAndFilteredLaunches.value =
		sortOrder.value === 'asc'
			? filtered.sort((a, b) => new Date(a.launch_date_local).getTime() - new Date(b.date).getTime())
			: filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>
