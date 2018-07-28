import { ErrorModuleState } from "./types";

export const reportedErrors = (state : ErrorModuleState & any) => state.reportedErrors || [];
