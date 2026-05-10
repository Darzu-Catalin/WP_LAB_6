function getPermissionsForRole(role) {
  const rolePermissions = {
    ADMIN: ['READ', 'WRITE', 'DELETE'],
    WRITER: ['READ', 'WRITE'],
    VISITOR: ['READ'],
  };

  return rolePermissions[role] || [];
}

module.exports = {
  getPermissionsForRole,
};
