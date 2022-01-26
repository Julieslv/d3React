import { useState, useEffect } from 'react';
import { csv } from 'd3';
const csvUrl =
	'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/slim-3/slim-3.csv';

export const useCodes = () => {
	const [data, setData] = useState(null);
	// console.log(data);

	// console.log(data && data[5]);

	useEffect(() => {
		// Passing a row accessor into the csv so that we can manipulate the strings at once.
		//^ https://d3-wiki.readthedocs.io/zh_CN/master/CSV/#csv
		csv(csvUrl).then(setData);
	}, []);

	return data;
};
