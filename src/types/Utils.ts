import { Dispatch, SetStateAction } from "react";

export type SetState<T = unknown> = Dispatch<SetStateAction<T>>;
