'use client';

import dynamic from 'next/dynamic';
import '../css/sidebar.css';
import kbotAnimation from '../kbot-lottie.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Sidebar() {
	return (
		<aside className="sidebar">
			<label htmlFor="mechanic">Mécanique</label>
			<select name="mechanic" id="mechanic">
				<option value="">Sélectionner</option>
			</select>

			<label htmlFor="objectifs">Objectifs marketing</label>
			<select name="objectifs" id="objectifs">
				<option value="">Sélectionner</option>
			</select>

			<label htmlFor="temps-forts">Temps forts</label>
			<select name="temps-forts" id="temps-forts">
				<option value="">Sélectionner</option>
			</select>

			<label htmlFor="secteur">Secteur d&apos;activité</label>
			<select name="secteur" id="secteur">
				<option value="">Sélectionner</option>
			</select>

			<div className="card">
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
		</aside>
	);
}
