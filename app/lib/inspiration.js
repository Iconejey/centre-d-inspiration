import { template_icons } from '../template_icons.js';

const inspiration_center_list_url = process.env.NEXT_PUBLIC_INSPIRATION_CENTER_URL + '/list';
const inspiration_center_option_url = process.env.NEXT_PUBLIC_INSPIRATION_CENTER_URL + '/option';

export const FILTERS = [
	{ key: 'template', label: 'Mécanique' },
	{ key: 'marketing_goal', label: 'Objectifs marketing' },
	{ key: 'year_highlight', label: 'Temps forts' },
	{ key: 'activity_area', label: 'Secteur d’activité' }
];

async function fetchData(url, data_name, default_value) {
	try {
		const response = await fetch(url, { next: { revalidate: 300 } });
		if (!response.ok) return { [data_name]: null, has_error: true };

		const payload = await response.json();
		return { [data_name]: payload?.data || default_value, has_error: false };
	} catch {
		return { [data_name]: null, has_error: true };
	}
}

function getMetaValue(contest, meta_key) {
	const found_value = contest.metas.find(({ _key }) => _key === meta_key)?.value;
	return found_value ? Number(found_value) : null;
}

export async function getContestsAndOptions() {
	const options_res = await fetchData(inspiration_center_option_url, 'option_data', null);
	const options = options_res.option_data;

	// Simplify and enhance contests data
	const contests_res = await fetchData(inspiration_center_list_url, 'contests', []);
	const contests = contests_res.contests.map(old => {
		const new_contest = {
			hash_id: old.hash_id,
			title: old.title,
			description: old.description,
			image: old.showcase_image,
			template_name: options?.template.find(({ id }) => id === old.template)?.label || old.template,
			Icon: template_icons[old.template],
			link: process.env.NEXT_PUBLIC_CONTEST_URL + old.hash_id,

			size: {
				desktop: { width: old.width_desktop, height: old.height_desktop },
				mobile: { width: old.width_mobile, height: old.height_mobile }
			},

			template: old.template,
			activity_area: old.activity_area,
			marketing_goal: getMetaValue(old, 'marketing_goal'),
			year_highlight: getMetaValue(old, 'year_highlight')
		};

		return new_contest;
	});

	// Remove dashes in options labels and mark disabled options
	for (const { key } of FILTERS) {
		for (const option of options[key]) {
			option.label = option.label.replace(' -', '');
			option.disabled = !contests.some(contest => String(contest[key]) === String(option.id));
		}
	}

	return { contests, options, has_error: contests_res.has_error || options_res.has_error };
}

export function filterContests(contests, filter_state) {
	return contests.filter(contest => {
		// Filters
		const matches_filters = FILTERS.every(({ key }) => {
			if (!filter_state[key]) return true;
			return String(contest[key]) === filter_state[key];
		});

		// Search
		const matches_search = !filter_state.search || contest.title.toLowerCase().includes(filter_state.search.toLowerCase());

		return matches_filters && matches_search;
	});
}
