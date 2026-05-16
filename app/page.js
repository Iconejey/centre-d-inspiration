'use client';

import { useState, useEffect } from 'react';
import Catalog from './components/Catalog';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { getContestsAndOptions, filterContests, FILTERS } from './lib/inspiration';

const getInitialFilterState = () => {
	const obj = { search: '' };
	FILTERS.forEach(({ key }) => (obj[key] = ''));
	return obj;
};

export default function Home() {
	// Contests and options
	const [contests_and_options, setContestsAndOptions] = useState({ contests: [], options: null, has_error: false });
	const { contests, options, has_error } = contests_and_options;

	useEffect(() => {
		getContestsAndOptions().then(data => setContestsAndOptions(data));
	}, []);

	// Filtering
	const [filter_state, setFilterState] = useState(getInitialFilterState());
	const filtered_contests = filterContests(contests, filter_state);

	function handleFilterChange(filter_name, filter_value) {
		setFilterState(current_filter_state => ({
			...current_filter_state,
			[filter_name]: filter_value
		}));
	}

	function handleResetFilters() {
		setFilterState(getInitialFilterState());
	}

	return (
		<>
			<Header search_value={filter_state.search_value} handleFilterChange={handleFilterChange} />
			<main>
				<Sidebar filter_options={options} filter_state={filter_state} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
				<Catalog contests={filtered_contests} has_error={has_error} />
			</main>
		</>
	);
}
