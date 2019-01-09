import React from 'react';
import styled from '@emotion/styled';

const Button = (props) => {
	return (
		<div>
			<Button type={props.type}>{props.text}</Button>
		</div>
	);
};

export default Button;

const Button = styled('button')`
/* some styles go here */
`;
