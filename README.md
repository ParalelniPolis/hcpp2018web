# HCPP 2018 website
[![CircleCI](https://circleci.com/gh/ParalelniPolis/hcpp2017web.svg?style=svg)](https://circleci.com/gh/ParalelniPolis/hcpp2017web)

### Requirements:

- Node.js

## Development

### Install dependencies
```
npm install -g gulp
npm install
```

### Build styles
```
gulp styles
```

### Run development server
(builds styles and runs livereload)
```
gulp
```

## Production

### Install dependencies
```
npm install
```

### Run app
Deploy app to server...

Set enviroment variables -> see file ```.env_example``` and make ```.env``` file

Then run:
```
npm start
```

You're welcome
