import api from "./axios";

const toggleSubscription = (channelId) => {
  return api.post(`/subscriptions/c/${channelId}`);
};

const getSubscribedChannels = (channelId) => {
  return api.get(`/subscriptions/c/${channelId}`);
};

const getUserChannelSubscribers = (subscriberId) => {
  return api.get(`/subscriptions/u/${subscriberId}`);
};

export { toggleSubscription, getSubscribedChannels, getUserChannelSubscribers };
