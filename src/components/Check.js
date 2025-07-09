import React from "react"
import {
    Typography
} from "@mui/material"
import {
    CheckCircle,
    CancelRounded
} from "@mui/icons-material"
import "../styles/General/Check.scss"

const Check = ({ isFailure, isSaved, message }) => {
    if (!isFailure &&!isSaved) {
        return null
    }

    return (
        <>
            {isFailure &&
                <div className="content-check" style={{ textAlign: "center", alignItems: "center" }}>
                    <CancelRounded className="check-icon" sx={{ fontSize: 150, color: "#c53e39" }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#862c29" }}>
                        {message}
                    </Typography>
                </div>
            }
            {isSaved &&
                <div className="content-check" style={{ textAlign: "center", alignItems: "center" }}>
                    <CheckCircle className="check-icon" sx={{ fontSize: 150, color: "#5bf18d" }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#156e42" }}>
                        {message}
                    </Typography>
                </div>
            }
        </>
    )
}

export default Check