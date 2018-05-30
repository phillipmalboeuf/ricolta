

import * as React from 'react'
import { Redirect } from 'react-router-dom'

export const FormContext = React.createContext({
  onChange: (e: React.ChangeEvent<HTMLInputElement>):void=> 
})


import Model from '../models/_model'

interface Props {
  model: Model,
  cta?: string
}
interface State {
  values: { [key:string]: any },
  model: Model
}

export class Form extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      values: {},
      model: props.model
    }
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    this.state.model.save(this.state.values)
      .then(model => this.setState({ 
        values: {},
        model: model
      }))
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value: any = e.currentTarget.value
    if (e.currentTarget.type === 'checkbox') {
      value = e.currentTarget.checked
    }

    this.setState({
      values : {
        ...this.state.values,
        [e.currentTarget.name]: value
      }
    })
  }

  public render() {
    return <form onSubmit={this.onSubmit.bind(this)}>
      <FormContext.Provider value={{onChange: this.onChange.bind(this)}}>
        {this.props.children}
      </FormContext.Provider>
      <button className='normal_top' type='submit' disabled={Object.keys(this.state.values).length === 0}>{this.props.cta || 'Save'}</button>
      {this.state.model._id && <Redirect push to={`/${this.state.model.constructor.endpoint}/${this.state.model._id}`} />}
    </form>
  }
}