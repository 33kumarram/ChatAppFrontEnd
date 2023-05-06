import React from 'react'

export const AddElipsis = (str, limit) => {
  return str.length>limit ? str.substring(0,limit)+' ...' : str
}
