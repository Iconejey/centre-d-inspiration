'use client';

import '../css/sidebar.css';
import ContactCard from './ContactCard';

export default function Sidebar({ filter_options, filter_state, onFilterChange, onResetFilters }) {
	const filters = [
		{ key: 'template', label: 'Mécanique' },
		{ key: 'marketing_goal', label: 'Objectifs marketing' },
		{ key: 'year_highlight', label: 'Temps forts' },
		{ key: 'activity_area', label: 'Secteur d’activité' }
	];

	return (
		<aside className="sidebar">
			<div className="sidebar-filters">
				{filters.map(({ key, label }) => (
					<div key={key}>
						<label htmlFor={key}>{label}</label>
						<select name={key} id={key} value={filter_state[key]} onChange={event => onFilterChange(key, event.target.value)}>
							<option value="">Tout</option>
							{filter_options?.[key]?.map(({ id, label }) => (
								<option key={`${key}-${id}`} value={id}>
									{label.replace(' -', '')}
								</option>
							))}
						</select>
					</div>
				))}

				<div className="actions">
					<button type="button" onClick={() => onResetFilters?.()} className="outlined-link">
						Reinitialiser
					</button>
				</div>
			</div>

			<ContactCard />
		</aside>
	);
}
