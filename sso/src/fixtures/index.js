import oid from '../libs/db/oid';
const adminID = oid('admin');
export default {
  roles: [{ _id: oid('admin-role'), title: 'admin', _creator: adminID }],
  users: [
    {
      _id: adminID,
      email: 'admin@js.org',
      name: 'admin',
      password: 'admin',
      role: oid('admin-role')
    }
  ]
};
