import { template_icons } from '../template_icons.js';

const inspiration_center_list_url = process.env.NEXT_PUBLIC_INSPIRATION_CENTER_URL + '/list';
const inspiration_center_option_url = process.env.NEXT_PUBLIC_INSPIRATION_CENTER_URL + '/option';

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

	const contests_res = await fetchData(inspiration_center_list_url, 'contests', []);
	const contests = contests_res.contests.map(old => {
		const new_contest = {
			hash_id: old.hash_id,
			title: old.title,
			description: old.description,
			image: old.showcase_image,
			template_name: options?.template.find(({ id }) => id === old.template)?.label || old.template,
			Icon: template_icons[old.template],
			link: `https://kx1.co/contest-${old.hash_id}`,

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

	return { contests, options, has_error: contests_res.has_error || options_res.has_error };
}

export function filterContests(contests, filter_state) {
	const filter_keys = ['template', 'marketing_goal', 'year_highlight', 'activity_area'];

	return contests.filter(contest => {
		// Filters
		const matches_filters = filter_keys.every(filter_key => {
			if (!filter_state[filter_key]) return true;
			return String(contest[filter_key]) === filter_state[filter_key];
		});

		// Search
		const matches_search = !filter_state.search || contest.title.toLowerCase().includes(filter_state.search.toLowerCase());

		return matches_filters && matches_search;
	});
}
