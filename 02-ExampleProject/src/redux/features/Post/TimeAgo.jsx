import { Typography } from "@mui/material";
import { parseISO, formatDistanceToNow } from "date-fns";

import React from 'react'

export const TimeAgo = ({ timestamps }) => {
    let timeAgo = '';

    if (timestamps) {
        const date = parseISO(timestamps)
        const timePeriod = formatDistanceToNow(date)

        timeAgo = `${timePeriod} ago`
    }

    return (
        <>
            <Typography variant="span">
                & nbsp: {timeAgo}
            </Typography>
        </>
    )
}
