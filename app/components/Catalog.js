import '../css/catalog.css';
import ContestCard from './ContestCard';
import Image from 'next/image';

const inspiration_center_url = process.env.INSPIRATION_CENTER_URL;

async function fetchContests() {
	if (!inspiration_center_url) return { contests: [], has_error: true };

	try {
		const response = await fetch(inspiration_center_url, {
			next: { revalidate: 300 }
		});

		if (!response.ok) return { contests: [], has_error: true };

		const payload = await response.json();
		const contests = payload?.data || [];

		return { contests, has_error: false };
	} catch {
		return { contests: [], has_error: true };
	}
}

export default async function Catalog() {
	const { contests, has_error } = await fetchContests();

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
					<ContestCard key={contest_item.hash_id} contest_item={contest_item} />
				))}
				{!has_error && contests.length === 0 && <p className="empty-state">Aucun concours disponible pour le moment.</p>}
				{has_error && <p className="empty-state">Impossible de charger le catalogue actuellement. Merci de reessayer plus tard.</p>}
			</div>
		</section>
	);
}
