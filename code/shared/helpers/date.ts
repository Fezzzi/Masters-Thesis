export const formatDate = (dateString?: string, includeMills = true): string => {
  const date = dateString ? new Date(dateString) : new Date()
  return `${
    [date.getDate(), date.getMonth() + 1, date.getFullYear()].map(d => padLeft(d)).join('.')
  } ${
    [date.getHours(), date.getMinutes(), date.getSeconds()].map(t => padLeft(t)).join(':')
  }${includeMills ? date.getMilliseconds() : ''}`
}

const padLeft = (datePart: number) => datePart >= 10 ? datePart.toString() : `0${datePart}`
