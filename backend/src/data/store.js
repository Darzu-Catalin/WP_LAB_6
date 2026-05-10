const bcrypt = require('bcryptjs');

const state = {
  users: [],
  configurations: [],
  configIdCounter: 1,
  userIdCounter: 1,
};

function getUsers() {
  return state.users;
}

function getConfigurations() {
  return state.configurations;
}

function getNextUserId() {
  return `user-${state.userIdCounter++}`;
}

function getNextConfigId() {
  return `config-${state.configIdCounter++}`;
}

function addUser(user) {
  state.users.push(user);
  return user;
}

function addConfiguration(config) {
  state.configurations.push(config);
  return config;
}

function removeConfigurationByIndex(index) {
  state.configurations.splice(index, 1);
}

function seedDemoUser() {
  const existing = state.users.find(
    (u) => u.username === 'demouser' || u.email === 'demo@example.com'
  );
  if (existing) return;

  const passwordHash = bcrypt.hashSync('demo123', 10);
  state.users.push({
    id: getNextUserId(),
    username: 'demouser',
    email: 'demo@example.com',
    passwordHash,
    role: 'WRITER',
    createdAt: new Date().toISOString(),
  });
}

module.exports = {
  getUsers,
  getConfigurations,
  getNextUserId,
  getNextConfigId,
  addUser,
  addConfiguration,
  removeConfigurationByIndex,
  seedDemoUser,
};
