import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="558" cy="521" r="15" />
    <rect x="557" y="539" rx="2" ry="2" width="140" height="10" />
    <rect x="535" y="528" rx="2" ry="2" width="140" height="10" />
    <rect x="353" y="223" rx="2" ry="2" width="400" height="400" />
    <circle cx="135" cy="135" r="135" />
    <rect x="0" y="282" rx="10" ry="10" width="280" height="27" />
    <rect x="141" y="369" rx="0" ry="0" width="1" height="6" />
    <rect x="0" y="326" rx="10" ry="10" width="280" height="88" />
    <rect x="6" y="430" rx="10" ry="10" width="109" height="29" />
    <rect x="142" y="427" rx="10" ry="10" width="135" height="34" />
  </ContentLoader>
);

export default PizzaSkeleton;
