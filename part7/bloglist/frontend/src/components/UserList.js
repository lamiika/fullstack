import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users)
  const history = useHistory()
  const clickableStyle = {
    cursor: 'pointer',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none'
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              <strong>blogs created</strong>
            </th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td
                style={clickableStyle}
                onClick={() => history.push(`/users/${user.id}`)}
              >
                {user.name}
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList