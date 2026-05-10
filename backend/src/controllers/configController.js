const {
  getConfigurations,
  getNextConfigId,
  addConfiguration,
  removeConfigurationByIndex,
} = require('../data/store');

function listConfigs(req, res) {
  const skip = parseInt(req.query.skip, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 10;

  const userConfigs = getConfigurations().filter((c) => c.userId === req.user.userId);
  const total = userConfigs.length;
  const paginatedConfigs = userConfigs.slice(skip, skip + limit);

  return res.json({
    data: paginatedConfigs,
    pagination: {
      total,
      skip,
      limit,
      hasMore: skip + limit < total,
    },
  });
}

function createConfig(req, res) {
  const { name, components, backgroundColor } = req.body;

  if (!name || !components) {
    return res.status(400).json({
      error: 'Missing required fields: name, components',
    });
  }

  const newConfig = {
    id: getNextConfigId(),
    userId: req.user.userId,
    username: req.user.username,
    name,
    components,
    backgroundColor: backgroundColor || 'var(--canvas-bg)',
    savedAt: new Date().toISOString(),
  };

  addConfiguration(newConfig);
  return res.status(201).json(newConfig);
}

function getConfigById(req, res) {
  const config = getConfigurations().find(
    (c) => c.id === req.params.id && c.userId === req.user.userId
  );

  if (!config) {
    return res.status(404).json({ error: 'Configuration not found' });
  }

  return res.json(config);
}

function updateConfig(req, res) {
  const { name, components, backgroundColor } = req.body;
  const config = getConfigurations().find(
    (c) => c.id === req.params.id && c.userId === req.user.userId
  );

  if (!config) {
    return res.status(404).json({ error: 'Configuration not found' });
  }

  if (name) config.name = name;
  if (components) config.components = components;
  if (backgroundColor !== undefined) config.backgroundColor = backgroundColor;
  config.savedAt = new Date().toISOString();

  return res.json(config);
}

function deleteConfig(req, res) {
  const index = getConfigurations().findIndex(
    (c) => c.id === req.params.id && c.userId === req.user.userId
  );

  if (index === -1) {
    return res.status(404).json({ error: 'Configuration not found' });
  }

  removeConfigurationByIndex(index);
  return res.status(204).send();
}

module.exports = {
  listConfigs,
  createConfig,
  getConfigById,
  updateConfig,
  deleteConfig,
};
