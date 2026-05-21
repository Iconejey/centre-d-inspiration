'use client';

import '../css/sidebar.css';
import ContactCard from './ContactCard';
import { FILTERS } from '../lib/inspiration';

export default function Sidebar({ filter_options, filter_state, onFilterChange, onResetFilters, isOpen, onClose }) {
	return (
		<>
			<aside className={`sidebar ${isOpen ? 'open' : ''}`}>
				<div className="sidebar-filters">
					{FILTERS.map(({ key, label }) => (
						<div key={key}>
							<label htmlFor={key}>{label}</label>
							<select name={key} id={key} value={filter_state[key]} onChange={event => onFilterChange(key, event.target.value)}>
								<option value="">Tout</option>
								{filter_options?.[key]?.map(({ id, label, disabled }) => (
									<option key={`${key}-${id}`} value={id} disabled={disabled}>
										{label}
									</option>
								))}
							</select>
						</div>
					))}
				</div>

				<div className="sidebar-buttons">
					<button className="large filter-button" onClick={onClose}>
						Filtrer
					</button>
					<button className="large outlined" onClick={() => {
						onResetFilters?.();
						onClose?.();
					}}>
						Annuler
					</button>
				</div>

				<ContactCard />
			</aside>
		</>
	);
}
