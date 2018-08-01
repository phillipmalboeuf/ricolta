
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { Button } from '../components/button'
import { Form } from '../components/form'
import { Input } from '../components/input'

import Session from '../models/session'
import User from '../models/user'
import { context } from '../context'


interface Props extends RouteComponentProps<any> {
  context: {
    user: User,
    editable: boolean
  }
}
interface State {
  session: Session
}

@context
export class Login extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      session: new Session()
    }
  }

  componentDidMount() {
  }

  private fetchUser() {
    // user._id = user_id
    // user.fetch()
    this.props.context.user._id = this.state.session.attributes.user_id
    this.props.context.user.fetch()
    this.props.context.editable = true
  }

  public render() {
    return <div className='boxes'>
      <div className='box box--full grid--center'>
        <Form id='login' model={this.state.session} onSubmit={(e, state)=> this.fetchUser()} cta='Login'>
          <Link className='underline' to={`/`}>Back to home</Link>
          <h1 className='header_big'>Login</h1>
          <Input label='Email Address' name='email' />
          <Input label='Password' type='password' name='password' />
        </Form>
      </div>
    </div>
  }
}



