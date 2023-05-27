import { Outlet } from 'react-router'
import UserNav from '../../components/UserNav'
import UserFooter from '../../components/UserFooter'

const UserLayout = () => {
  return (
    <div>
      <UserNav />
      <Outlet />
      <UserFooter />
    </div>
  )
}

export default UserLayout
