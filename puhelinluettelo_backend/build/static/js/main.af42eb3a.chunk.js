(this.webpackJsonpkurssitiedot=this.webpackJsonpkurssitiedot||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),o=t.n(u),c=t(4),l=t(2),i=t(3),m=t.n(i),s="/api/persons",d=function(){return m.a.get(s).then((function(e){return e.data}))},f=d,b=function(e){return m.a.post(s,e).then((function(e){return d()}))},h=function(e,n){return m.a.put(s+"/"+n.id,e).then((function(e){return d()}))},p=function(e){return m.a.delete(s+"/"+e).then((function(e){return d()}))},v=function(e){var n=e.searchInput,t=e.setSearchInput;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:function(e){return t(e.target.value)}})))},E=function(e){var n=e.newName,t=e.setNewName,a=e.newNumber,u=e.setNewNumber,o=e.addPerson;return r.a.createElement("form",{onSubmit:o},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:function(e){return t(e.target.value)}})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:function(e){return u(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},w=function(e){var n=e.name,t=e.number,a=e.removePerson,u=e.id;return r.a.createElement("div",null,n," ",t,r.a.createElement("button",{onClick:function(e){return a(e,u,n)}},"delete"))},g=function(e){var n=e.filterNames,t=e.removePerson;return r.a.createElement("div",null,n.map((function(e){return r.a.createElement(w,{name:e.name,number:e.number,key:e.id,removePerson:t,id:e.id})})))},N=function(e){var n=e.message,t=e.style;return null===n?null:r.a.createElement("div",{style:t,className:"error"},n)},j=function(){var e=Object(a.useState)(""),n=Object(l.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)([]),i=Object(l.a)(o,2),m=i[0],s=i[1],d=Object(a.useState)(""),w=Object(l.a)(d,2),j=w[0],O=w[1],S=Object(a.useState)(""),k=Object(l.a)(S,2),y=k[0],C=k[1],P=Object(a.useState)(null),I=Object(l.a)(P,2),x=I[0],D=I[1],L=Object(a.useState)({color:"blue",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"}),B=Object(l.a)(L,2),J=B[0],z=B[1];Object(a.useEffect)((function(){f().then((function(e){s(e)}))}),[]);var A=function(e,n,t){D(e),z(Object(c.a)(Object(c.a)({},J),{},{color:n})),setTimeout((function(){D(null)}),1e3*t)},M=m.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})),R=function(e,n){window.confirm("".concat(e.name," is already added to phonebook, replace the old number with a new one?"))&&h(e,n).then((function(n){s(n),O(""),C(""),A("Updated ".concat(e.name,"'s phone number"),"green",2)})).catch((function(n){A("Information of ".concat(e.name," has already been removed from server"),"red",4)}))};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(N,{message:x,style:J}),r.a.createElement(v,{searchInput:t,setSearchInput:u}),r.a.createElement("h3",null,"add a new"),r.a.createElement(E,{newName:j,setNewName:O,newNumber:y,setNewNumber:C,addPerson:function(e){e.preventDefault();var n={name:j,number:y},t=m.find((function(e){return e.name.toLowerCase()===j.toLowerCase()}));t?R(n,t):b(n).then((function(e){s(e),O(""),C(""),A("Added ".concat(n.name),"green",2)}))}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(g,{filterNames:M,removePerson:function(e,n,t){e.preventDefault(),window.confirm("Delete ".concat(t,"?"))&&p(n).then((function(e){s(e),A("Deleted ".concat(t," from phonebook"),"green",2)}))}}))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.af42eb3a.chunk.js.map