(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{147:function(e,t,a){},148:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(20),l=a.n(i),o=a(169),c=(a(95),a(29)),s=a(73),u=a(10),p=a(11),d=a(13),m=a(12),h=a(14),f=a(167),g=a(171),v=a(34),b=a(45),y=(a(61),a(161)),E=a(162),w=a(163),C=a(164),O=a(79),j=a(156),k=a(157),x=a(159),S=a(165),_=a(158),N=a(41),M=a(168),I=a(160),P=a(18),D=a(149),A=a(150),F=a(151),T=a(152),L=a(153),z=a(154),B=a(155),U=a(76),q=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){var t;a.setState((t={},Object(P.a)(t,e.target.name,e.target.value),Object(P.a)(t,"error",void 0),t))},a.handleSubmit=function(e){e.preventDefault(),a.props.login("signin",a.state).catch(function(e){console.log(e),401===e.code&&a.setState({error:e.text})})},a.state={email:"",password:""},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.password,n=e.error,i=this.props.displayModal;return r.a.createElement(D.a,{onSubmit:this.handleSubmit},r.a.createElement(A.a,null,r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Email"),r.a.createElement(L.a,{type:"email",name:"email",placeholder:"Indiquez votre email",value:t,onChange:this.handleChange,invalid:n})),r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Mot de passe"),r.a.createElement(L.a,{type:"password",name:"password",placeholder:"Indiquez votre mot de passe",value:a,onChange:this.handleChange,invalid:n}),r.a.createElement(z.a,null,n))),r.a.createElement(B.a,null,r.a.createElement(U.a,{color:"primary",type:"submit",onClick:this.handleSubmit},"Connexion"),r.a.createElement(U.a,{color:"secondary",onClick:i},"Annuler")))}}]),t}(n.Component),$=Object(g.a)(q),V=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={firstname:"",lastname:"",email:"",password:"",repeatPassword:""},a.handleChange=function(e){var t;a.setState((t={},Object(P.a)(t,e.target.name,e.target.value),Object(P.a)(t,"verif".concat(e.target.name),void 0),t))},a.handleSubmit=function(e){e.preventDefault();var t=a.state,n=t.email,r=t.password,i=t.repeatPassword;if(n.match(/^[\w-.]+@[\w-]+\.\w+$/g))if(r.length<8)a.setState({verifpassword:!0});else if(i!==r)a.setState({verifrepeatPassword:!0});else{var l=Object.assign({},a.state);delete l.repeatPassword,a.props.login("signup",l).then(function(e){}).catch(function(e){})}else a.setState({verifemail:!0})},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.state,t=e.firstname,a=e.lastname,n=e.email,i=e.password,l=e.repeatPassword,o=e.verifemail,c=e.verifpassword,s=e.verifrepeatPassword,u=this.props.displayModal;return r.a.createElement(D.a,{onSubmit:this.handleSubmit},r.a.createElement(A.a,null,r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Nom"),r.a.createElement(L.a,{type:"text",name:"lastname",onChange:this.handleChange,value:a})),r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Pr\xe9nom"),r.a.createElement(L.a,{type:"text",name:"firstname",onChange:this.handleChange,value:t})),r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Email"),r.a.createElement(L.a,{type:"email",name:"email",onChange:this.handleChange,value:n,invalid:o}),r.a.createElement(z.a,null,"Ce n'est pas une adresse valide")),r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Mot de passe"),r.a.createElement(L.a,{type:"password",name:"password",placeholder:"8 caract\xe8res minimum",onChange:this.handleChange,value:i,invalid:c}),r.a.createElement(z.a,null,"Votre mot de passe doit faire plus de 8 caract\xe8res")),r.a.createElement(F.a,null,r.a.createElement(L.a,{type:"password",name:"repeatPassword",placeholder:"R\xe9p\xe9tez votre mot de passe",onChange:this.handleChange,value:l,invalid:s}),r.a.createElement(z.a,null,"Vos mots de passes ne correspondent pas"))),r.a.createElement(B.a,null,r.a.createElement(U.a,{color:"primary",type:"submit",onClick:this.handleSubmit},"Inscription"),r.a.createElement(U.a,{color:"secondary",onClick:u},"Annuler")))}}]),t}(n.Component),H=Object(g.a)(V),R=function(e){function t(e){var a;Object(u.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).displayModal=function(){a.setState(function(e){return{modal:!e.modal}})};var n=a.props.isConnected;return a.state={modal:!1,registerByDefault:!0,isConnected:n},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.isConnected,n=t.modal,i=t.registerByDefault,l=this.props,o=l.login,c=l.logout;return r.a.createElement(r.a.Fragment,null,a?r.a.createElement(O.a,{nav:!0,toggle:this.displayDropdownAccount},r.a.createElement(j.a,{nav:!0},r.a.createElement(N.a,{icon:"user",className:"user-icon"})),r.a.createElement(k.a,{className:"account-dropdown"},r.a.createElement(_.a,{to:"/account"},r.a.createElement(x.a,null,"Mon compte")),r.a.createElement(_.a,{to:"/",onClick:c},r.a.createElement(x.a,null,"D\xe9connexion")))):r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{onClick:this.displayModal,className:"auth-text"},"Autentification"),r.a.createElement(M.a,{isOpen:n,fade:!1,toggle:this.displayModal},r.a.createElement("div",{className:"modal-header"},r.a.createElement(I.a,{className:!0===i?"active":"",onClick:function(){return e.setState({registerByDefault:!0})}},"Inscription"),r.a.createElement(I.a,{className:!0===i?"":"active",onClick:function(){return e.setState({registerByDefault:!1})}},"Connexion")),i?r.a.createElement(H,{displayModal:this.displayModal,modal:n,login:o}):r.a.createElement($,{displayModal:this.displayModal,modal:n,login:o}))))}}]),t}(r.a.Component),Q=a(52),G=a.n(Q),J=a(80),W="http://154.49.211.218:5555/";function Y(e){return Z.apply(this,arguments)}function Z(){return(Z=Object(J.a)(G.a.mark(function e(t){return G.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.ok){e.next=4;break}if(204!==t.status){e.next=3;break}return e.abrupt("return",Promise.resolve());case 3:return e.abrupt("return",Promise.resolve(t.json()));case 4:return e.t0=Promise,e.t1=t.status,e.next=8,t.text();case 8:return e.t2=e.sent,e.t3={code:e.t1,text:e.t2},e.abrupt("return",e.t0.reject.call(e.t0,e.t3));case 11:case"end":return e.stop()}},e)}))).apply(this,arguments)}function K(e,t,a){var n={method:t,headers:{"Content-Type":"application/json"}};return localStorage.getItem("token")&&(n.headers.authorization="Bearer ".concat(localStorage.getItem("token"))),a&&(n.body=JSON.stringify(a)),fetch(W+e,n).then(Y)}var X={get:function(e){return K(e,"GET")},post:function(e,t){return K(e,"POST",t)},put:function(e,t){return K(e,"PUT",t)},delete:function(e){return K(e,"DELETE")}},ee=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={name:""},a.handleChange=function(e){a.setState(Object(P.a)({},e.target.name,e.target.value))},a.handleSubmit=function(){var e=a.state.name,t=a.props.displayModal;X.post("circuit",{name:e}).then(function(e){t(),a.props.history.push("/circuit/".concat(e.id_circuit))}).catch(function(e){return console.log(e)})},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.state.name,t=this.props,a=t.modal,n=t.displayModal;return r.a.createElement(r.a.Fragment,null,r.a.createElement(M.a,{isOpen:a,fade:!1,toggle:n},r.a.createElement(I.a,null,"Nouveau circuit"),r.a.createElement(A.a,null,r.a.createElement(D.a,null,r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Nom"),r.a.createElement(L.a,{type:"text",name:"name",value:e,onChange:this.handleChange})))),r.a.createElement(B.a,null,r.a.createElement(U.a,{color:"primary",onClick:this.handleSubmit},"Cr\xe9er"),r.a.createElement(U.a,{color:"secondary",onClick:n},"Annuler"))))}}]),t}(n.Component),te=Object(g.a)(ee),ae=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={responsiveNavBarMode:!1,modal:!1},a.toggle=function(){a.setState(function(e){return{responsiveNavBarMode:!e.responsiveNavBarMode}})},a.displayModal=function(){a.setState(function(e){return{modal:!e.modal}})},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.state,t=e.responsiveNavBarMode,a=e.modal,n=this.props,i=n.isConnected,l=n.login,o=n.logout;return r.a.createElement("div",null,r.a.createElement(y.a,{expand:"md",fixed:"top"},r.a.createElement(_.a,{to:"/"},r.a.createElement("img",{src:"/img/logoGeoScoutWhite.png",className:"logo",alt:"GeoScout"})),r.a.createElement(E.a,{onClick:this.toggle}),i?r.a.createElement(w.a,{responsiveNavBarMode:t,navbar:!0},r.a.createElement(C.a,{className:"ml-auto",navbar:!0},r.a.createElement(O.a,{nav:!0},r.a.createElement(j.a,{nav:!0,caret:!0},"Circuits"),r.a.createElement(k.a,null,r.a.createElement(_.a,{to:"/circuits"},r.a.createElement(x.a,null,"Cr\xe9\xe9s")),r.a.createElement(_.a,{to:"/achievements"},r.a.createElement(x.a,null,"R\xe9alis\xe9s")),r.a.createElement(_.a,{to:"/todo"},r.a.createElement(x.a,null,"Ma liste")),r.a.createElement(x.a,{divider:!0}),r.a.createElement(x.a,{onClick:this.displayModal,className:"create-circuit"},"Cr\xe9er un circuit"))),r.a.createElement(R,{isConnected:i,logout:o}))):r.a.createElement(w.a,{responsiveNavBarMode:t,navbar:!0},r.a.createElement(C.a,{className:"flex-end",navbar:!0},r.a.createElement(S.a,null,r.a.createElement(R,{isConnected:i,login:l}))))),r.a.createElement(te,{displayModal:this.displayModal,modal:a}))}}]),t}(r.a.Component),ne=a(81),re=a.n(ne),ie=a(35),le=a(83),oe=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.onClick,a=e.index,n=8,i={cursor:"pointer",fill:this.props.color,stroke:"none"};return 11===a?n=6:a>9?n=5:1!==a&&7!==a||(n=9),r.a.createElement("svg",{height:25,viewBox:"0 0 24 24",style:Object(le.a)({},i),onClick:t},r.a.createElement("path",{d:"M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3\n  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9\n  C20.1,15.8,20.2,15.8,20.2,15.7z"}),r.a.createElement("text",{x:n,y:15,fill:"white",fontSize:13},a))}}]),t}(n.PureComponent),ce=a(84),se=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).centerStep=function(e){var t=a.props,n=t.viewport,r=t.changeViewport;n.latitude=e.latitude,n.longitude=e.longitude+.03,n.zoom=12,r(n)},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.steps,n=t.circuits,i=t.onClickMap,l=t.onClickMarker,o=t.className,c=t.viewport,s=t.userPosition,u=t.changeViewport;return r.a.createElement("div",{className:o},r.a.createElement(ie.b,Object.assign({mapboxApiAccessToken:"pk.eyJ1IjoidHVudGVyZmluZ2VyIiwiYSI6ImNqcncxOTkwdDA3YW00M3BrY3A0MTAyd3kifQ.Mby6nOzqK6Tkzm1CwRfdDw"},c,{mapStyle:ce,onViewportChange:u,onClick:i}),s&&r.a.createElement(ie.a,{latitude:s.latitude,longitude:s.longitude,offsetLeft:-10,offsetTop:-20},r.a.createElement(oe,{color:"#cc0000"})),a&&a.map(function(t){return r.a.createElement(ie.a,{key:t.id_step,latitude:t.latitude,longitude:t.longitude,offsetLeft:-11,offsetTop:-25},r.a.createElement(oe,{color:"#1f7a1f",index:t.order,onClick:function(){l(t),e.centerStep(t)}}))}),n&&n.map(function(e,t){return e.Steps[0].latitude&&e.Steps[0].longitude?r.a.createElement(ie.a,{key:t,latitude:e.Steps[0].latitude,longitude:e.Steps[0].longitude,offsetLeft:-11,offsetTop:-25},r.a.createElement(oe,{color:"#0066cc",onClick:function(){return l(e.id_circuit)}})):null})))}}]),t}(r.a.Component),ue=a(166),pe=a(170),de=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={tooltipPublicationOpen:!1,tooltipLevelOpen:!1},a.publishedStatusToggler=function(){a.setState({tooltipPublicationOpen:!a.state.tooltipPublicationOpen})},a.levelToggler=function(){a.setState({tooltipLevelOpen:!a.state.tooltipLevelOpen})},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e,t=this.props,a=t.id_circuit,n=t.name,i=t.description,l=t.length,o=t.onHome,c=t.duration,s=t.version,u=t.published,p=t.level,d=t.history,m=this.state,h=m.tooltipPublicationOpen,f=m.tooltipLevelOpen;switch(p){case"1":e="medium";break;case"2":e="hard";break;default:e="easy"}return r.a.createElement(r.a.Fragment,null,r.a.createElement("li",{className:"list-item",onClick:function(){return o?d.push("detail/".concat(a)):d.push("circuit/".concat(a))}},r.a.createElement("h3",{className:"item-name"},n),r.a.createElement("p",null,i&&i),r.a.createElement("p",null,l&&"".concat(l," km")),r.a.createElement("p",null,c&&"".concat(l," heures")),r.a.createElement("p",{className:"version-item"},s&&"Version : ".concat(s)),!o&&r.a.createElement(r.a.Fragment,null,r.a.createElement(pe.a,{placement:"top",isOpen:h,autohide:!1,target:"published".concat(a),toggle:this.publishedStatusToggler},!0===u?"Publi\xe9":"Non-publi\xe9"),r.a.createElement(N.a,{id:"published".concat(a),icon:"align-justify",className:"published-item",color:!0===u?"#27ae60":"white"})),r.a.createElement(pe.a,{placement:"top",isOpen:f,autohide:!1,target:"level".concat(a),toggle:this.levelToggler},"Difficult\xe9 : ".concat(e)),r.a.createElement("span",{className:"level-item ".concat(e),id:"level".concat(a)})))}}]),t}(n.Component),me=Object(g.a)(de),he=function(e){var t=e.items,a=void 0===t?[]:t,n=e.onHome;return r.a.createElement("ul",{className:"item-wrapper"},a.map(function(e){return r.a.createElement(me,Object.assign({key:e.id_circuit},e,{onHome:n}))}))},fe=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={dropdownOpen:!1,filter:"Tous",circuits:[]},a.toggle=function(){a.setState({dropdownOpen:!a.state.dropdownOpen})},a.onFilterClick=function(e){a.setState({filter:e.target.name})},a.componentDidMount=function(){var e=a.props,t=e.onHome,n=e.circuits;t?a.setState({circuits:n}):X.get("my-circuits").then(function(e){a.setState({circuits:e})}).catch(function(e){return console.log(e)})},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.state,t=e.dropdownOpen,a=e.filter,n=e.circuits,i=this.props.onHome,l="Publi\xe9s"===a;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"my-circuits-header"},i?r.a.createElement("h1",null,"Circuits environnants"):r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Circuits cr\xe9\xe9s"),r.a.createElement("div",{className:"header-buttons"},r.a.createElement(ue.a,{direction:"left",className:"button-dropdown",isOpen:t,toggle:this.toggle},r.a.createElement(j.a,{caret:!0,color:"info"},a),r.a.createElement(k.a,null,r.a.createElement(x.a,{name:"Tous",onClick:this.onFilterClick},"Tous"),r.a.createElement(x.a,{name:"Publi\xe9s",onClick:this.onFilterClick},"Publi\xe9s"),r.a.createElement(x.a,{name:"Non-publi\xe9s",onClick:this.onFilterClick},"Non-publi\xe9s")))))),"Tous"===a?r.a.createElement(he,{items:n,onHome:i}):r.a.createElement(he,{items:n.filter(function(e){return e.published===l})}))}}]),t}(n.Component),ge=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={circuits:[],value:!1,onHome:!0,viewport:{width:"100%",height:window.innerHeight-50,latitude:48.582651,longitude:7.749534,distance:30,zoom:12}},a.changeViewport=function(e){a.setState({viewport:e})},a.onClickItem=function(e){var t=a.props.history;console.log(a.state),e&&t.push("detail/".concat(e))},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(t){var a=e.state.viewport;a.latitude=t.coords.latitude,a.longitude=t.coords.longitude,e.setState({viewport:a,userPosition:t.coords})});var t=this.state.viewport,a={user_longitude:t.longitude,user_latitude:t.latitude,distance:t.distance};X.post("circuit/nearby",a).then(function(t){e.setState({circuits:t})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this,t=this.state,a=t.circuits,n=t.value,i=t.onHome,l=t.viewport,o=t.userPosition;return r.a.createElement(r.a.Fragment,null,!1===n?r.a.createElement(se,{className:"map",circuits:a,viewport:l,userPosition:o,changeViewport:this.changeViewport,onClickMarker:this.onClickItem}):r.a.createElement(fe,{onHome:i,circuits:a}),r.a.createElement("div",{className:"toggle-button"},r.a.createElement("p",null,"Liste"),r.a.createElement(re.a,{value:n||!1,onToggle:function(t){e.setState({value:!t})}})))}}]),t}(n.Component),ve=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Mon compte"))}}]),t}(n.Component),be=a(32),ye=function(e){var t=e.step,a=e.onClickItem,n=e.stepFocus;return r.a.createElement(be.b,{draggableId:t.id_step,index:t.order},function(e,i){return r.a.createElement("li",Object.assign({className:"step-wrapper-item ".concat(n&&t.id_step===n.id_step&&"focus-step"),onClick:function(){return a(t)},ref:e.innerRef},e.draggableProps,e.dragHandleProps),r.a.createElement("div",null,r.a.createElement("span",{className:"step-name"},t.name)),r.a.createElement("div",null,r.a.createElement("span",null,t.description)),r.a.createElement("span",{className:"order-item"},t.order))})},Ee=function(e){var t=e.items,a=void 0===t?[]:t,n=e.onClickItem,i=e.stepFocus;return r.a.createElement(be.c,{droppableId:"drop-step",type:"STEP"},function(e,t){return r.a.createElement("ul",Object.assign({className:"step-wrapper",ref:e.innerRef,style:{backgroundColor:t.isDraggingOver&&"#65D8C1"}},e.droppableProps),a.map(function(e){return r.a.createElement(ye,{key:e.order,step:e,onClickItem:n,stepFocus:i})}),e.placeholder)})},we=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={name:"",description:"",instruction:"",questions:{wording:"",response:""}},a.fetchQuestion=function(e){X.get("step/".concat(e,"/questions")).then(function(e){e.length>0&&a.setState({questions:{id:e[0].id_question||void 0,wording:e[0].wording||"",response:e[0].response||""}})})},a.handleChange=function(e){a.setState(Object(P.a)({},e.target.name,e.target.value))},a.handleChangeQuestion=function(e){e.persist(),a.setState(function(t){return t.questions[e.target.name]=e.target.value,{questions:t.questions}})},a.handleSubmit=function(){var e=a.state,t=a.props,n=t.displayUpdateStep,r=t.alert;a.props.updateStep(e).then(function(){a.putQuestion(e.questions),n(),r.success("Etape mise \xe0 jour")}).catch(function(){return r.error("Oups, une erreur s'est produite")})},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this.props.step;e.step!==t&&t&&(this.setState(Object.assign({},t,{description:t.description||"",instruction:t.instruction||"",questions:t.questions||{wording:"",response:""}})),this.fetchQuestion(t.id_step))}},{key:"putQuestion",value:function(e){return e.id?X.put("question/".concat(e.id),e):X.post("question",Object.assign({id_step:this.state.id_step},e))}},{key:"render",value:function(){var e=this.state,t=e.id_step,a=e.name,n=e.description,i=e.instruction,l=e.questions,o=l.wording,c=l.response,s=this.props,u=s.show,p=s.displayUpdateStep,d=s.removeStep;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:u?"update-step":"hidden-update-step"},r.a.createElement("div",{className:"update-title"},r.a.createElement("h3",null,"Modification de l'\xe9tape")),r.a.createElement(D.a,{className:"update-form",onSubmit:function(e){return e.preventDefault()}},r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Nom"),r.a.createElement(L.a,{type:"text",name:"name",value:a,onChange:this.handleChange})),r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Description"),r.a.createElement(L.a,{type:"textarea",name:"description",value:n,onChange:this.handleChange})),r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Instruction de direction"),r.a.createElement(L.a,{type:"textarea",name:"instruction",value:i,onChange:this.handleChange})),r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Intitul\xe9 de la question"),r.a.createElement(L.a,{type:"textarea",name:"wording",value:o,onChange:this.handleChangeQuestion})),r.a.createElement(F.a,null,r.a.createElement(T.a,null,"R\xe9ponse"),r.a.createElement(L.a,{type:"textarea",name:"response",value:c,onChange:this.handleChangeQuestion})),r.a.createElement("div",{className:"update-buttons"},r.a.createElement(U.a,{type:"submit",color:"info",onClick:this.handleSubmit},"Modifier"),r.a.createElement(U.a,{color:"danger",onClick:function(){return d(t)}},"Supprimer"),r.a.createElement(U.a,{color:"secondary",onClick:p},"Annuler")))))}}]),t}(n.Component),Ce=Object(c.c)()(we),Oe=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={name:"",description:"",length:"",duration:""},a.handleChange=function(e){a.setState(Object(P.a)({},e.target.name,e.target.value))},a.handleSubmit=function(){var e=a.state,t=e.id_circuit,n=e.name,r=e.description,i=e.length,l=e.duration,o=a.props,c=o.displayUpdateCircuit,s=o.alert,u={id_circuit:t,name:n||null,description:r||null,length:i||null,duration:l||null};a.props.updateCircuit(u).then(function(){c(),s.success("Circuit mis \xe0 jour")}).catch(function(){return s.error("Oups, une erreur s'est produite")})},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this.props.circuit;e.circuit!==t&&t&&this.setState(Object.assign({},t,{description:t.description||"",instruction:t.instruction||"",length:t.length||"",duration:t.duration||""}))}},{key:"render",value:function(){var e=this.state,t=e.name,a=e.description,n=e.length,i=e.duration,l=this.props,o=l.show,c=l.displayUpdateCircuit;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:o?"update-circuit":"hidden-update-circuit"},r.a.createElement("div",{className:"update-title"},r.a.createElement("h3",null,"Modification du circuit")),r.a.createElement(D.a,{className:"update-form"},r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Nom"),r.a.createElement(L.a,{type:"text",name:"name",value:t,onChange:this.handleChange})),r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Description"),r.a.createElement(L.a,{type:"textarea",name:"description",value:a,onChange:this.handleChange})),r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Distance moyenne"),r.a.createElement(L.a,{type:"text",name:"length",value:n,onChange:this.handleChange})),r.a.createElement(F.a,null,r.a.createElement(T.a,null,"Dur\xe9e moyenne"),r.a.createElement(L.a,{type:"text",name:"duration",value:i,onChange:this.handleChange})),r.a.createElement("div",{className:"update-buttons"},r.a.createElement(U.a,{color:"info",onClick:this.handleSubmit},"Modifier"),r.a.createElement(U.a,{color:"secondary",onClick:c},"Annuler")))))}}]),t}(n.Component),je=Object(c.c)()(Oe),ke=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={circuit:{},steps:[],circuitIsDisplayed:!1,stepIsDisplayed:!1,viewport:{width:"100%",height:window.innerHeight-50,latitude:48.582651,longitude:7.749534,distance:30,zoom:12}},a.changeViewport=function(e){a.setState({viewport:e})},a.onClickItem=function(e){a.setState({stepFocus:e,stepIsDisplayed:!0,circuitIsDisplayed:!1})},a.handleClickMap=function(e){var t=a.state.circuit,n={name:"Etape",longitude:e.lngLat[0],latitude:e.lngLat[1],id_circuit:t.id_circuit};X.post("step",n).then(function(e){a.setState(function(t){return t.steps.push(e),{steps:t.steps}})}).catch(function(e){return console.log(e.text)})},a.removeStep=function(e){X.delete("step/".concat(e)).then(function(){a.setState(function(t){var a=t.steps.findIndex(function(t){return t.id_step===e});return t.steps.splice(a,1),{steps:t.steps}}),a.displayUpdateStep()}).catch(function(e){return console.log(e.text)})},a.updateStep=function(e){return X.put("step/".concat(e.id_step),e).then(function(){a.setState(function(t){t.steps.splice(t.steps.findIndex(function(t){return t.id_step===e.id_step}),1,e)})})},a.updateCircuit=function(e){return X.put("circuit/".concat(e.id_circuit),e).then(function(){a.setState({circuit:e})})},a.displayUpdateCircuit=function(){a.setState(function(e){return{circuitIsDisplayed:!e.circuitIsDisplayed,stepIsDisplayed:!1,stepFocus:null}})},a.displayUpdateStep=function(){a.setState(function(e){return{stepIsDisplayed:!e.stepIsDisplayed,circuitIsDisplayed:!1,stepFocus:null}})},a.dragEnd=function(e){if(e.destination){var t=e.draggableId,n=e.source.index,r=e.destination.index,i=a.state.circuit.id_circuit;a.changeStepOrder(n,r),X.put("step/order",{id:t,id_circuit:i,previous:n,new:r}).then(function(){return null}).catch(function(e){console.log(e),a.changeStepOrder(r,n)})}},a.changeStepOrder=function(e,t){a.setState(function(a){var n=a.steps.map(function(a){return a.order===parseInt(e)?a.order=t:t<=a.order&&a.order<e?a.order+=1:a.order>e&&a.order<=t&&(a.order-=1),a});return n.sort(function(e,t){return e.order-t.order}),{steps:n}})},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(t){var a=e.state.viewport;a.latitude=t.coords.latitude,a.longitude=t.coords.longitude,e.setState({viewport:a,userPosition:t.coords})});var t=this.props.match.params.id;t&&X.get("circuit/".concat(t)).then(function(a){X.get("steps/".concat(t)).then(function(t){e.setState({circuit:a,steps:t})})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this.state,t=e.steps,a=e.stepFocus,n=e.circuit,i=e.circuitIsDisplayed,l=e.stepIsDisplayed,o=e.userPosition,c=e.viewport,s=this.props.history;return r.a.createElement("div",{className:"view-wrapper"},r.a.createElement(se,{className:"new-map",steps:t,onClickMap:this.handleClickMap,onClickMarker:this.onClickItem,userPosition:o,viewport:c,changeViewport:this.changeViewport}),r.a.createElement("div",{className:"scroll-menu"},r.a.createElement("div",{className:"circuit-title"},r.a.createElement("h3",null,n.name),r.a.createElement(U.a,{className:"update-circuit-button",onClick:this.displayUpdateCircuit,color:"info"},"Modifier")),r.a.createElement(be.a,{onDragEnd:this.dragEnd},r.a.createElement(Ee,{items:t,onClickItem:this.onClickItem,stepFocus:a}))),r.a.createElement("p",{className:"come-back-button",onClick:function(){return s.goBack()}},"Valider"),r.a.createElement(Ce,{step:a,removeStep:this.removeStep,updateStep:this.updateStep,show:l,displayUpdateStep:this.displayUpdateStep}),r.a.createElement(je,{circuit:n,show:i,displayUpdateCircuit:this.displayUpdateCircuit,updateCircuit:this.updateCircuit}))}}]),t}(n.Component),xe=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Circuits r\xe9alis\xe9s"))}}]),t}(n.Component),Se=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Ma liste"))}}]),t}(n.Component),_e=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={circuit:[]},a.componentDidMount=function(){var e=a.props.match.params.id;X.get("circuit/".concat(e)).then(function(e){a.setState({circuit:e})}).catch(function(e){console.log(e)})},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.state.circuit,t=e.name,a=e.description,n=e.duration,i=e.length,l=e.level,o=e.need_internet,c=e.version,s=e.createdAt,u=e.updatedAt;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"up-wrapper"},r.a.createElement("h1",null,t),r.a.createElement("div",{className:"circuit-score"},r.a.createElement("p",null,"score"))),r.a.createElement("div",{className:"bottom-wrapper"},r.a.createElement("div",{className:"circuit-infos"},r.a.createElement("p",null,a),r.a.createElement("p",null,n),r.a.createElement("p",null,"".concat(i," km")),r.a.createElement("p",null,l),r.a.createElement("p",null,o),r.a.createElement("p",null,c),r.a.createElement("p",null,s),r.a.createElement("p",null,u)),r.a.createElement("div",{className:"circuit-comments"},r.a.createElement("p",null,"commentaires"))))}}]),t}(n.Component);v.b.add(b.c,b.b,b.a);var Ne=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={isConnected:!1,user:{}},a.login=function(e,t){return X.post(e,t).then(function(e){localStorage.setItem("token",e.token),a.setState({isConnected:!0,user:e.user})})},a.logout=function(){localStorage.removeItem("token"),a.setState({isConnected:!1,user:{}})},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;localStorage.getItem("token")&&X.get("whoami").then(function(t){e.setState({user:t,isConnected:!0})}).catch(function(e){console.log(e),localStorage.removeItem("token")})}},{key:"render",value:function(){var e=this.state,t=e.isConnected,a=e.user;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"menu-wrapper"},r.a.createElement(ae,{isConnected:t,login:this.login,logout:this.logout})),r.a.createElement(f.a,{exact:!0,path:"/",component:ge}),t?r.a.createElement(r.a.Fragment,null,r.a.createElement(f.a,{exact:!0,path:"/account",render:function(e){return r.a.createElement(ve,Object.assign({},e,{user:a}))}}),r.a.createElement(f.a,{exact:!0,path:"/circuits",component:fe}),r.a.createElement(f.a,{exact:!0,path:"/circuit/:id",component:ke}),r.a.createElement(f.a,{exact:!0,path:"/achievements",component:xe}),r.a.createElement(f.a,{exact:!0,path:"/todo",component:Se})):null,r.a.createElement(f.a,{exact:!0,path:"/detail/:id",component:_e}))}}]),t}(n.Component),Me=Object(g.a)(Ne);a(147),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ie={timeout:1500,transition:"fade",position:c.b.TOP_CENTER,containerStyle:{zIndex:1031}};l.a.render(r.a.createElement(o.a,null,r.a.createElement(c.a,Object.assign({template:s.a},Ie),r.a.createElement(Me,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},61:function(e,t,a){},84:function(e){e.exports={version:8,name:"Basic",metadata:{"mapbox:autocomposite":!0},sources:{mapbox:{url:"mapbox://mapbox.mapbox-streets-v7",type:"vector"}},sprite:"mapbox://sprites/mapbox/basic-v8",glyphs:"mapbox://fonts/mapbox/{fontstack}/{range}.pbf",layers:[{id:"background",type:"background",paint:{"background-color":"#dedede"},interactive:!0},{id:"landuse_overlay_national_park",type:"fill",source:"mapbox","source-layer":"landuse_overlay",filter:["==","class","national_park"],paint:{"fill-color":"#d2edae","fill-opacity":.75},interactive:!0},{id:"landuse_park",type:"fill",source:"mapbox","source-layer":"landuse",filter:["==","class","park"],paint:{"fill-color":"#d2edae"},interactive:!0},{id:"waterway",type:"line",source:"mapbox","source-layer":"waterway",filter:["all",["==","$type","LineString"],["in","class","river","canal"]],paint:{"line-color":"#a0cfdf","line-width":{base:1.4,stops:[[8,.5],[20,15]]}},interactive:!0},{id:"water",type:"fill",source:"mapbox","source-layer":"water",paint:{"fill-color":"#a0cfdf"},interactive:!0},{id:"building",type:"fill",source:"mapbox","source-layer":"building",paint:{"fill-color":"#d6d6d6"},interactive:!0},{interactive:!0,layout:{"line-cap":"butt","line-join":"miter"},filter:["all",["==","$type","LineString"],["all",["in","class","motorway_link","street","street_limited","service","track","pedestrian","path","link"],["==","structure","tunnel"]]],type:"line",source:"mapbox",id:"tunnel_minor",paint:{"line-color":"#efefef","line-width":{base:1.55,stops:[[4,.25],[20,30]]},"line-dasharray":[.36,.18]},"source-layer":"road"},{interactive:!0,layout:{"line-cap":"butt","line-join":"miter"},filter:["all",["==","$type","LineString"],["all",["in","class","motorway","primary","secondary","tertiary","trunk"],["==","structure","tunnel"]]],type:"line",source:"mapbox",id:"tunnel_major",paint:{"line-color":"#fff","line-width":{base:1.4,stops:[[6,.5],[20,30]]},"line-dasharray":[.28,.14]},"source-layer":"road"},{interactive:!0,layout:{"line-cap":"round","line-join":"round"},filter:["all",["==","$type","LineString"],["all",["in","class","motorway_link","street","street_limited","service","track","pedestrian","path","link"],["in","structure","none","ford"]]],type:"line",source:"mapbox",id:"road_minor",paint:{"line-color":"#efefef","line-width":{base:1.55,stops:[[4,.25],[20,30]]}},"source-layer":"road"},{interactive:!0,layout:{"line-cap":"round","line-join":"round"},filter:["all",["==","$type","LineString"],["all",["in","class","motorway","primary","secondary","tertiary","trunk"],["in","structure","none","ford"]]],type:"line",source:"mapbox",id:"road_major",paint:{"line-color":"#fff","line-width":{base:1.4,stops:[[6,.5],[20,30]]}},"source-layer":"road"},{interactive:!0,layout:{"line-cap":"butt","line-join":"miter"},filter:["all",["==","$type","LineString"],["all",["in","class","motorway_link","street","street_limited","service","track","pedestrian","path","link"],["==","structure","bridge"]]],type:"line",source:"mapbox",id:"bridge_minor case",paint:{"line-color":"#dedede","line-width":{base:1.6,stops:[[12,.5],[20,10]]},"line-gap-width":{base:1.55,stops:[[4,.25],[20,30]]}},"source-layer":"road"},{interactive:!0,layout:{"line-cap":"butt","line-join":"miter"},filter:["all",["==","$type","LineString"],["all",["in","class","motorway","primary","secondary","tertiary","trunk"],["==","structure","bridge"]]],type:"line",source:"mapbox",id:"bridge_major case",paint:{"line-color":"#dedede","line-width":{base:1.6,stops:[[12,.5],[20,10]]},"line-gap-width":{base:1.55,stops:[[4,.25],[20,30]]}},"source-layer":"road"},{interactive:!0,layout:{"line-cap":"round","line-join":"round"},filter:["all",["==","$type","LineString"],["all",["in","class","motorway_link","street","street_limited","service","track","pedestrian","path","link"],["==","structure","bridge"]]],type:"line",source:"mapbox",id:"bridge_minor",paint:{"line-color":"#efefef","line-width":{base:1.55,stops:[[4,.25],[20,30]]}},"source-layer":"road"},{interactive:!0,layout:{"line-cap":"round","line-join":"round"},filter:["all",["==","$type","LineString"],["all",["in","class","motorway","primary","secondary","tertiary","trunk"],["==","structure","bridge"]]],type:"line",source:"mapbox",id:"bridge_major",paint:{"line-color":"#fff","line-width":{base:1.4,stops:[[6,.5],[20,30]]}},"source-layer":"road"},{interactive:!0,layout:{"line-cap":"round","line-join":"round"},filter:["all",["==","$type","LineString"],["all",["<=","admin_level",2],["==","maritime",0]]],type:"line",source:"mapbox",id:"admin_country",paint:{"line-color":"#8b8a8a","line-width":{base:1.3,stops:[[3,.5],[22,15]]}},"source-layer":"admin"},{interactive:!0,minzoom:5,layout:{"icon-image":"{maki}-11","text-offset":[0,.5],"text-field":"{name_en}","text-font":["Open Sans Semibold","Arial Unicode MS Bold"],"text-max-width":8,"text-anchor":"top","text-size":11,"icon-size":1},filter:["all",["==","$type","Point"],["all",["==","scalerank",1],["==","localrank",1]]],type:"symbol",source:"mapbox",id:"poi_label",paint:{"text-color":"#666","text-halo-width":1,"text-halo-color":"rgba(255,255,255,0.75)","text-halo-blur":1},"source-layer":"poi_label"},{interactive:!0,layout:{"symbol-placement":"line","text-field":"{name_en}","text-font":["Open Sans Semibold","Arial Unicode MS Bold"],"text-transform":"uppercase","text-letter-spacing":.1,"text-size":{base:1.4,stops:[[10,8],[20,14]]}},filter:["all",["==","$type","LineString"],["in","class","motorway","primary","secondary","tertiary","trunk"]],type:"symbol",source:"mapbox",id:"road_major_label",paint:{"text-color":"#666","text-halo-color":"rgba(255,255,255,0.75)","text-halo-width":2},"source-layer":"road_label"},{interactive:!0,minzoom:8,layout:{"text-field":"{name_en}","text-font":["Open Sans Semibold","Arial Unicode MS Bold"],"text-max-width":6,"text-size":{stops:[[6,12],[12,16]]}},filter:["all",["==","$type","Point"],["in","type","town","village","hamlet","suburb","neighbourhood","island"]],type:"symbol",source:"mapbox",id:"place_label_other",paint:{"text-color":"#666","text-halo-color":"rgba(255,255,255,0.75)","text-halo-width":1,"text-halo-blur":1},"source-layer":"place_label"},{interactive:!0,layout:{"text-field":"{name_en}","text-font":["Open Sans Bold","Arial Unicode MS Bold"],"text-max-width":10,"text-size":{stops:[[3,12],[8,16]]}},maxzoom:16,filter:["all",["==","$type","Point"],["==","type","city"]],type:"symbol",source:"mapbox",id:"place_label_city",paint:{"text-color":"#666","text-halo-color":"rgba(255,255,255,0.75)","text-halo-width":1,"text-halo-blur":1},"source-layer":"place_label"},{interactive:!0,layout:{"text-field":"{name_en}","text-font":["Open Sans Regular","Arial Unicode MS Regular"],"text-max-width":10,"text-size":{stops:[[3,14],[8,22]]}},maxzoom:12,filter:["==","$type","Point"],type:"symbol",source:"mapbox",id:"country_label",paint:{"text-color":"#666","text-halo-color":"rgba(255,255,255,0.75)","text-halo-width":1,"text-halo-blur":1},"source-layer":"country_label"}]}},90:function(e,t,a){e.exports=a(148)}},[[90,1,2]]]);
//# sourceMappingURL=main.f8892594.chunk.js.map