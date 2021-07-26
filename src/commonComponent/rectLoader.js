import React from "react";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";

const RectLoader = (props) =>
    (<React.Fragment>
            <Skeleton height={200} width="100%" style={{ marginBottom: 6 }} />
            <Skeleton height={200} width="100%" style={{ marginBottom: 6 }} />
            <Skeleton height={200} width="100%" style={{ marginBottom: 6 }} />
            <Skeleton height={200} width="100%" style={{ marginBottom: 6 }} />
            <Skeleton height={200} width="100%" style={{ marginBottom: 6 }} />
            <Skeleton height={200} width="100%" style={{ marginBottom: 6 }} />
            <Skeleton height={200} width="100%" style={{ marginBottom: 6 }} />
            <Skeleton height={200} width="100%" />
        </React.Fragment>
    );

export default RectLoader;
