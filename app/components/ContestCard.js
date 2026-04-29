import Image from 'next/image';
import { mechanics } from '../mechanics.js';

function getMechanicData(template_id) {
	if (!template_id) {
		return {
			label: 'Mecanique non renseignee',
			icon: null
		};
	}

	return (
		mechanics[template_id] || {
			label: `Template ${template_id}`,
			icon: null
		}
	);
}

export default function ContestCard({ contest_item }) {
	const title = contest_item?.title || 'Titre indisponible';
	const description = contest_item?.description || 'Description indisponible';
	const showcase_image = contest_item?.showcase_image || '/assets/test-img.png';
	const mechanic_data = getMechanicData(contest_item?.template);
	const MechanicIcon = mechanic_data.icon;
	const mechanic_label = mechanic_data.label;
	const has_link = Boolean(contest_item?.content_link);

	return (
		<div className="contest-card">
			<div className="card-img">
				<Image src={showcase_image} alt={`Image du concours ${title}`} fill sizes="(max-width: 900px) 100vw, 33vw" />
			</div>
			<div className="content">
				<span className="title">{title}</span>
				<span className="description">{description}</span>
				<div className="mechanic">
					{MechanicIcon ? <MechanicIcon width={18} height={18} aria-label={`Icone ${mechanic_label}`} /> : <Image src="/assets/mechanic-test-icon.svg" alt="Icone de la mécanique" width={18} height={18} />}
					<span className="label">{mechanic_label}</span>
				</div>
				{has_link ? (
					<a href={contest_item.content_link} target="_blank" rel="noreferrer" className="card-action">
						Voir le jeu
					</a>
				) : (
					<button disabled>Lien indisponible</button>
				)}
			</div>
		</div>
	);
}
