import classNames from 'classnames'
import {Link, useLocation} from 'react-router-dom'

const tabs = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Config',
    path: '/config',
  },
]

export default function Tabs() {
  const location = useLocation()
  return (
    <div className="flex space-x-5 bg-gray-50 px-5 pt-2">
      {tabs.map((tab, index) => {
        const active = location.pathname === tab.path
        return (
          <Link
            key={index}
            to={tab.path}
            className={classNames(
              'flex rounded-t-lg px-5 py-2 text-sm text-gray-600',
              {
                'bg-gray-300': active,
                'bg-gray-200 hover:bg-gray-300': !active,
              }
            )}>
            {tab.name}
          </Link>
        )
      })}
    </div>
  )
}
