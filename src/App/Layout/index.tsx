export interface Props {
  children: React.ReactNode
}
export default function Layout(props: Props) {
  return (
    <div className="flex">
      <div className="w-full max-w-xl bg-red-100">hola</div>
      <div className="flex-1">{props.children}</div>
    </div>
  )
}
