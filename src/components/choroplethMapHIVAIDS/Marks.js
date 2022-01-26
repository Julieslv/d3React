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

const missingDataColor = '#f4f4f450';

export const Marks = ({
	worldAtlas: { countries, interiors },
	rowByNumericCode,
	colorScale,
	colorValue,
}) => (
	<MarksEl>
		<path className='sphere' d={path({ type: 'Sphere' })} />
		<path className='graticules' d={path(graticule())} />
		{countries.features.map((feature, i) => {
			// console.log(feature.properties.name);
			const d = rowByNumericCode.get(feature.id);
			// console.log(d);
			return (
				<path
					// fill={colorScale('0.204618555993')}
					fill={d ? colorScale(colorValue(d)) : missingDataColor}
					key={`land_${i}`}
					d={path(feature)}
				/>
			);
		})}
		<path className='interiors' d={path(interiors)} />
	</MarksEl>
);

const MarksEl = styled.g`
	.sphere {
		fill: #ff000020;
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
