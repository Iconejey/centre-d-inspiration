import '../css/catalog.css';
import ContestCard from './ContestCard';
import Image from 'next/image';

export default function Catalog({ contests = [], has_error = false, onOpenContest }) {
	return (
		<section className="catalog">
			<div className="filters">
				<button className="outlined">
					Trier par
					<Image src="/assets/filter.svg" alt="Icone de filtre" width={16} height={16} />
				</button>
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
