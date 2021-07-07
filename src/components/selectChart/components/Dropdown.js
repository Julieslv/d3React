import React from 'react';

import styled from 'styled-components';

export const DropdownOLD = ({
	options,
	onSelectedValueChange,
	selectedXValue,
	id,
}) => {
	return (
		<SelectEl
			id={id}
			defaultValue='DEFAULT'
			value={selectedXValue}
			onChange={(event) => onSelectedValueChange(event.target.value)}>
			<option value='DEFAULT' disabled>
				Select option
			</option>
			{options.map(({ value, label }, i) => (
				<option key={i} value={value}>
					{`${label}`}
				</option>
			))}
		</SelectEl>
	);
};

const SelectEl = styled.select`
	background: #ff000035;
	border: 0 none;
	padding: 3px 5px;
	font-size: 1.5em;
	option {
		background: #ff000035;
	}
`;
