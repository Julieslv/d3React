import { useState, setState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
	'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv';

export const useCities = () => {
	const [data, setData] = useState(null);

	// use the accessor function to manipulate the data to return a number and not a string.
	//lat: "35.685" lng: '139.7514';
	const row = d => {
		d.lat = Number(d.lat);
		d.lng = Number(d.lng);
		d.population = Number(d.population);
		return d;
	};

	useEffect(() => {
		// Passing a row accessor into the csv so that we can manipulate the strings at once.
		//^ https://d3-wiki.readthedocs.io/zh_CN/master/CSV/#csv
		csv(csvUrl, row).then(setData);
	}, []);

	return data;
};
