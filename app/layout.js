import { Poppins } from 'next/font/google';
import './css/globals.css';
import Header from './components/Header';

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700']
});

export const metadata = {
	title: "Centre d'inspiration",
	description: 'Découvrez des projets inspirants réalisés avec Kimple !'
};

export default function RootLayout({ children }) {
	return (
		<html lang="fr" className={`${poppins.variable}`}>
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
