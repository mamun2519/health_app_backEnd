import * as bcrypt from 'bcrypt'
export const hashPasswordGenerator = async (
  password: string,
  saltRounds: number,
): Promise<string> => {
  const hashPassword = await bcrypt.hash(password, saltRounds)
  return hashPassword
}

export const comparePassword = async (
  planText: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(planText, hash)
}
