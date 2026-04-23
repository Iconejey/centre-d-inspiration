'use client';

import '../css/sidebar.css';
import ContactCard from './ContactCard';

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

			<ContactCard />
		</aside>
	);
}
