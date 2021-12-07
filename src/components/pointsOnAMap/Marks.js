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

export const Marks = ({ worldAtlas: { land, interiors }, cities }) => (
	<MarksEl>
		<path className='sphere' d={path({ type: 'Sphere' })} />
		<path className='graticules' d={path(graticule())} />
		{land.features.map((feature, i) => (
			<path className='land' key={`land_${i}`} d={path(feature)} />
		))}
		<path className='interiors' d={path(interiors)} />
		{cities.map((city, i) => {
			console.log(city);
			//^ d3 projections are also functions
			//^ https://d3-wiki.readthedocs.io/zh_CN/master/Geo-Projections/#_projection
			//^  Returns an array [x, y] given the input array [longitude, latitude

			const [x, y] = projection([city.lng, city.lat]);
			console.log(x);
			return <circle key={`city_${i}`} className='city' r='2' cx={x} cy={y} />;
		})}
	</MarksEl>
);

const MarksEl = styled.g`
	.sphere {
		fill: #ff000020;
	}
	.land {
		fill: #ff000025;
		stroke: #ffffff50;
	}
	.graticules {
		fill: none;
		stroke: #ff000015;
	}
	.interiors {
		fill: none;
		stroke: #ffffff50;
	}
	.city {
		fill: #ff000035;
	}
`;
