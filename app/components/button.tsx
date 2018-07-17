
import * as React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  label?: string | JSX.Element,
  to?: string,
  disabled?: boolean,
  submit?: boolean,
  sup?: boolean,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.SFC<Props> = (props) => {
  return props.to
    ? <Link className={`button${props.sup ? ' button--sup' : ''}`} to={props.to}>{props.label}</Link>
    : <button type={props.submit ? 'submit' : 'button'} className={`${props.sup ? ' button--sup' : ''}`} disabled={props.disabled} onClick={(e)=> {
      e.currentTarget.blur()
      props.onClick && props.onClick(e)
    }}>{props.label}</button>
}