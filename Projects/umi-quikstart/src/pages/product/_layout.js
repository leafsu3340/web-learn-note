import React from 'react';
import { IRouteComponentProps } from 'umi';
export default (props) => {
console.log('product', props); //sy-log
return (
<div style={{ color: 'red' }}>
<h1>layout</h1>
{props.children}
</div>
);
};