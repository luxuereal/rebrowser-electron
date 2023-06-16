import {Field, Form} from 'simple-react-form'
import ArrayField from '../../components/ui/fields/ArrayComponent'
import TextInput from '../../components/ui/fields/TextInput'
import PasswordInput from '../../components/ui/fields/Password'
import {useConfig} from './types'
import Button from '../../components/ui/buttons/Button'
import {electronAPI} from '../../api'

export default function ConfigIndex() {
  const {config, setConfig} = useConfig()
  if (!config) return null

  return (
    <div className="flex-1 bg-gray-50 p-5">
      <Form
        state={config}
        onChange={setConfig}
        onSubmit={() => alert('submit')}>
        <Field fieldName="pages" type={ArrayField}>
          <div className="grid grid-cols-2 gap-5">
            <Field
              fieldName="name"
              placeholder="Tufuber"
              description="Name of the tab"
              label="Name"
              type={TextInput}
            />
            <Field
              fieldName="startURL"
              placeholder="https://tufuber.com"
              description="URL of the webpage"
              label="URL"
              type={TextInput}
            />
            <Field
              fieldName="endpointURL"
              placeholder="https://mydomain.com/api"
              description="URL of the endpoint to send data"
              label="Server URL"
              type={TextInput}
            />
            <Field
              fieldName="endpointAuthenticationToken"
              placeholder="1234567890"
              description="Authentication token for the api"
              label="Authentication Token"
              type={PasswordInput}
            />
          </div>
        </Field>
      </Form>
      <div className="space-x-2">
        <Button primary onClick={() => electronAPI.restartApp()}>
          Reiniciar
        </Button>
        <Button
          primary
          onClick={() => electronAPI.resetAllNavigationStorageAndCache()}>
          Reset caché
        </Button>
      </div>
    </div>
  )
}
