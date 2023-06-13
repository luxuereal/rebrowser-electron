import Tabs from './Tabs'

export interface Props {
  children: React.ReactNode
}
export default function Layout(props: Props) {
  return (
    <div className="flex h-screen flex-col">
      <Tabs />
      {props.children}
    </div>
  )
}
