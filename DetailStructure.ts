// models/DetailStructure.ts

import { DocumentReference } from "firebase/firestore";

export interface Task {
  taskName: string;
  isCompleted: boolean;
}

export interface Env {
  id: string;
  name: string;
  NoOfTaskEnv: number;
  RemainTaskEnv: number;
  tasks: Task[];
}

export interface Detailsdoc {
  Personal: { name: string };
  Account: { userId: string };
  createdAt: Date;
  Doc: { envs: Env[]; NoOfTask: number; RemainTask: number };
}
