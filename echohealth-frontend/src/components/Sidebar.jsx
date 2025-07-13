import React from 'react'
import { Link, useLocation } from 'react-router-dom'


import { 
  Home, 
  Stethoscope, 
  Bot, 
  Dumbbell, 
  MapPin 
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/diagnosis', icon: Stethoscope, label: 'Voice Diagnosis' },
    { path: '/echobuddy', icon: Bot, label: 'EchoBuddy AI' },
    { path: '/exercises', icon: Dumbbell, label: 'Exercises' },
    { path: '/seek-help', icon: MapPin, label: 'Seek Help' }
  ]

  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={isActive ? 'active' : ''}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar