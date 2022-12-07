export function isLocalEnv(): boolean {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}
export const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
