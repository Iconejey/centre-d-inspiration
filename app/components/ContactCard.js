'use client';

import dynamic from 'next/dynamic';
import kbotAnimation from '../kbot-lottie.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function ContactCard() {
	return (
		<div className="contact-card">
			<div className="content">
				<div className="text">
					<span className="title">Vous avez un projet de jeu marketing</span>
					<span className="subtitle">vous souhaitez être accompagné par nos équipes ?</span>
				</div>
				<button className="large button">Prendre rendez-vous</button>
			</div>
			<div className="lottie">
				<Lottie animationData={kbotAnimation} loop={true} />
			</div>
		</div>
	);
}
