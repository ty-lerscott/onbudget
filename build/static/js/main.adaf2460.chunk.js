(this["webpackJsonpon-budget"]=this["webpackJsonpon-budget"]||[]).push([[0],{169:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return o})),n.d(t,"c",(function(){return s}));var a=n(245),c=n.n(a),r=n(31),i="STATEMENT",o="CATEGORIES",s="TRANSACTIONS",u={isLoading:!0,categories:[],isFetching:!1,transactions:[]};t.d=Object(r.c)({isLoading:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u.isLoading,t=arguments.length>1?arguments[1]:void 0,n=t.type;switch(n){case"@@reactReduxFirebase/LOGIN":case"@@reactReduxFirebase/LOGIN_ERROR":case"@@reactReduxFirebase/AUTH_EMPTY_CHANGE":return!1;case"@@reactReduxFirebase/AUTHENTICATION_INIT_STARTED":return!0;default:return e}},categories:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u.categories,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"".concat(o,"_SUCCESS"):return a;case"ADD_".concat(o,"_SUCCESS"):return e.concat(a);case"EDIT_".concat(o,"_SUCCESS"):var r=c()(e),i=r.findIndex((function(e){return e.id===a.id}));return r[i]=a,r;case"".concat(o,"_PENDING"):case"".concat(o,"_FAILURE"):default:return e}},isFetching:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u.isFetching,t=arguments.length>1?arguments[1]:void 0,n=t.type;switch(n){case"".concat(o,"_PENDING"):return!0;case"".concat(o,"_SUCCESS"):case"".concat(o,"_FAILURE"):return!1;default:return e}},transactions:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u.transactions,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"".concat(s,"_SUCCESS"):return a;case"".concat(s,"_BY_MONTH_SUCCESS"):return e.concat(a);case"".concat(s,"_PENDING"):case"".concat(s,"_FAILURE"):default:return e}}})},172:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o}));var a=n(47),c=n(10),r=n(31),i="DATE",o="LOADING_COMPLETE",s={date:new Date,dashboard:{isLoading:{overview:!0,categoryList:!0,overallSpending:!0,categoryBreakdown:!0,transactionOverview:!0}}};t.c=Object(r.c)({date:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.date,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"SET_".concat(i):return a;default:return e}},dashboard:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.dashboard,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case"SET_".concat(o):return Object(c.a)(Object(c.a)({},e),{},{isLoading:Object(c.a)(Object(c.a)({},e.isLoading),{},Object(a.a)({},r,!1))});default:return e}}})},247:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return o}));var a=n(10),c="SESSION",r="SIGN_IN",i="REQUEST_ACCESS",o="FORGOT_PASSWORD",s={token:"",claims:[],authTime:"",fetched:!1,issuedAtTime:"",expirationTime:"",signInProvider:"",signInSecondFactor:""};t.d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case"".concat(c,"_SUCCESS"):return Object(a.a)(Object(a.a)(Object(a.a)({},e),r),{},{fetched:!0});case"@@reactReduxFirebase/AUTH_EMPTY_CHANGE":return Object(a.a)(Object(a.a)({},e),{},{fetched:!0});case"".concat(c,"_PENDING"):default:return e}}},454:function(e,t,n){},455:function(e,t,n){},466:function(e,t,n){},467:function(e,t,n){"use strict";n.r(t);var a=n(10),c=n(11),r=n(0),i=n(105),o=n(25),s=n(480),u=n(255),d=n(253),p=n(107),b=n(110),E=n(111),f=n.n(E),_=(n(270),n(272),n(275),n(106)),l=n(76),A=n(256),S=n(481),O=n(483),g=n(474),h=(n(454),Object(o.c)((function(e){return{isLoading:e.app.isLoading}}))((function(e){return e.isLoading?Object(c.jsxs)("div",{className:"AppLoading",children:[Object(c.jsx)(g.a,{withOverlay:!0})," "]}):null}))),R=(n(455),n(79)),j=n(14),I=n.n(j),T=n(482),v={deleteThisNotification:R.a},P=Object(o.c)(null,v)((function(e){var t=e.id,n=e.subtitle,a=void 0===n?"":n,r=e.type,i=void 0===r?"info":r,o=e.deleteThisNotification,s=i[0].toUpperCase()+i.substr(1);return Object(c.jsx)(T.a,{className:I()("Notification","Notification--".concat(i)),kind:i,lowContrast:!0,role:"alert",title:s,subtitle:a,caption:!1,onCloseButtonClick:function(){o(t)}})})),C={dequeue:R.b},y=Object(o.c)((function(e){return{notifications:e.notifications}}),C)((function(e){var t=e.dequeue,n=e.notifications,i=Object(r.useRef)((function(){return t()})).current;return Object(r.useEffect)((function(){n.length&&setTimeout((function(){i()}),3e3)}),[n,i]),Object(c.jsx)("div",{className:"NotificationCenter",children:Object(c.jsx)("div",{className:"Notification-List",children:n.map((function(e,t){return Object(c.jsx)(P,Object(a.a)({},e),"Notification-".concat(t))}))})})})),N=[{component:function(e){var t=e.route;return!!(null===t||void 0===t?void 0:t.routes)&&Object(c.jsxs)("main",{className:"App",children:[Object(c.jsx)(S.a,{"aria-label":"On Budget",children:Object(c.jsx)(O.a,{prefix:"",href:"#",children:"OnBudget"})}),Object(c.jsx)(y,{}),Object(c.jsx)(h,{}),Object(p.a)(t.routes)]})},routes:[{path:"/",exact:!0,component:Object(A.a)((function(){return Promise.all([n.e(3),n.e(4)]).then(n.bind(null,539))}))}]}],F=n(172),m=n(169),U=n(247),L=n(60),x={ui:F.c,app:m.d,session:U.d,notifications:L.b},B=n(250),w=n(251),D=n(20),G=function(e){e.getState,e.dispatch;return function(e){return function(t){switch(t.type){case"@@reactReduxFirebase/LOGIN":var n=t.auth.email;D.b("user",{email:n})}return e(t)}}},K=n(31),k=n(248),W=n(113),H=n.n(W),V=n(47),z=n(168),M=!!Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_apiKey:"AIzaSyBBUtULZb9dSNyz-0FAgKS8k3Tx90uxVRs",REACT_APP_FIREBASE_authDomain:"on-budget-app.firebaseapp.com",REACT_APP_FIREBASE_databaseURL:"https://on-budget-app.firebaseio.com",REACT_APP_FIREBASE_projectId:"on-budget-app",REACT_APP_FIREBASE_storageBucket:"on-budget-app.appspot.com",REACT_APP_FIREBASE_messagingSenderId:"273430886391",REACT_APP_FIREBASE_appId:"1:273430886391:web:3bf8aeef8c75f15baf60f2",REACT_APP_FIREBASE_measurementId:"G-PJWK48EWV2"}).REACT_APP_EMULATING,J=function(){var e=Object(z.a)(H.a.mark((function e(t){var n,c,r,i,o,s,u;return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.body,c=t.path,r=t.dispatch,i=t.getFirebase,e.next=3,i();case 3:return o=e.sent,M&&(o.functions().emulatorOrigin="http://localhost:3030"),r({type:"API_PENDING",payload:{path:c}}),s=o.functions().httpsCallable(c),u=Object.keys(n||{}).length,e.abrupt("return",s(Object(a.a)({isEmulating:M},u?n:{body:n})).then((function(e){var t=e.data,n=e.errors,a=e.result;if(Array.isArray(n)&&(null===n||void 0===n?void 0:n.length))throw r({type:"API_FAILURE",payload:{path:c}}),new Error(n[0].message);var i=Object(V.a)({},c,t||a);return r({type:"API_SUCCESS",payload:{path:c}}),i})).catch((function(e){r({type:"API_FAILURE",payload:{path:c}}),console.error(e)})));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=function(e){var t=e.history,n=e.reducers,c=e.initial,r=void 0===c?{}:c;e.routes;return Object(K.d)(Object(K.c)(Object(a.a)({router:Object(b.b)(t),firebase:l.firebaseReducer,firestore:_.firestoreReducer},n)),r,Object(K.a)(B.a.withExtraArgument({getFirebase:l.getFirebase,api:J}),Object(k.a)(t),Object(w.createLogger)(),G))};n(466);!function(){var e=Object(d.a)(),t=Q({routes:N,history:e,initial:{},reducers:x}),n={firebase:f.a,config:{userProfile:"users",useFirestoreForProfile:!0},dispatch:t.dispatch,createFirestoreInstance:_.createFirestoreInstance};window.onbudget=window.onbudget||t,console.warn(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FIREBASE_apiKey:"AIzaSyBBUtULZb9dSNyz-0FAgKS8k3Tx90uxVRs",REACT_APP_FIREBASE_authDomain:"on-budget-app.firebaseapp.com",REACT_APP_FIREBASE_databaseURL:"https://on-budget-app.firebaseio.com",REACT_APP_FIREBASE_projectId:"on-budget-app",REACT_APP_FIREBASE_storageBucket:"on-budget-app.appspot.com",REACT_APP_FIREBASE_messagingSenderId:"273430886391",REACT_APP_FIREBASE_appId:"1:273430886391:web:3bf8aeef8c75f15baf60f2",REACT_APP_FIREBASE_measurementId:"G-PJWK48EWV2"})),f.a.initializeApp({appId:"1:273430886391:web:3bf8aeef8c75f15baf60f2",apiKey:"AIzaSyBBUtULZb9dSNyz-0FAgKS8k3Tx90uxVRs",projectId:"on-budget-app",authDomain:"on-budget-app.firebaseapp.com",databaseURL:"https://on-budget-app.firebaseio.com",storageBucket:"on-budget-app.appspot.com",measurementId:"G-PJWK48EWV2",messagingSenderId:"273430886391"}),f.a.firestore(),s.a({dsn:"https://700dc73d529244cebcb02cc6e5b2ed77@o472551.ingest.sentry.io/5506363",integrations:[new u.a.BrowserTracing],tracesSampleRate:1}),Object(i.render)(Object(c.jsx)(o.a,{store:t,children:Object(c.jsx)(l.ReactReduxFirebaseProvider,Object(a.a)(Object(a.a)({},n),{},{children:Object(c.jsx)(b.a,{history:e,children:Object(p.a)(N)})}))}),document.getElementById("root"))}()},60:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a="NOTIFICATION",c=[];t.b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case"".concat(a,"_ENQUEUE"):return e.concat(r);case"".concat(a,"_DEQUEUE"):return e.slice(1);case"".concat(a,"_DELETE"):return e.filter((function(e){return e.id!==r}));default:return e}}},79:function(e,t,n){"use strict";n.d(t,"c",(function(){return i})),n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return s}));var a=n(10),c=n(60),r=n(468),i=function(e){return function(t){t({type:"".concat(c.a,"_ENQUEUE"),payload:Object(a.a)({id:Object(r.a)(),type:"info"},e)})}},o=function(){return function(e){e({type:"".concat(c.a,"_DEQUEUE")})}},s=function(e){return function(t){t({type:"".concat(c.a,"_DELETE"),payload:e})}}}},[[467,1,2]]]);
//# sourceMappingURL=main.adaf2460.chunk.js.map