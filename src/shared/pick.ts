export const receiveArrayAndReturnObject = (
  queryData: Record<string, unknown>,
  array: string[],
): Record<string, unknown> => {
  const finalObj: Record<string, unknown> = {}
  for (const query of array) {
    if (query in queryData) {
      finalObj[query] = queryData[query]
    }
  }
  return finalObj
}
