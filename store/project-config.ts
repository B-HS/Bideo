import { create } from 'zustand'
export interface ProjectConfig {}

const useProjectConfig = create<ProjectConfig>((set) => ({}))

export { useProjectConfig }
