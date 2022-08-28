import React from "react";
import moment from "moment";

/**
 * 現在時刻を表示
 * @constructor
 */
 const GetTime = () => {
    const currentTime = moment().format("YYYY/MM/DD HH:mm:ss");
    return <b>{currentTime}</b>;
}
export default GetTime;