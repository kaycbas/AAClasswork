const APIUtil = require("./api_util");

function FollowToggle(el) {
    this.$followButton = $(el);
    
    this.userId = el.dataset.id;
    console.log(`this.userId: ${this.userId}`);
    this.followState = el.dataset.initial_follow_state;
    console.log(`this.followState: ${this.followState}`);

    this.render();
    let that = this;
    this.$followButton.on("click", e => {
        that.handleClick(e)
        .then(res => {
            if (this.followState === 'unfollowed' || this.followState === 'following') {
                this.followState = 'followed';
            } else {
                this.followState = 'unfollowed';
            }
            this.render();
        })
    });
}

FollowToggle.prototype.render = function() {
    if (this.followState === 'unfollowed') {
        this.$followButton.prop("disabled", false);
        this.$followButton.text("Follow!");
    } else if (this.followState === 'followed') {
        this.$followButton.prop("disabled", false);
        this.$followButton.text("Unfollow!");
    } else {
        this.$followButton.prop("disabled", true);
    }
}

FollowToggle.prototype.handleClick = function(ev){
    ev.preventDefault();
    console.log(this.followState);
    if (this.followState === "followed") {
        this.followState = "unfollowing";
        this.render();
        return APIUtil.unfollowUser(this.userId);
    } else {
        this.followState = "following";
        this.render();
        return APIUtil.followUser(this.userId);
    }
}

module.exports = FollowToggle;
