const path = require('path');
// import path from "path"                  // webpack.config.js는 모던 자바스크립트 파일이 아니라서, import라는 걸 쓸수 없음.
const autoprefixer = require('autoprefixer');
const ExtractCSS = require('extract-text-webpack-plugin');

const MODE = process.env.WEBPACK_ENV; // 'WEBPACK_ENV'   ->    package.json 파일 안에 scripts에 적어둔 것과 동일하게 작성해야한다.
const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js'); // __dirname은 현재의 프로젝트 디렉토리 이름. 이건 어디에서든 접근 가능한 Node.js 전역 변수.
// "assets", "js", "main.js"은 entry 파일의 경로를 쭉 쓴 것.
const OUTPUT_DIR = path.join(__dirname, 'static'); //  static 이라는 파일에 아웃풋 저장.

const config = {
  entry: ['@babel/polyfill', ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      // module (이 경우d에는 styles.scss 파일)을 만나게 되면, 아래의 'ExtractsCSS.extract' plugin을 사용하도록 함. 이 plugin 안에는 내부에서 다른 또 다른 plugin을 사용.
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [autoprefixer({Browerslist: 'cover 99.5%'})];
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js',
  },
  plugins: [new ExtractCSS('styles.css')],
};

module.exports = config;
