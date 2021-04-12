import * as React from 'react';
import { IRouteComponentProps } from 'umi';
export default function Layout({ children }) {
  return (
    <div style={{ color: 'orange' }}>
      <h1 style={{ color: 'orange' }}>全局layout</h1>
      {children}
    </div>
  );
}
