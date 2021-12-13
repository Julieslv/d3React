import React from 'react';
import styled from 'styled-components';

const LoadingCarousel = () => {
	return (
		<LoadingCarouselDiv>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<em>Loading...</em>
		</LoadingCarouselDiv>
	);
};

const LoadingDot = () => {
	return (
		<DotDiv className='dot-carousel'>
			<em>Loading...</em>
		</DotDiv>
	);
};

export { LoadingCarousel as default, LoadingDot };

/* Styles */
const LoadingCarouselDiv = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
	div {
		animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		transform-origin: 40px 40px;
	}
	div:after {
		content: ' ';
		display: block;
		position: absolute;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #fff;
		margin: -4px 0 0 -4px;
	}
	div:nth-child(1) {
		animation-delay: -0.036s;
	}
	div:nth-child(1):after {
		top: 63px;
		left: 63px;
	}
	div:nth-child(2) {
		animation-delay: -0.072s;
	}
	div:nth-child(2):after {
		top: 68px;
		left: 56px;
	}
	div:nth-child(3) {
		animation-delay: -0.108s;
	}
	div:nth-child(3):after {
		top: 71px;
		left: 48px;
	}
	div:nth-child(4) {
		animation-delay: -0.144s;
	}
	div:nth-child(4):after {
		top: 72px;
		left: 40px;
	}
	div:nth-child(5) {
		animation-delay: -0.18s;
	}
	div:nth-child(5):after {
		top: 71px;
		left: 32px;
	}
	div:nth-child(6) {
		animation-delay: -0.216s;
	}
	div:nth-child(6):after {
		top: 68px;
		left: 24px;
	}
	div:nth-child(7) {
		animation-delay: -0.252s;
	}
	div:nth-child(7):after {
		top: 63px;
		left: 17px;
	}
	div:nth-child(8) {
		animation-delay: -0.288s;
	}
	div:nth-child(8):after {
		top: 56px;
		left: 12px;
	}
	em {
		border: 0;
		clip: rect(0 0 0 0);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		width: 1px;
	}
	@keyframes lds-roller {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const DotDiv = styled.div`
	position: relative;
	left: -9999px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: #ffffff50;
	color: #ffffff50;
	animation: dotCarouselAni 1.5s infinite linear;
	@keyframes dotCarouselAni {
		0% {
			box-shadow: 9984px 0 0 -1px #ff000080, 9999px 0 0 1px #ff000080,
				10014px 0 0 -1px #ff000080;
		}
		50% {
			box-shadow: 10014px 0 0 -1px #ff000000, 9984px 0 0 -1px #ff000000,
				9999px 0 0 1px #ff000000;
		}
		100% {
			box-shadow: 9999px 0 0 1px #ff000050, 10014px 0 0 -1px #ff000050,
				9984px 0 0 -1px #ff000050;
		}
	}
	em {
		border: 0;
		clip: rect(0 0 0 0);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		width: 1px;
	}
`;
