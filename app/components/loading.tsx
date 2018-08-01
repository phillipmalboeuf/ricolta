
import * as React from 'react'

interface Props {
  start?: boolean,
  finish?: boolean,
  fixed?: boolean
}

export const Loading: React.SFC<Props> = (props) => {
  return <div className={`loading${props.fixed ? ' loading--fixed' : ''}${props.start ? ' loading--start' : ''}${props.finish ? ' loading--finish' : ''}`} />
}