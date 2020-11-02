(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{181:function(t,e,r){"use strict";r.d(e,"h",(function(){return o})),r.d(e,"j",(function(){return c})),r.d(e,"b",(function(){return l})),r.d(e,"f",(function(){return f})),r.d(e,"g",(function(){return d})),r.d(e,"i",(function(){return m})),r.d(e,"a",(function(){return v})),r.d(e,"e",(function(){return h})),r.d(e,"d",(function(){return O})),r.d(e,"k",(function(){return j})),r.d(e,"c",(function(){return w}));var n=r(60),o=function(t){return Object(n.b)({method:"GET",url:"/api/articles",params:t})},c=function(t){return Object(n.b)({method:"GET",url:"/api/articles/feed",params:t})},l=function(t){return Object(n.b)({method:"POST",url:"/api/articles/".concat(t,"/favorite")})},f=function(t){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(t,"/favorite")})},d=function(t){return Object(n.b)({method:"GET",url:"/api/articles/".concat(t)})},m=function(t){return Object(n.b)({method:"GET",url:"/api/articles/".concat(t,"/comments")})},v=function(t,data){return Object(n.b)({method:"POST",url:"/api/articles/".concat(t,"/comments"),data:data})},h=function(t,e){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(t,"/comments/").concat(e)})},O=function(t){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(t)})},j=function(data,t){return Object(n.b)({method:"PUT",url:"/api/articles/".concat(t),data:data})},w=function(data){return Object(n.b)({method:"POST",url:"/api/articles",data:data})}},182:function(t,e,r){"use strict";r.d(e,"c",(function(){return o})),r.d(e,"d",(function(){return c})),r.d(e,"f",(function(){return l})),r.d(e,"a",(function(){return f})),r.d(e,"e",(function(){return d})),r.d(e,"b",(function(){return m}));var n=r(60),o=function(data){return Object(n.b)({method:"POST",url:"/api/users/login",data:data})},c=function(data){return Object(n.b)({method:"POST",url:"/api/users",data:data})},l=function(data){return Object(n.b)({method:"PUT",url:"/api/user",data:data})},f=function(t){return Object(n.b)({method:"POST",url:"/api/profiles/".concat(t,"/follow")})},d=function(t){return Object(n.b)({method:"DELETE",url:"/api/profiles/".concat(t,"/follow")})},m=function(t){return Object(n.b)({method:"GET",url:"/api/profiles/".concat(t)})}},264:function(t,e,r){"use strict";r.r(e);r(77),r(30),r(61);var n=r(43),o=(r(31),r(13),r(44),r(41)),c=(r(29),r(3)),l=r(182),f=r(181),d=r(32);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={name:"UserProfile",watchQuery:["tab"],asyncData:function(t){return Object(c.a)(regeneratorRuntime.mark((function e(){var r,n,c,data,d,m,v,h,O,j;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.params,n=t.query,c=n.tab||"home",data="home"===c?{author:r.username}:{favorited:r.username},e.next=5,Promise.all([Object(l.b)(r.username),Object(f.h)(data)]);case 5:return d=e.sent,m=Object(o.a)(d,2),v=m[0],h=m[1],O=v.data.profile,(j=h.data.articles).forEach((function(article){return article.favoriteDisabled=!1})),e.abrupt("return",{profile:O,followDisabled:!1,tab:c,articles:j});case 13:case"end":return e.stop()}}),e)})))()},computed:v(v({},Object(d.c)(["user"])),{},{isUser:function(){return!!this.user&&this.profile.username===this.user.username}}),methods:{onFollow:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.user){e.next=3;break}return t.$router.push("/login"),e.abrupt("return");case 3:if(r=t.profile,t.followDisabled=!0,r.following){e.next=11;break}return e.next=8,Object(l.a)(r.username);case 8:r.following=!0,e.next=14;break;case 11:return e.next=13,Object(l.e)(r.username);case 13:r.following=!1;case 14:t.followDisabled=!1;case 15:case"end":return e.stop()}}),e)})))()},onFavorite:function(article){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.user){e.next=3;break}return t.$router.push("/login"),e.abrupt("return");case 3:if(article.favoriteDisabled=!0,!article.favorited){e.next=11;break}return e.next=7,Object(f.f)(article.slug);case 7:article.favorited=!1,article.favoritesCount-=1,e.next=15;break;case 11:return e.next=13,Object(f.b)(article.slug);case 13:article.favorited=!0,article.favoritesCount+=1;case 15:article.favoriteDisabled=!1;case 16:case"end":return e.stop()}}),e)})))()}},head:function(){return{title:"Profile - ".concat(this.profile.username)}}},O=r(20),component=Object(O.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"profile-page"},[r("div",{staticClass:"user-info"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-xs-12 col-md-10 offset-md-1"},[r("img",{staticClass:"user-img",attrs:{src:t.profile.image}}),t._v(" "),r("h4",[t._v(t._s(t.profile.username))]),t._v(" "),r("p",[t._v("\n            "+t._s(t.profile.bio)+"\n          ")]),t._v(" "),t.isUser?r("nuxt-link",{staticClass:"btn btn-sm btn-outline-secondary action-btn",attrs:{to:"/settings"}},[r("i",{staticClass:"ion-gear-a"}),t._v(" Edit Profile Settings\n          ")]):r("button",{staticClass:"btn btn-sm btn-outline-secondary action-btn",class:{active:t.profile.following},attrs:{disabled:t.followDisabled},on:{click:t.onFollow}},[r("i",{staticClass:"ion-plus-round"}),t._v("\n             \n            "+t._s(t.profile.following?"UnFollow":"Follow")+"\n            "+t._s(t.profile.username)+"\n          ")])],1)])])]),t._v(" "),r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-xs-12 col-md-10 offset-md-1"},[r("div",{staticClass:"articles-toggle"},[r("ul",{staticClass:"nav nav-pills outline-active"},[r("li",{staticClass:"nav-item"},[r("nuxt-link",{staticClass:"nav-link",class:{active:"home"===t.tab},attrs:{to:{name:"profile",params:{username:t.profile.username},query:{tab:"home"}},exact:""}},[t._v("My Articles")])],1),t._v(" "),r("li",{staticClass:"nav-item"},[r("nuxt-link",{staticClass:"nav-link",class:{active:"favorites"===t.tab},attrs:{to:{name:"profile",params:{favorited:t.profile.username},query:{tab:"favorites"}},exact:""}},[t._v("Favorited Articles")])],1)])]),t._v(" "),t._l(t.articles,(function(article){return r("div",{key:article.slug,staticClass:"article-preview"},[r("div",{staticClass:"article-meta"},[r("nuxt-link",{attrs:{to:{name:"profile",params:{username:article.author.username}}}},[r("img",{attrs:{src:article.author.image}})]),t._v(" "),r("div",{staticClass:"info"},[r("nuxt-link",{staticClass:"author",attrs:{to:{name:"profile",params:{username:article.author.username}}}},[t._v("\n                "+t._s(article.author.username)+"\n              ")]),t._v(" "),r("span",{staticClass:"date"},[t._v("\n                "+t._s(t._f("date")(article.createAt,"MMM DD, YYYY"))+"\n              ")])],1),t._v(" "),r("button",{staticClass:"btn btn-outline-primary btn-sm pull-xs-right",class:{active:article.favorited},attrs:{disabled:article.favoriteDisabled},on:{click:function(e){return t.onFavorite(article)}}},[r("i",{staticClass:"ion-heart"}),t._v(" "+t._s(article.favoritesCount)+"\n            ")])],1),t._v(" "),r("nuxt-link",{staticClass:"preview-link",attrs:{to:{name:"article",params:{slug:article.slug}}}},[r("h1",[t._v(t._s(article.title))]),t._v(" "),r("p",[t._v(t._s(article.description))]),t._v(" "),r("span",[t._v("Read more...")])])],1)}))],2)])])])}),[],!1,null,null,null);e.default=component.exports}}]);