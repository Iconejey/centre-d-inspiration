'use client';

import { useState, useEffect } from 'react';
import Catalog from './components/Catalog';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { getContestsAndOptions, filterContests, FILTERS } from './lib/inspiration';
import './css/contest-popup.css';

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
	const [popup_state, setPopupState] = useState({ is_open: false, contest: null });

	function handleFilterChange(filter_name, filter_value) {
		setFilterState(current_filter_state => ({
			...current_filter_state,
			[filter_name]: filter_value
		}));
	}

	function handleResetFilters() {
		setFilterState(getInitialFilterState());
	}

	function handleOpenContest(contest) {
		setPopupState({ is_open: true, contest });
	}

	function handleCloseContestPopup() {
		setPopupState({ is_open: false, contest: null });
	}

	const popup_contest = popup_state.contest;
	const popup_desktop = popup_contest?.size?.desktop || {};
	const popup_mobile = popup_contest?.size?.mobile || {};

	return (
		<>
			<Header search_value={filter_state.search_value} handleFilterChange={handleFilterChange} />
			<main>
				<Sidebar filter_options={options} filter_state={filter_state} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
				<Catalog contests={filtered_contests} has_error={has_error} onOpenContest={handleOpenContest} />
			</main>

			{popup_state.is_open && popup_contest && (
				<div className="contest-popup-overlay" onClick={handleCloseContestPopup}>
					<div
						className="contest-popup"
						style={{
							'--desktop-w': popup_desktop.width ? `${popup_desktop.width}px` : '960px',
							'--desktop-h': popup_desktop.height ? `${popup_desktop.height}px` : '640px',
							'--mobile-w': popup_mobile.width ? `${popup_mobile.width}px` : '360px',
							'--mobile-h': popup_mobile.height ? `${popup_mobile.height}px` : '640px'
						}}
						onClick={e => e.stopPropagation()}
					>
						<button className="contest-popup-close" onClick={handleCloseContestPopup}>
							✕
						</button>
						<iframe src={popup_contest.link} title={popup_contest.title} />
					</div>
				</div>
			)}
		</>
	);
}
