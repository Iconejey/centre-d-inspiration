import '../css/header.css';
import Image from 'next/image';

export default function Header() {
	return (
		<header className="site-header">
			<div className="bg-k">
				<Image src="/assets/K.svg" alt="Kimple" fill priority />
			</div>
			<div className="title">
				<span>Le centre d&apos;inspiration</span>
				<Image src="/assets/KimpleLogoFull.svg" alt="Kimple" width={100} height={34} priority />
			</div>
			<div className="search-bar">
				<Image src="/assets/search.svg" alt="Search" width={16} height={16} priority />
				<input type="text" placeholder="Nom d'une opération" />
			</div>
		</header>
	);
}
