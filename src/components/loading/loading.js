import React from 'react';
import styled from 'styled-components';

const Loader = () => {
	return <DotCarousel className='dot-carousel'></DotCarousel>;
};

const DotCarousel = styled.div`
	position: relative;
	left: -9999px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: #9880ff;
	color: #9880ff;
	box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
	animation: dotCarousel 1.5s infinite linear;

	@keyframes dotCarousel {
		0% {
			box-shadow: 9984px 0 0 -1px #9880ff, 9999px 0 0 1px #9880ff,
				10014px 0 0 -1px #9880ff;
		}
		50% {
			box-shadow: 10014px 0 0 -1px #9880ff, 9984px 0 0 -1px #9880ff,
				9999px 0 0 1px #9880ff;
		}
		100% {
			box-shadow: 9999px 0 0 1px #9880ff, 10014px 0 0 -1px #9880ff,
				9984px 0 0 -1px #9880ff;
		}
	}
`;

export default Loader;
