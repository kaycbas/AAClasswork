const FollowToggle = require("./follow_toggle.js");

$(() => {
    $("button.follow-toggle").each(function(idx, el) {
        new FollowToggle(el);
    })

    $("nav.users-search").each(function(idx, el) {
        new UsersSearch(el);
    })
})