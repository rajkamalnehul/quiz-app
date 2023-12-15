import { useSelector } from "react-redux";
export const timerSelector = () => useSelector((state) => state.timer);
export const statusSelector = () => useSelector((state) => state.timer.status);
