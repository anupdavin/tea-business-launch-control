const KEY="tea-launch-control-v1";
const tasks=[
["T01","Confirm target location, outlet format & operating hours","Founder","Day 1","Market decision","Launch gate","Critical"],
["T02","Validate footfall at 3 time windows for 3 days","Founder","Day 1-3","T01","Evidence","Critical"],
["T03","Map 10 direct competitors and prices","Founder","Day 2","T01","Research","High"],
["T04","Finalize menu: core tea, premium tea, cold/seasonal, snacks","Founder","Day 3","T02,T03","Product","Critical"],
["T05","Recipe trials + standard recipes + gram/ml specs","Ops","Day 3-5","T04","Product","Critical"],
["T06","Cost every SKU including cup, milk, sugar, gas, wastage","Finance","Day 4-6","T05","Unit economics","Critical"],
["T07","Set target gross margin and maximum COGS","Finance","Day 6","T06","Go/No-Go","Critical"],
["T08","Finalize brand, name, logo and basic signage","Founder","Day 5-7","T04","Brand","High"],
["T09","Shortlist site and negotiate commercial terms","Founder","Day 1-7","T01,T02","Site","Critical"],
["T10","Verify licenses, food safety and local compliance","Founder","Day 5-8","T09","Compliance","Critical"],
["T11","Confirm equipment list and supplier quotes","Ops","Day 7-10","T04,T06","Procurement","High"],
["T12","Design counter, workflow, storage and customer flow","Ops","Day 8-11","T11","Operations","High"],
["T13","Build opening budget + 3-month cash runway","Finance","Day 8-10","T06,T09,T11","Finance","Critical"],
["T14","Set pricing using cost + market validation","Finance","Day 9-11","T06,T07,T03","Pricing","Critical"],
["T15","Select POS/payment/accounting workflow","Finance","Day 10-12","T13","Systems","High"],
["T16","Supplier shortlist: milk, tea, sugar, cups, snacks","Ops","Day 10-13","T06,T11","Supply","High"],
["T17","Run controlled tasting with target customers","Founder","Day 12-14","T05,T14","Validation","Critical"],
["T18","Finalize menu and recipes from tasting data","Ops","Day 14-15","T17","Product","Critical"],
["T19","Recruit/train initial staff","Ops","Day 14-20","T18","People","Critical"],
["T20","Create SOPs: opening, closing, hygiene, cash, stock","Ops","Day 16-21","T15,T19","SOP","Critical"],
["T21","Set inventory par levels and reorder points","Ops","Day 18-21","T16,T20","Inventory","High"],
["T22","Complete fit-out, equipment installation and utilities","Ops","Day 16-23","T10,T11,T12","Build","Critical"],
["T23","Create brand assets, menu board and Google/social presence","Marketing","Day 18-23","T08,T18","Marketing","High"],
["T24","Dry run: 50-100 orders without public launch","Founder","Day 23-25","T20,T21,T22","Dry run","Critical"],
["T25","Measure service time, waste, stock variance and errors","Finance","Day 24-26","T24","Metrics","Critical"],
["T26","Fix bottlenecks and repeat dry run","Ops","Day 26-27","T25","Dry run","Critical"],
["T27","Final compliance, safety and opening inspection","Founder","Day 27-28","T10,T22","Launch gate","Critical"],
["T28","Opening stock purchase and cash float","Finance","Day 28-29","T21,T26","Launch","Critical"],
["T29","Soft launch with limited hours/menu","Founder","Day 29","T27,T28","Launch","Critical"],
["T30","Go/No-Go review using actual unit economics + operations","Founder","Day 30","T29","Final gate","Critical"]
];
let state=JSON.parse(localStorage.getItem(KEY)||"null")||Object.fromEntries(tasks.map(t=>[t[0],{status:"Not Started",owner:t[2],cost:"",notes:"",go:"Pending"}]));
function save(){localStorage.setItem(KEY,JSON.stringify(state));render()}
function esc(x){return String(x??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function render(){const q=document.querySelector("#q")?.value.toLowerCase()||"",sf=document.querySelector("#sf")?.value||"All",so=document.querySelector("#so")?.value||"All";
let rows=tasks.filter(t=>(!q||t.join(" ").toLowerCase().includes(q))&&(sf==="All"||state[t[0]].status===sf)&&(so==="All"||t[2]===so));
let done=tasks.filter(t=>state[t[0]].status==="Done").length, prog=tasks.filter(t=>state[t[0]].status==="In Progress").length, block=tasks.filter(t=>state[t[0]].status==="Blocked").length, critical=tasks.filter(t=>t[6]==="Critical"&&state[t[0]].status!=="Done").length;
document.querySelector("#app").innerHTML='<div class="shell"><div class="top"><div class="title"><h1>Tea Business Launch Control</h1><p>30-day execution control room · local-first tracking</p></div><div class="actions"><button onclick="window.print()">Print</button><button class="secondary" onclick="resetAll()">Reset</button></div></div>'+
'<div class="cards"><div class="card"><span class="muted">Completion</span><b>'+Math.round(done/tasks.length*100)+'%</b><div class="progress"><i style="width:'+done/tasks.length*100+'%"></i></div></div><div class="card"><span class="muted">Done</span><b>'+done+'</b></div><div class="card"><span class="muted">In Progress</span><b>'+prog+'</b></div><div class="card"><span class="muted">Blocked</span><b>'+block+'</b></div><div class="card"><span class="muted">Critical Open</span><b>'+critical+'</b></div></div>'+
'<div class="panel"><div class="filters"><input id="q" placeholder="Search tasks..." value="'+esc(q)+'" oninput="render()"><select id="sf" onchange="render()"><option>All</option><option>Not Started</option><option>In Progress</option><option>Done</option><option>Blocked</option></select><select id="so" onchange="render()"><option>All</option><option>Founder</option><option>Ops</option><option>Finance</option><option>Marketing</option></select></div></div>'+
'<div class="panel tablewrap"><table class="table"><thead><tr><th>ID</th><th>Action</th><th>Owner</th><th>Deadline</th><th>Dependency</th><th>Status</th><th>Cost</th><th>Go/No-Go</th><th>Notes</th><th></th></tr></thead><tbody>'+
rows.map(t=>{let s=state[t[0]];return '<tr><td><b>'+t[0]+'</b><br><span class="muted">'+t[6]+'</span></td><td>'+esc(t[1])+'<br><span class="muted">'+esc(t[5])+'</span></td><td>'+esc(s.owner||t[2])+'</td><td>'+t[3]+'</td><td>'+t[4]+'</td><td><span class="status '+s.status+'">'+s.status+'</span></td><td>'+esc(s.cost||"-")+'</td><td class="'+(s.go==="Go"?"Go":s.go==="No-Go"?"No-Go":"")+'">'+s.go+'</td><td>'+esc(s.notes||"-")+'</td><td><button class="edit" onclick="editTask(\''+t[0]+'\')">Edit</button></td></tr>'}).join("")+
'</tbody></table></div><div class="footer">Changes are saved automatically in this browser. Use the same browser/device for persistent local tracking.</div></div>';
document.querySelector("#sf").value=sf;document.querySelector("#so").value=so}
function editTask(id){let s=state[id],t=tasks.find(x=>x[0]===id);let status=prompt("Status: Not Started / In Progress / Done / Blocked",s.status);if(status===null)return;if(!["Not Started","In Progress","Done","Blocked"].includes(status))return alert("Invalid status");let cost=prompt("Cost / budget (optional)",s.cost||"");let go=prompt("Go/No-Go: Pending / Go / No-Go",s.go||"Pending");if(go===null)go=s.go;let notes=prompt("Notes / decision evidence",s.notes||"");state[id]={...s,status,cost,go,notes};save()}
function resetAll(){if(confirm("Reset all task tracking?")){state=Object.fromEntries(tasks.map(t=>[t[0],{status:"Not Started",owner:t[2],cost:"",notes:"",go:"Pending"}]));save()}}
render();