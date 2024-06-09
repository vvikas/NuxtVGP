export interface Launch {
	id: String
	mission_name: String
	launch_date_local: Date
	launch_site: { site_name: String }
	rocket: { rocket_name: String; rocket: { id: String } }
	details: String
}

export default function useLaunchFilters(launches: Ref<Launch[]>) {
	const selectedYear = ref<number | null>(null)
	const sortOrder = ref<'asc' | 'desc'>('asc') // Default sorting order is ascending

	const sortedLaunches = computed(() => {
		const sorted = [...launches.value]
		sorted.sort((a, b) => {
			const dateA = new Date(a.launch_date_local).getTime()
			const dateB = new Date(b.launch_date_local).getTime()
			if (sortOrder.value === 'asc') {
				return dateA - dateB
			} else {
				return dateB - dateA
			}
		})
		return sorted
	})

	const sortedAndFilteredLaunches = computed(() => {
		const filtered = selectedYear.value
			? sortedLaunches.value.filter(
					(launch) => new Date(launch.launch_date_local).getFullYear() === selectedYear.value,
			  )
			: sortedLaunches.value
		return sortOrder.value === 'asc'
			? filtered.sort(
					(a, b) =>
						new Date(a.launch_date_local).getTime() - new Date(b.launch_date_local).getTime(),
			  )
			: filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	})

	const toggleSortOrder = () => {
		sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
	}

	const setYearFilter = (year: number | null) => {
		selectedYear.value = year
	}

	const uniqueYears = computed(() => [
		...new Set(launches.value.map((launch) => new Date(launch.launch_date_local).getFullYear())),
	])

	return {
		selectedYear,
		sortedLaunches,
		sortedAndFilteredLaunches,
		toggleSortOrder,
		setYearFilter,
		uniqueYears,
	}
}
