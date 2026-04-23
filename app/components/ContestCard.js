import Image from 'next/image';

export default function ContestCard() {
	return (
		<div className="contest-card">
			<div className="card-img">
				<Image src="/assets/test-img.png" alt="Image du concours" fill />
			</div>
			<div className="content">
				<span className="title">Pasquier - Partez à l&apos;aventure</span>
				<div className="mechanic">
					<Image src="/assets/mechanic-test-icon.svg" alt="Icone de la mécanique" width={18} height={18} />
					<span className="label">Roue de la chance</span>
				</div>
				<button>Voir le jeu</button>
			</div>
		</div>
	);
}
