import React from "react";
import "./Loading.scss";

const Loading = () => (
    <div className="Loading">
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);

export default Loading;
