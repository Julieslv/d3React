import {
	geoNaturalEarth1,
	geoAzimuthalEqualArea,
	geoPath,
	geoGraticule,
} from 'd3';
/*
https://github.com/d3/d3-geo
*/

import styled from 'styled-components';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ data: { land, interiors } }) => (
	<MarksEl>
		<path className='sphere' d={path({ type: 'Sphere' })} />
		<path className='graticules' d={path(graticule())} />
		{land.features.map((feature) => (
			<path className='land' d={path(feature)} />
		))}
		<path className='interiors' d={path(interiors)} />
	</MarksEl>
);

const MarksEl = styled.g`
	.sphere {
		fill: #ff000035;
	}
	.land {
		fill: #ff000035;
		stroke: #ffffff50;
	}
	.graticules {
		fill: none;
		stroke: #ff000035;
	}
	.interiors {
		fill: none;
		stroke: #ffffff50;
	}
`;
