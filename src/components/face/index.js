import React from 'react';
import { arc } from 'd3';
import styled from 'styled-components';

import Eyes from './eyes';
import Mouth from './mouth';

console.log(window.innerWidth);
const width = window.innerWidth;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 10;
const eyeOffsetX = 90;
const eyeOffsetY = 90;
const eyeRadius = 40;
const mouthWidth = 15;
const mouthRadius = 200;

const face = () => {
	return (
		<FaceEl>
			<svg width={width} height={height}>
				<g transform={`translate(${centerX}, ${centerY})`}>
					<circle
						r={centerY - strokeWidth / 2}
						fill='yellow'
						stroke='black'
						strokeWidth={strokeWidth}></circle>
					<Eyes
						eyeOffsetX={eyeOffsetX}
						eyeOffsetY={eyeOffsetY}
						eyeRadius={eyeRadius}
					/>
					<Mouth mouthRadius={mouthRadius} mouthWidth={mouthWidth} />
				</g>
			</svg>
			);
		</FaceEl>
	);
};

const FaceEl = styled.div``;
export default face;
