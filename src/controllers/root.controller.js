import {ok} from "../utils/httpResponse.js";

export const root = (req, res) => {
    return res.status(200).json({
        status: 200,
        message: "API is running"
    });
};