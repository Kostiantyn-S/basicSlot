# BASIC SLOT
My simple test project. The slot is 5 x 3, has 5 symbols, 3 paylines, 
which are displayed if the symbols on the reel land in a line. 
Button "?" displays a panel with pay lines. To start the game, 
press the spin button and listen to Antonio Vivaldi :). 
To stop the reels instantly, press the stop button (after all the reels have been spinning)
or wait for the reels to stop on their own.

```bash
# install the dependencies via yarn
yarn install

# start the server in dev mode with HMR
yarn run start
```
go to [http://localhost:1234](http://localhost:1234) in your browser. Done.

### npm scripts

* `yarn start` - runs the compiler and a server at the same time in dev mode with HMR (Hot Module Replacement) 🔥.
* `yarn build` - runs the compiler once and generates a production build.
* `yarn build_serve` - it makes a build and serves it to port 8080.
* `yarn test` - runs the unit tests (.spec.ts files).
