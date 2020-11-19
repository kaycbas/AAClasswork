/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 21:0-14 */
/***/ ((module) => {

const APIUtil = {
  followUser: id => {
    return $.ajax({
        method: 'POST',
        url: `/users/${id}/follow`,  
        dataType: 'JSON'
    });
  },

  unfollowUser: id => {
    return $.ajax({
        method: 'DELETE',
        url: `/users/${id}/follow`, 
        dataType: 'JSON'
    });
  }


};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");

$(() => {
    $("button.follow-toggle").each(function(idx, el) {
        new FollowToggle(el);
    })

    $("nav.users-search").each(function(idx, el) {
        new UsersSearch(el);
    })
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map