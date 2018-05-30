
import * as React from 'react'
import { FormContext } from './form'

interface Props {
  name: string,
  value?: any,
  type?: string,
  label?: string,
  optional?: boolean,
  disabled?: boolean,
  autoFocus?: boolean,
  newPassword?: boolean
}

export const Input: React.SFC<Props> = (props) => {
  return <FormContext.Consumer>
    {(context) => <>
      {props.label && <label key="label" htmlFor={props.name}>{props.label}{props.optional ? " (Optional)" : "" }</label>}
      <input name={props.name} id={props.name}
        type={props.type ? props.type : 'text'}
        defaultValue={props.value}
        required={props.optional ? false : true}
        disabled={props.disabled ? true : false}
        autoFocus={props.autoFocus ? true : false}
        autoComplete={props.type == "password" && props.newPassword ? "new-password" : props.type == "search" ? "off" : null}
        step={props.type == "number" ? "any" : null}
        onChange={context.onChange} />
    </>}
  </FormContext.Consumer>
}