import api from "./axios";

const toggleSubscription = (channelId) => {
  return api.post(`/subscriptions/c/${channelId}`);
};

const getSubscribedChannels = (subscriberId) => {
  return api.get(`/subscriptions/u/${subscriberId}`);
};

const getUserChannelSubscribers = (channelId) => {
  return api.get(`/subscriptions/c/${channelId}`);
};

export { toggleSubscription, getSubscribedChannels, getUserChannelSubscribers };
