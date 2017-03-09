if (jQuery(".instafeed-wrapper").length) {
// Instagram Feed
var feed = new Instafeed({
  get: 'user',
  userId: '2324131028',
  clientId: '422b4d6cf31747f7990a723ca097f64e',
  limit: 20,
  sortBy: 'most-liked',
  resolution: "standard_resolution",
  accessToken: '2324131028.422b4d6.d6d71d31431a4e8fbf6cb1efa1a2dfdc',
  template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>'
});
feed.run();
}