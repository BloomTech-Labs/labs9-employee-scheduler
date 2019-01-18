/*
1. Create component on front end that an owner or supervisor can use to invite a new person to join the organization. Owners can invite supervisors and employees but supervisors can only invite employees.
2. The form asks for the name and email of the person being invited as well as their role (for owners)
3. Submitting the form sends a request to the backend. 
4. The backend adds the request to a table for invites with the following fields:
     -- id
    -- id of org
    -- id of user who initiated the invite
    -- the invitee’s name
    -- the invitee’s email
5. The backend sends an email to the invitee’s email with an invite link that includes the id for the invite, eg http://sitename.com/invites/:id
6. When the invitee clicks the link, they are brought to a signup page which first grabs their firebase creds, then asks them to fill out a form. 
7. The client uses the invite id to lookup the org id to fetch information about the org to display in the sign up page.
8. That form makes a post request to the server that includes the org id, which is used to create the new user in the users table
9. Upon receiving register success from the server, the client redirects to the dashboard for the user
*/

exports.up = knex =>
  knex.schema.createTable('invites', table => {
    table
      .uuid('id')
      .primary()
      .notNullable()
    table
      .uuid('organization_id')
      .references('id')
      .inTable('organizations')
      .notNullable()
    table
      .string('inviter_id', 50)
      .references('id')
      .inTable('users')
      .notNullable()
    table.string('name')
    table.string('email').notNullable()
  })

exports.down = knex => knex.schema.dropTableIfExists('invites')
