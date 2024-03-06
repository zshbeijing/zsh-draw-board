import type { Canvas } from '@/type/index'
import { Control } from "@logicflow/extension";
import LogicFlow from "@logicflow/core";
import Start from '@/plugin/logicFlow/start'
import State from "@/plugin/logicFlow/state"
import Condition from "@/plugin/logicFlow/condition"
import End from "@/plugin/logicFlow/end"

export const useLogicFlow = (options:Canvas.LogicFlowOptions) => {
  LogicFlow.use(Control)
  let lf = new LogicFlow(options)
  lf.register(Start)
  lf.register(State)
  lf.register(Condition)
  lf.register(End)
  return lf
}