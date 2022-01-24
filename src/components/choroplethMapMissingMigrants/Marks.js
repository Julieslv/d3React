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

export const Marks = ({
	worldAtlas: { land, interiors },
	data,
	sizeScale,
	sizeValue,
}) => (
	<MarksEl>
		<path className='sphere' d={path({ type: 'Sphere' })} />
		<path className='graticules' d={path(graticule())} />
		{land.features.map((feature, i) => (
			<path className='land' key={`land_${i}`} d={path(feature)} />
		))}
		<path className='interiors' d={path(interiors)} />
		{data.map((d, i) => {
			//^ d3 projections are also functions
			//^ https://d3-wiki.readthedocs.io/zh_CN/master/Geo-Projections/#_projection
			//^  Returns an array [x, y] given the input array [longitude, latitude

			const [x, y] = projection(d.cords);
			// console.log(x);
			return (
				<circle
					key={`d_${i}`}
					className='d'
					r={sizeScale(sizeValue(d))}
					cx={x}
					cy={y}
				/>
			);
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
	.d {
		fill: #ff000035;
	}
`;
