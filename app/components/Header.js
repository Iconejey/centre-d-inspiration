'use client';

import '../css/header.css';
import Image from 'next/image';

import { useState, useEffect, useRef } from 'react';

export default function Header({ search_value = '', handleFilterChange }) {
	const [search_input_value, setSearchInputValue] = useState('');
	const debounce_timeout = useRef(null);

	useEffect(() => {
		clearTimeout(debounce_timeout.current);

		debounce_timeout.current = setTimeout(() => {
			handleFilterChange('search', search_input_value);
		}, 500);

		return () => clearTimeout(debounce_timeout.current);
	}, [search_input_value, handleFilterChange]);

	return (
		<header className="site-header">
			<div className="bg-k">
				<Image src="/assets/K.svg" alt="Logo Kimple court" fill priority />
			</div>
			<div className="title">
				<h1>Le centre d&apos;inspiration</h1>
				<Image src="/assets/KimpleLogoFull.svg" alt="Logo kimple long" width={100} height={34} priority />
			</div>
			<div className="search-bar">
				<label htmlFor="search-input" aria-label="Rechercher">
					<Image src="/assets/search.svg" alt="" width={16} height={16} priority />
				</label>
				<input id="search-input" type="text" value={search_input_value} placeholder="Nom d'une opération" onChange={event => setSearchInputValue(event.target.value)} />
			</div>
		</header>
	);
}
