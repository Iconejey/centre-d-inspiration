import '../css/catalog.css';
import ContestCard from './ContestCard';
import FunnelFillIcon from './FunnelFillIcon';

export default function Catalog({ contests = [], has_error = false, sort_by, onSortChange, onOpenContest, onOpenFilters }) {
	return (
		<section className="catalog">
			<div className="filters">
				<button className="outlined filter-button" onClick={onOpenFilters}>
					<FunnelFillIcon />
					Filtrer
				</button>
				<select className="outlined sort-button" value={sort_by} onChange={e => onSortChange(e.target.value)} aria-label="Trier par">
					<option value="" disabled hidden>
						Trier par
					</option>
					<option value="recent">Plus récent</option>
					<option value="ancien">Plus ancien</option>
					<option value="mecanique">Par mécanique</option>
				</select>
			</div>
			<div className="cards">
				{contests.map(contest_item => (
					<ContestCard key={contest_item.hash_id} contest={contest_item} onOpenContest={onOpenContest} />
				))}
				{!has_error && contests.length === 0 && <p className="empty-state">Aucun concours disponible pour le moment.</p>}
				{has_error && <p className="empty-state">Impossible de charger le catalogue actuellement. Merci de reessayer plus tard.</p>}
			</div>
		</section>
	);
}
