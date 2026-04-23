import '../css/catalog.css';
import ContestCard from './ContestCard';
import Image from 'next/image';

export default function Catalog() {
	return (
		<section className="catalog">
			<div className="filters">
				<button className="outlined">
					Trier par
					<Image src="/assets/filter.svg" alt="Icone de filtre" width={16} height={16} />
				</button>
			</div>
			<div className="cards">
				<ContestCard />
				<ContestCard />
				<ContestCard />
				<ContestCard />
				<ContestCard />
			</div>
		</section>
	);
}
