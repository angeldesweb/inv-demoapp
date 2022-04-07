import { AuthStore } from "./AuthStore";
import { DetailStore } from "./DetailStore";
import { RouterStore , ViewStore } from "./RouterStore";

export const router = RouterStore();

export const session = AuthStore();

export const view = ViewStore();

export const detail = DetailStore();