import {useState} from 'react'
import {Field, Form} from 'simple-react-form'
import ArrayField from '../../components/ui/fields/ArrayComponent'
import TextInput from '../../components/ui/fields/TextInput'

export default function ConfigIndex() {
  const [state, setState] = useState({} as any)
  return (
    <div className="flex-1 bg-gray-50 p-5">
      <Form state={state} onChange={setState} onSubmit={() => alert('submit')}>
        <Field fieldName="pages" type={ArrayField}>
          <div className="grid grid-cols-3 gap-5">
            <Field
              fieldName="name"
              placeholder="Tufuber"
              description="Name of the tab"
              label="Name"
              type={TextInput}
            />
            <Field
              fieldName="name"
              placeholder="https://tufuber.com"
              description="URL of the webpage"
              label="URL"
              type={TextInput}
            />
            <Field
              fieldName="name"
              placeholder="https://mydomain.com/api"
              description="URL of the endpoint to send data"
              label="Server URL"
              type={TextInput}
            />
          </div>
        </Field>
      </Form>
    </div>
  )
}
