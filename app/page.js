import Catalog from './components/Catalog';
import Sidebar from './components/Sidebar';

export default function Home() {
	return (
		<main>
			<Sidebar />
			<Catalog />
		</main>
	);
}
