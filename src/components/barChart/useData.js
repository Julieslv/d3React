import { useState, useEffect } from 'react';
import { csv } from 'd3';
const dataUrl =
	'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

export const useData = xAccessor => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const newRow = d => {
			// d.Population = +d['2020'];
			d.Population = +d['2020'];
			return d;
		};
		csv(dataUrl, newRow).then(data => {
			// pass in the data to setData and slice at 10 i.e. top 10
			setData(data.slice(0, 10));
		});
	}, []);

	return data;
};
