import React, { useEffect } from 'react';

import styled from 'styled-components';
// import { scaleLinear, timeFormat, extent } from 'd3';
import { LoadingDot as Loading } from '../shared/loading/loading';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { useCodes } from './useCodes';
import { Marks } from './Marks';
import {
	scaleSqrt,
	scaleSequential,
	interpolateYlOrRd,
	interpolateRdPu,
	schemePiYG,
	max,
} from 'd3';

const width = 960;
const height = 500;

const ChoroplethMapMissingMigrants = () => {
	useEffect(() => {
		document.title = 'Choropleth Map';
	}, []);
	const worldAtlas = useWorldAtlas();
	const data = useData();
	const codes = useCodes();

	if (!worldAtlas || !data || !codes) {
		return <Loading />;
	}

	// console.log(data[0]);
	// console.log(codes);

	const numericCodeByAlphaCode = new Map();

	codes.forEach(code => {
		const alpha3Code = code['alpha-3'];
		const numericCode = code['country-code'];
		//set the values to the map that we want to swap out.
		numericCodeByAlphaCode.set(alpha3Code, numericCode);
	});

	//info: Choropleth maps can only deal with one year at a time
	const filteredData = data.filter(d => d.Year === '2017');
	const rowByNumericCode = new Map();

	filteredData.forEach(d => {
		const alpha3Code = d.Code;
		const numericCode = numericCodeByAlphaCode.get(alpha3Code);
		rowByNumericCode.set(numericCode, d);
	});
	const colorValue = d => d.aids; // this is th e value that we are interested in
	// console.log(numericCodeByAlphaCode);
	// console.log(rowByNumericCode);

	//^ https://github.com/d3/d3-scale-chromatic
	//^ https://github.com/d3/d3-scale#scaleSequential
	const colorScale = scaleSequential(interpolateRdPu).domain([
		0,
		max(data, colorValue),
	]);

	return (
		<>
			<h1>HIV/AIDS Choropleth map</h1>

			<svg width={width} height={height}>
				<Marks
					worldAtlas={worldAtlas}
					rowByNumericCode={rowByNumericCode}
					colorScale={colorScale}
					colorValue={colorValue}
				/>
			</svg>
		</>
	);
};

export default ChoroplethMapMissingMigrants;
