import { useState, setState, useEffect } from 'react';
import { csv } from 'd3';

// Original source of data
// ? https://missingmigrants.iom.int/downloads
// 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';
const csvUrl =
	'https://gist.githubusercontent.com/curran/470752f12c027f8ff4266e7c96f26a56/raw/66908b56e371e7c9f5a1c0911ac3250f570a4c83/share-of-population-infected-with-hiv-ihme.csv';

export const useData = () => {
	const [data, setData] = useState(null);
	// console.log(data);

	// use the accessor function to manipulate the data to return a number and not a string.
	//lat: "35.685" lng: '139.7514';
	const row = d => {
		// there is no way to know that the data is
		d.aids =
			d['Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)'];
		return d;
	};

	// console.log(data && data[5]);

	useEffect(() => {
		// Passing a row accessor into the csv so that we can manipulate the strings at once.
		//^ https://d3-wiki.readthedocs.io/zh_CN/master/CSV/#csv
		csv(csvUrl, row).then(setData);
	}, []);

	return data;
};
