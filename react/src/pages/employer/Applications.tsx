import React from "react";
import Applications from "../../features/employer/applications/Applications";

const InternalPage: React.FC = ({ apiKey, apiTable }) => {
    return (
        <>
            <Applications url={apiKey} table={apiTable} />
        </>
    );
};

export default InternalPage;
