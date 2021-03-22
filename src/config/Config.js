const API_KEY = 'YOUR API KEY';
// Internal Server: `http://192.168.56.1:3000`
//Labtop HotSpot
// const base_adress = 'http://192.168.137.1:3000';
// const base_adress = 'http://localhost:3968'
const base_adress='https://quizlist.ir';
export default {
  API_URL: [`${base_adress}/user/`,
            `${base_adress}/user`,
            `${base_adress}/user/`,
            `${base_adress}/match/`,
            `${base_adress}/match/`,
            `${base_adress}/match/`,
            `${base_adress}/match/all`,
            `${base_adress}/user/profile`,
            `${base_adress}/match/`,
            `${base_adress}/leaderboard/total`,
            `${base_adress}/leaderboard/weakly`,
            `${base_adress}/leaderboard/user`,
            `${base_adress}/user/search/`,
            `${base_adress}/iap/purchase`,
            `${base_adress}/iap/adcoin`,
            `${base_adress}/user/`,
            `${base_adress}/match/flag`],

  MAX_TIME: 40,
  TIME_COIN: 20,
  JOKER_COIN: 30,
  BUNDLE: 3,
};
