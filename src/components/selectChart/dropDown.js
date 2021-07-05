import React from 'react';

import styled from 'styled-components';

const Dropdown = ({ options, onSelectedValueChange, id }) => {
	const test = (optionValue) => {
		/* 		console.log('onchnage');
		console.log(optionValue); */
		return onSelectedValueChange(optionValue);
	};
	return (
		<SelectEl id={id} onChange={(event) => test(event.target.value)}>
			<option key='0' value=''>
				Select option
			</option>
			{options.map((option, i) => (
				<option key={i + 1} value={option.value}>{`${option.value}`}</option>
			))}
		</SelectEl>
	);
};

export default Dropdown;

const SelectEl = styled.select`
	background: #ff000035;
	border: 0 none;
	padding: 3px 5px;
	option {
		background: #ff000035;
	}
`;
