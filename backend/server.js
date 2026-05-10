const app = require('./src/app');
const { PORT } = require('./src/config/env');
const { seedDemoUser } = require('./src/data/store');

seedDemoUser();

app.listen(PORT, () => {
  console.log(`✅ Component Styler API running on http://localhost:${PORT}`);
  console.log(`📚 Swagger UI available at http://localhost:${PORT}/api-docs`);
  console.log(`🔐 Get a token: http://localhost:${PORT}/token?role=ADMIN`);
});
