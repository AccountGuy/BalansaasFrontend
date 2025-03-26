import ReactTimeago from 'react-timeago'
// @ts-ignore
import formatterBuilder from 'react-timeago/lib/formatters/buildFormatter'
// @ts-ignore
import esLang from 'react-timeago/lib/language-strings/es'

const formatter = formatterBuilder(esLang)

interface RelativeTimeProps {
  date: string
}

const RelativeTime = ({ date }: RelativeTimeProps) => {
  return <ReactTimeago date={date} formatter={formatter} />
}

export default RelativeTime
