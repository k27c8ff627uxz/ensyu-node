import MyStrong from '../components/MyStrong';
import React from 'react';
import JsxParser from "react-jsx-parser";

export const getStaticProps = async () => {
    const filename = 'hoge/aa.html'
    const raw = await require(`../contents/${filename}`);
    console.log(raw.default);
    return { props: { html: raw.default }};
};

export default ({html}) => {
    return (
        <div>
        <JsxParser components={{MyStrong}} jsx={html} />
        </div>
    );
};
