export default {
  requests(state, _, _2, rootGetters) {
    console.log(state.requests);
    const coachId = rootGetters.userId;
    console.log('Coach id',coachId);
    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
