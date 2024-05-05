import data from "../../data/diagnosesEntries";
import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return data;
};

export default {
  getEntries,
};