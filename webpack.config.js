// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = 'development';
 
// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = (MODE === 'development');
 
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,
 
  module: {
    rules: [
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: [
          // linkタグに出力する機能
          'style-loader',
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              // minimize: true,
 
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enabledSourceMap,
              plugins: [
                // ベンダープレフィックスを付与
                require('autoprefixer')({grid: true})
              ]
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            }
          }
        ],
      },
      {
          test: /\.js/,
          use: [
              'babel-loader'
          ]
      },
      {
          test: /\.ts/,
          use: 'ts-loader'
      }
    ],
  },

  resolve: {
      extensions: [
          '.js',
          '.ts'
      ]
  }
};
