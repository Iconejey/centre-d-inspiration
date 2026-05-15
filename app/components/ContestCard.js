import Image from 'next/image';

export default function ContestCard({ contest }) {
	const Icon = contest?.Icon || null;

	return (
		<div className="contest-card">
			<div className="card-img">{contest.image && <Image src={contest.image} alt={`Image de présentation du concours ${contest.title}`} fill />}</div>
			<div className="content">
				<span className="title">{contest.title}</span>
				<span className="description">{contest.description}</span>
				<div className="mechanic">
					<Icon width={18} height={18} aria-label={`Icone ${contest.template_name}`} />
					<span className="label">{contest.template_name}</span>
				</div>
				<a href={contest.link} target="_blank" rel="noreferrer" className="card-action">
					Voir le jeu
				</a>
			</div>
		</div>
	);
}
