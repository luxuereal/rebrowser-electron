import classNames from 'classnames'
import {Link, useLocation} from 'react-router-dom'
import {useConfig} from '../../Config/types'

export default function Tabs() {
  const location = useLocation()
  const {config} = useConfig()
  if (!config) return null

  const tabs = [
    ...config.pages.map((page, index) => ({
      name: page.name,
      path: `/page/${index}`,
    })),
    {
      name: 'Config',
      path: '/config',
    },
  ]

  return (
    <div className="flex h-10 space-x-5 bg-gray-50 px-5 pt-2">
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
