/* 

what are the possible cases?
id of user making the request
id of the resource 
id of the org

first check --> is the org the same

if owner --> full crud functionality
if supervisor --> 
  view only for org
  full crud for availabilies, time off requests, and events
  view only for all users, can update self
if employee --> 
  view only for org
  can view and update self, not view other users
  fully crud for self availabilities
  view only for events
  can post time off requests

// user permission should be different for each table ...
const userPermission = async req => {
  const { organization_id } = await db('users').where('id', req.params.id)
  return organization_id === req.user.organization_id
}

route.use('/users/:id', authorize(['owner'], userPermission), ... )

authorize(['owner', 'supervisor'])

*/

const { getUser } = require('../../../database/helpers')

const authorize = roles => async (req, res, next) => {
  if (roles.includes('all')) {
    next()
  } else {
    const { role } = await getUser(req.user)

    if (!roles.includes(role)) {
      res.status(403).json({ error: 'Not authorized' })
    } else {
      next()
    }
  }
}

module.exports = authorize
