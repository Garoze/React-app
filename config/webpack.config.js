const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx'),
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js',
  },
  resolve: {
    preferRelative: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [path.resolve(__dirname, '../node_modules')],
    alias: {
      '@types': path.resolve(__dirname, '../src/@types'),
      '@Pages': path.resolve(__dirname, '../src/pages'),
      '@Hooks': path.resolve(__dirname, '../src/hooks'),
      '@Routes': path.resolve(__dirname, '../src/routes'),
      '@Assets': path.resolve(__dirname, '../src/assets'),
      '@Services': path.resolve(__dirname, '../src/services'),
      '@Components': path.resolve(__dirname, '../src/components'),
    },
  },
  devServer: {
    static: path.resolve(__dirname, '../public'),
    port: 8000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-react', { runtime: 'automatic' }]],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
