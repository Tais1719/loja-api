const config = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'devburguer',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

export default config;  // Exporte a configuração como "default"
