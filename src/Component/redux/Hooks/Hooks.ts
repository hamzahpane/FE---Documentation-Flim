import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { RooteState, AppDispatch } from "../Feture/strore";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RooteState> = useSelector;
