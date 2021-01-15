(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{690:function(t,e,o){var content=o(694);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(58).default)("2f010aa5",content,!0,{sourceMap:!1})},691:function(t,e,o){"use strict";o.r(e);var n={filters:{truncate:function(t,e){return t.length<=e?t:t.substring(0,e)+"…"}},props:["proposals"],data:function(){return{voteTypes:[{value:1,name:"Y"},{value:0,name:"A"},{value:2,name:"N"}],categories:{0:"Governance Proposal",1:"Marketing",2:"Design",3:"Technical",4:"Other"}}}},r=(o(693),o(20)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return t.proposals?o("div",{staticClass:"proposals"},[t.proposals.length>0?o("div",t._l(t.proposals,(function(e){return o("nuxt-link",{key:e.id,staticClass:"box has-shadow-outside is-narrow",attrs:{to:"/proposals/"+e.id}},[o("div",{staticClass:"media"},[o("div",{staticClass:"media-left"},[o("span",{staticClass:"tag",class:{"is-success":"ACTIVE"==e.status,"is-warning":"DRAFT"==e.status,"is-link":"PENDING"==e.status,"is-dark":"CLOSED"==e.status}},[t._v(t._s(e.status))])]),t._v(" "),o("div",{staticClass:"media-content"},[e.title?o("b",[t._v("#"+t._s(e.id)+": "+t._s(t._f("truncate")(e.title,60)))]):o("b",[t._v("...")]),t._v(" "),o("div",{staticClass:"has-text-weight-light"},[o("small",{staticClass:"mr-1"},[t._v("by "),o("nuxt-link",{attrs:{to:"/account/"+e.author}},[t._v(t._s(e.author))])],1),t._v(" "),o("small",[t._v("requesting "),t._l(e.pay,(function(e,n){return o("span",{key:n},[n>0?o("span",[t._v(",")]):t._e(),t._v(" "+t._s(parseInt(e.field_0.quantity))+" EFX")])}))],2)])]),t._v(" "),o("div",{staticClass:"media-right has-text-right"},[o("div",{staticClass:"is-size-7"},[o("b",[t._v(t._s(t.categories[e.category]))])]),t._v(" "),"ACTIVE"==e.status?o("div",t._l(e.vote_counts,(function(e){return o("span",{key:e.key,staticClass:"vote-result"},[o("small",[o("b",{class:{"has-text-success":1===e.key,"has-text-danger":2===e.key}},[t._v(t._s(t.voteTypes.find((function(t){return t.value==e.key})).name)+": "+t._s(e.value))])])])})),0):e.cycle?o("div",{staticClass:"is-size-7 has-text-right"},[t._v("\n            Cycle "+t._s(e.cycle)+"\n          ")]):t._e()])])])})),1):o("h5",{staticClass:"has-text-centered"},[t._v("\n    No Proposals\n  ")])]):t._e()}),[],!1,null,"8c69251c",null);e.default=component.exports},693:function(t,e,o){"use strict";o(690)},694:function(t,e,o){(e=o(57)(!1)).push([t.i,'.proposals .media-left[data-v-8c69251c]{min-width:72px}.vote-result[data-v-8c69251c]:after{content:" - "}.vote-result[data-v-8c69251c]:last-of-type:after{content:""}.media[data-v-8c69251c]{flex-wrap:wrap}',""]),t.exports=e},771:function(t,e,o){"use strict";o.r(e);o(36),o(78),o(59),o(70),o(44);var n=o(3),r=o(691),c=o(178),l={components:{Proposals:r.default,ConnectWallet:c.default},data:function(){return{filter:"ALL",statuses:[{id:"ACTIVE",name:"Active"},{id:"PENDING",name:"Pending"},{id:"DRAFT",name:"Draft"},{id:"PROCESSING",name:"Processing"},{id:"CLOSED",name:"Closed"},{id:"ALL",name:"All"}],loading:!1,proposals:null,moreProposals:null,nextKey:null}},computed:{wallet:function(){return this.$wallet?this.$wallet.wallet:null},proposalsFiltered:function(){var t=this;return this.proposals.filter((function(e){return!t.filter||"ALL"===t.filter||e.status===t.filter})).sort((function(a,b){return a.cycle===b.cycle?a.id>b.id?-1:1:0===a.cycle?1:0===b.cycle?-1:a.cycle>b.cycle?1:-1}))},currentCycle:function(){return this.$dao.proposalConfig?this.$dao.proposalConfig.current_cycle:null}},watch:{currentCycle:function(){this.getProposals()}},created:function(){this.getProposals()},methods:{getProposals:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.loading=!0,!t.$dao.proposalConfig){e.next=19;break}return e.prev=2,o={code:"daoproposals",scope:"daoproposals",table:"proposal",limit:20},t.nextKey&&(o.lower_bound=t.nextKey),e.next=7,t.$eos.rpc.get_table_rows(o);case 7:data=e.sent,t.moreProposals=data.more,t.nextKey=data.next_key,t.proposals?t.proposals=t.proposals.concat(data.rows):t.proposals=data.rows,t.proposals.forEach(function(){var e=Object(n.a)(regeneratorRuntime.mark((function e(o){var n,r,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o.status){e.next=12;break}if(n="CLOSED",0!==o.state){e.next=11;break}if(o.cycle){e.next=7;break}n="DRAFT",e.next=11;break;case 7:return e.next=9,t.$dao.getCycleConfig(o.cycle);case 9:r=e.sent,n=r&&o.cycle===t.$dao.cycleConfig.current_cycle&&t.$moment(r.start_time+"Z").add(t.$dao.proposalConfig.cycle_voting_duration_sec,"seconds").isAfter()?"ACTIVE":r&&t.$moment(r.start_time+"Z").add(t.$dao.proposalConfig.cycle_voting_duration_sec,"seconds").isBefore()?"PROCESSING":"PENDING";case 11:t.$set(o,"status",n);case 12:if(o.title){e.next=23;break}return e.prev=13,e.next=16,t.$dao.getIpfsProposal(o.content_hash);case 16:c=e.sent,t.$set(o,"title",c.title),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(13),console.error(e.t0);case 23:case"end":return e.stop()}}),e,null,[[13,20]])})));return function(t){return e.apply(this,arguments)}}()),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(2),console.log(e.t0);case 17:t.moreProposals&&t.getProposals(),t.loading=!1;case 19:case"end":return e.stop()}}),e,null,[[2,14]])})))()}}},d=o(20),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"has-text-centered"},[o("nuxt-link",{staticClass:"button is-primary is-wide m-2",attrs:{to:"/proposals/new"}},[t._v("\n      New Proposal\n    ")]),t._v(" "),t.wallet&&t.wallet.auth?o("nuxt-link",{staticClass:"button is-primary is-wide m-2 is-outlined",attrs:{to:"/account/"+t.wallet.auth.accountName}},[t._v("\n      Your Proposals\n    ")]):o("ConnectWallet",{attrs:{title:"Your Proposals","button-class":"is-wide is-outlined m-2"}})],1),t._v(" "),o("div",{staticClass:"box mt-5"},[o("h4",{staticClass:"box-title mb-0"},[t._v("\n      Proposals\n      "),o("div",{staticClass:"is-size-6 mt-2"},[o("small",[t.$dao.cycleConfig&&t.$moment(t.$dao.cycleConfig.start_time+"Z").add(t.$dao.proposalConfig.cycle_voting_duration_sec,"seconds").isAfter()?o("span",[t.currentCycle?o("span",[t._v("Cycle "+t._s(t.currentCycle)+"\n              "),t.$dao.cycleConfig?o("span",[t._v("\n                started "+t._s(t.$moment(t.$dao.cycleConfig.start_time+"Z").fromNow())+" and ends "+t._s(t.$moment(t.$dao.cycleConfig.start_time+"Z").add(t.$dao.proposalConfig.cycle_duration_sec,"seconds").fromNow())+" "),o("br"),t._v("\n                Voting ends "+t._s(t.$moment(t.$dao.cycleConfig.start_time+"Z").add(t.$dao.proposalConfig.cycle_voting_duration_sec,"seconds").fromNow())+"\n              ")]):t._e()]):t._e()]):t.$dao.cycleConfig&&t.currentCycle?o("span",[t._v("\n            New cycle starts "+t._s(t.$moment(t.$dao.cycleConfig.start_time+"Z").add(t.$dao.proposalConfig.cycle_duration_sec,"seconds").fromNow())+"\n          ")]):t.$dao.cycleConfig?o("span",[t._v("\n            Waiting for "),o("i",[t._v("Genesis Cycle")]),t._v(" "),t.$dao.cycleConfig?o("span",[t._v("start "+t._s(t.$moment(t.$dao.cycleConfig.start_time+"Z").add(t.$dao.proposalConfig.cycle_duration_sec,"seconds").fromNow()))]):t._e()]):t._e()])])]),t._v(" "),o("div",{staticClass:"tabs"},[o("ul",t._l(t.statuses,(function(e){return o("li",{key:e.id,class:{"is-active":t.filter===e.id}},[o("a",{on:{click:function(o){o.preventDefault(),t.filter=e.id}}},[t._v(t._s(e.name))])])})),0)]),t._v(" "),t.$dao.cycleConfig?[t.currentCycle?["ACTIVE"===t.filter?o("h5",[t._v("\n          Cycle "+t._s(t.currentCycle)+" ends "+t._s(t.$moment(t.$dao.cycleConfig.start_time+"Z").add(t.$dao.proposalConfig.cycle_duration_sec,"seconds").fromNow())+"\n        ")]):"PENDING"===t.filter?o("h5",[t._v("\n          Proposals for cycle "+t._s(t.currentCycle+1)+" starting "+t._s(t.$moment(t.$dao.cycleConfig.start_time+"Z").add(t.$dao.proposalConfig.cycle_duration_sec,"seconds").fromNow())+"\n        ")]):t._e()]:["ACTIVE"===t.filter?o("h5",[t._v("\n          Waiting for "),o("i",[t._v("Genesis Cycle")]),t._v(" "+t._s(t.currentCycle+1)+" start "+t._s(t.$moment(t.$dao.cycleConfig.start_time+"Z").add(t.$dao.proposalConfig.cycle_duration_sec,"seconds").fromNow())+"\n        ")]):t._e(),t._v(" "),"PENDING"===t.filter?o("h5",[t._v("\n          Proposals for "),o("i",[t._v("Genesis Cycle")]),t._v(" "+t._s(t.currentCycle+1)+" starting "+t._s(t.$moment(t.$dao.cycleConfig.start_time+"Z").add(t.$dao.proposalConfig.cycle_duration_sec,"seconds").fromNow())+"\n        ")]):t._e()]]:t._e(),t._v(" "),"DRAFT"===t.filter?o("h5",[t._v("\n      Not yet assigned to a cycle\n    ")]):"CLOSED"===t.filter?o("h5",[t._v("\n      Accepted or rejected proposals\n    ")]):t._e(),t._v(" "),t.proposals&&t.proposals.length>0?o("proposals",{attrs:{proposals:t.proposalsFiltered}}):t.proposals&&0==t.proposals.length?o("div",[t._v("\n      No proposals\n    ")]):t._e(),t._v(" "),t.loading?o("h4",{staticClass:"has-text-centered"},[t._v("\n      Loading proposals..\n    ")]):t._e()],2)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ConnectWallet:o(178).default,Proposals:o(691).default})}}]);