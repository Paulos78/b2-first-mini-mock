"use strict";
(function () {
 const $ = (id) => document.getElementById(id);
 const KEY = "b2-first-mock-oct2026-v2";
 const REPORT_ADDRESS = "6fb9c839342d08b12e0889243652a8f4";
 const REPORT_API = "https://formsubmit.co/ajax/" + REPORT_ADDRESS;
 const all = EXAM.sections.flatMap((s) => s.questions.map((q) => ({...q, type:s.type, section:s.title, max:s.type==="transform"||s.type==="reading-choice"||s.type==="gapped"?2:1})));
 const byId = Object.fromEntries(all.map(q=>[q.id,q]));
 let state = {name:"", email:"", consent:false, answers:{}, startedAt:0, endAt:0, finishedAt:0, emailState:"", emailError:""};
 let active = 0;
 let ticker = null;
 let shared = false;
 function esc(value) { return String(value==null?"":value).replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m])); }
 function norm(value) {return String(value==null?"":value).trim().toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g," ");}
 function saved() {try{return JSON.parse(localStorage.getItem(KEY)||"null");}catch(e){return null;}}
 function save() {if(shared)return;try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
 function mark(q,v) {
  if(v===undefined || v===null || !String(v).trim())return 0;
  if(q.type==="choice-cloze")return norm(v)===norm(q.answer)?1:0;
  if(q.type==="reading-choice")return String(v)===String(q.answer)?2:0;
  if(q.type==="gapped")return norm(v)===norm(q.answer)?2:0;
  if(q.type==="matching")return norm(v)===norm(q.answer)?1:0;
  if(q.answers)return q.answers.some(a=>norm(a)===norm(v))?q.max:0;
  return 0;
 }
 function expected(q) {
  if(q.type==="reading-choice") return "("+String.fromCharCode(65+q.answer)+") "+q.options[q.answer];
  if(q.type==="choice-cloze") return q.answer;
  return q.answers?q.answers[0]:q.answer;
 }
 function scoreReport() {
  const sections=EXAM.sections.map(s=>{const ids=s.questions.map(q=>q.id);return{title:s.title,got:ids.reduce((n,id)=>n+mark(byId[id],state.answers[id]),0),max:ids.reduce((n,id)=>n+byId[id].max,0)};});
  const got=sections.reduce((n,s)=>n+s.got,0);
  return {got,total:50,sections,answered:all.filter(q=>hasAnswer(q.id)).length};
 }
 function hasAnswer(id) {return state.answers[id]!==undefined && String(state.answers[id]).trim()!=="";}
 function toggle(view) {["landing","exam","results"].forEach(id=>$(id).hidden=(id!==view));}
 function start() {
  const name=$("studentName").value.trim().slice(0,50);
  const email=$("studentEmail").value.trim().slice(0,180);
  if(!$("studentEmail").checkValidity()||!email){$("studentEmail").reportValidity();return;}
  if(!$("reportConsent").checked){alert("Please agree to sending your result and answers to the teacher before starting.");return;}
  state={name,email,consent:true,answers:{},startedAt:Date.now(),endAt:Date.now()+EXAM.durationMinutes*60000,finishedAt:0,emailState:"",emailError:""};
  shared=false;history.replaceState(null,"",location.pathname+location.search);
  active=0;save();openExam();
 }
 function openExam() {
  if(!state.startedAt)return;
  if(state.finishedAt){openResults();return;}
  if(Date.now()>=state.endAt){finish(true);return;}
  toggle("exam");
  $("welcomeName").textContent=state.name?"Good luck, "+state.name+".":"You can navigate freely between the seven parts.";
  renderSection();updateTimer();
  if(ticker)clearInterval(ticker);
  ticker=setInterval(updateTimer,1000);
 }
 function updateTimer() {
  if(!state.startedAt||state.finishedAt)return;
  const remaining=Math.max(0,state.endAt-Date.now());
  const seconds=Math.ceil(remaining/1000);
  $("timer").textContent=String(Math.floor(seconds/60)).padStart(2,"0")+":"+String(seconds%60).padStart(2,"0");
  document.querySelector(".timer-panel").classList.toggle("danger",seconds<=300);
  if(remaining<=0)finish(true);
 }
 function chips(text) {return esc(text).replace(/\{\{(\d+)\}\}/g,(_match,num)=>'<span class="gap-chip">Gap '+num+'</span>');}
 function passage(s) {
  if(s.type==="transform")return "";
  let body="";
  if(s.type==="gapped"){
   body='<h3>'+esc(s.heading)+'</h3><div class="passage-text">';
   s.questions.forEach((q,i)=>{body+='<p>'+esc(s.chunks[i*2])+' <span class="gap-chip">Gap '+q.id+'</span> '+esc(s.chunks[i*2+1])+'</p>';});
   body+='</div><div class="mini-candidates"><strong>Missing sentences</strong>'+s.candidates.map(c=>'<div class="candidate"><strong>'+c.letter+'</strong>'+esc(c.text)+'</div>').join("")+'</div>';
  }else if(s.type==="matching"){
   body='<h3>'+esc(s.heading)+'</h3><div class="profiles">'+s.profiles.map(p=>'<div class="profile"><div class="profile-title">'+esc(p.letter+" · "+p.name)+'</div><p>'+esc(p.text)+'</p></div>').join("")+'</div>';
  }else if(s.type==="reading-choice"){
   body='<h3>'+esc(s.heading)+'</h3><div class="passage-text">'+s.paragraphs.map(p=>'<p>'+esc(p)+'</p>').join("")+'</div>';
  }else{
   body='<h3>'+esc(s.heading)+'</h3><div class="passage-text"><p>'+chips(s.text)+'</p></div>';
  }
  return '<article class="passage-panel">'+body+'</article>';
 }
 function radio(q,options,answerValue) {
  const current=state.answers[q.id]===undefined?"":String(state.answers[q.id]);
  return '<div class="choices">'+options.map((opt,i)=>{
    const value=String(answerValue(opt,i)),selected=value===current;
    return '<label class="choice"><input type="radio" name="q'+q.id+'" data-q="'+q.id+'" value="'+esc(value)+'" '+(selected?"checked":"")+'><span class="choice-letter">'+String.fromCharCode(65+i)+'.</span><span>'+esc(opt)+'</span></label>';
  }).join("")+'</div>';
 }
 function input(q,placeholder) {return '<input class="answer-input" data-q="'+q.id+'" type="text" spellcheck="false" autocomplete="off" maxlength="90" value="'+esc(state.answers[q.id]||"")+'" placeholder="'+esc(placeholder||"Type your answer")+'" aria-label="Answer for question '+q.id+'">';}
 function question(q,s) {
  let control="",prompt="";
  if(s.type==="choice-cloze"){prompt="Choose the best fit for gap "+q.id+".";control=radio(q,q.options,opt=>opt);}
  else if(s.type==="input-cloze"){prompt="Complete gap "+q.id+" with one word.";control=input(q,"One word only");}
  else if(s.type==="word-formation"){prompt="Form the correct word.";control=input(q,"Enter the new word");}
  else if(s.type==="transform"){
   prompt='<div class="transform-original">'+esc(q.original)+'</div><div class="keyword">'+esc(q.keyword)+'</div>';
   control='<div class="transform-line"><span>'+esc(q.before)+'</span>'+input(q,"2–5 words")+'<span>'+esc(q.after)+'</span></div>';
  }else if(s.type==="reading-choice"){prompt=esc(q.stem);control=radio(q,q.options,(_opt,i)=>i);}
  else if(s.type==="gapped"){
   prompt="Which missing sentence fits gap "+q.id+"?";
   const cur=state.answers[q.id]||"";
   control='<select class="gap-select" data-q="'+q.id+'" aria-label="Choose sentence for gap '+q.id+'"><option value="">Select sentence A–E</option>'+s.candidates.map(c=>'<option value="'+c.letter+'" '+(cur===c.letter?"selected":"")+'>'+c.letter+' — '+esc(c.text)+'</option>').join("")+'</select>';
  }else if(s.type==="matching"){prompt=esc(q.stem);control=radio(q,["Person A","Person B","Person C","Person D"],(o,i)=>String.fromCharCode(65+i));}
  return '<div class="question-card" id="question-'+q.id+'"><div class="question-head"><span class="q-number">'+q.id+'</span><span class="q-label">'+q.max+' mark'+(q.max===1?"":"s")+'</span>'+(q.seed?'<span class="seed">'+esc(q.seed)+'</span>':"")+'</div><div class="question-prompt">'+prompt+'</div>'+control+'</div>';
 }
 function updateProgress() {
  const answered=all.filter(q=>hasAnswer(q.id)).length;
  $("progressLabel").textContent=answered+" of "+all.length+" questions answered";
  $("progressFill").style.width=Math.round(answered/all.length*100)+"%";
  $("sectionCount").textContent="Section "+(active+1)+" of 7";
  document.querySelectorAll(".section-tab").forEach((el,i)=>{
   const s=EXAM.sections[i],done=s.questions.filter(q=>hasAnswer(q.id)).length;
   el.classList.toggle("completed",done===s.questions.length);
   el.classList.toggle("active",i===active);
   el.setAttribute("aria-current",i===active?"step":"false");
   const counter=el.querySelector(".tab-count"); if(counter)counter.textContent=done+"/"+s.questions.length+" answered";
  });
 }
 function renderSection() {
  const s=EXAM.sections[active];
  $("sectionTitle").textContent=s.title;
  $("sectionNumber").textContent="PART "+(active+1)+" / 7";
  $("sectionInstructions").textContent=s.instructions;
  $("sectionTime").textContent="Suggested: "+s.minutes+" min";
  $("sectionNav").innerHTML=EXAM.sections.map((section,i)=>'<button type="button" class="section-tab '+(i===active?"active":"")+'" data-section="'+i+'"><span class="part">PART '+(i+1)+'</span><span class="tab-name">'+esc(section.title)+'</span><span class="tab-count"></span></button>').join("");
  const single=s.type==="transform";
  $("examContent").className="task-grid"+(single?" single-layout":"");
  $("examContent").innerHTML=passage(s)+'<div class="question-list">'+s.questions.map(q=>question(q,s)).join("")+'</div>';
  $("backBtn").disabled=active===0;
  $("nextBtn").textContent=active===EXAM.sections.length-1?"Review & finish":"Next section →";
  updateProgress();
 }
 function navigate(index) {
  active=Math.max(0,Math.min(EXAM.sections.length-1,index));renderSection();
  window.scrollTo({top:0,behavior:"smooth"});
 }
 function finish(auto) {
  if(state.finishedAt)return;
  const unanswered=all.length-all.filter(q=>hasAnswer(q.id)).length;
  if(!auto&&unanswered>0&&!window.confirm("You still have "+unanswered+" unanswered question"+(unanswered===1?"":"s")+". Finish and mark now?"))return;
  state.finishedAt=Date.now();save();if(ticker)clearInterval(ticker);openResults();
  if(state.email&&state.consent)sendReport();
 }
 function fullAnswerText() {
   const lines=[];
   EXAM.sections.forEach((s,i)=>{
     lines.push("PART "+(i+1)+" — "+s.title);
     s.questions.forEach(q=>{
       const raw=state.answers[q.id];
       const student=hasAnswer(q.id)?(q.type==="reading-choice"?String.fromCharCode(65+Number(raw))+" - "+q.options[Number(raw)]:String(raw)):"(blank)";
       const correct=expected(q);
       const prompt=q.original||q.stem||"Gap "+q.id;
       lines.push("Q"+q.id+": "+prompt);
       lines.push("Student: "+student+" | Correct: "+correct+" | Marks: "+mark(q,raw)+"/"+q.max);
       lines.push("Explanation: "+q.why);
       lines.push("");
     });
   });
   return lines.join("\n");
 }
 function emailStatusView() {
   const hasConsent=!!(state.email&&state.consent);
   $("emailDestination").textContent=hasConsent?"Student email: "+state.email+" · Report destination: teacher's inbox.":"This attempt was not registered for automatic email.";
   const button=$("retryEmailBtn"),status=$("emailStatus");
   button.hidden=!hasConsent||state.emailState==="sending"||state.emailState==="submitted";
   button.disabled=state.emailState==="sending";
   const messages={
     "":"Email delivery has not been attempted.",
     sending:"Submitting the complete answer report to the email service...",
     submitted:"Report accepted by the email service. Delivery may require a one-time email activation by the teacher; please also keep the shareable results link.",
     failed:"Could not submit the email report. Your results are still saved here. Try again or copy the report manually."
   };
   status.textContent=(messages[state.emailState]||messages[""])+(state.emailError?" "+state.emailError:"");
 }
 async function sendReport() {
   if(shared||!state.consent||!state.email||!state.finishedAt||state.emailState==="sending"||state.emailState==="submitted")return;
   state.emailState="sending";state.emailError="";save();emailStatusView();
   const rep=scoreReport();
   const body={
     _subject:"B2 English mock result - "+(state.name||"Student")+" - "+rep.got+"/50",
     _replyto:state.email,
     _captcha:"false",
     _template:"table",
     Student_Name:state.name||"(not provided)",
     Student_Email:state.email,
     Score:rep.got+" / 50 ("+Math.round(rep.got/50*100)+"%)",
     Answered:rep.answered+" / 37",
     Finished_At:new Date(state.finishedAt).toISOString(),
     Section_Breakdown:rep.sections.map((s,i)=>(i+1)+". "+s.title+": "+s.got+"/"+s.max).join(" | "),
     Complete_Answer_Review:fullAnswerText()
   };
   try{
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),20000);
      let response;
      try{
        response=await fetch(REPORT_API,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(body),signal:controller.signal});
      }finally{clearTimeout(timeout);}
      const data=await response.json();
      if(!response.ok||!(data.success===true||data.success==="true")){
        throw new Error(String(data.message||"The email service rejected this submission.").slice(0,220));
      }
      state.emailState="submitted";
      state.emailError=/activat|confirm/i.test(String(data.message||""))?" Check the teacher's inbox for a one-time activation email.":"";
   }catch(e){
      state.emailState="failed";
      state.emailError=String(e.message||"Network error.").slice(0,230);
   }
   save();emailStatusView();
 }
 function summaryText() {
  const rep=scoreReport();
  let lines=["B2 First-style 50-minute Practice Mock","Student: "+(state.name||"Not supplied"),"Student email: "+(state.email||"Not provided"),"Score: "+rep.got+" / 50 ("+Math.round(rep.got/50*100)+"%)","Answered: "+rep.answered+" / 37","","Section breakdown:"];
  rep.sections.forEach((s,i)=>lines.push((i+1)+". "+s.title+": "+s.got+"/"+s.max));
  lines.push("","COMPLETE ANSWER RECORD",fullAnswerText(),"Questions to review:");
  const incorrect=all.filter(q=>mark(q,state.answers[q.id])<q.max);
  if(!incorrect.length)lines.push("None — all answers correct.");
  else incorrect.forEach(q=>lines.push("Q"+q.id+" — wrote: "+(state.answers[q.id]||"blank")+" | expected: "+expected(q)));
  lines.push("","Original independent practice; not an official Cambridge grade.");
  return lines.join("\n");
 }
 function linkEncode(data) {
  const binary=Array.from(new TextEncoder().encode(JSON.stringify(data)), b=>String.fromCharCode(b)).join("");
  return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
 }
 function linkDecode(s) {
  const b64=s.replace(/-/g,"+").replace(/_/g,"/");
  const binary=atob(b64);
  const bytes=Uint8Array.from(binary, x=>x.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
 }
 function resultLink() {
  const data={name:state.name,answers:state.answers,finishedAt:state.finishedAt};
  return location.origin+location.pathname+"#result="+linkEncode(data);
 }
 async function copyText(value,notice) {
  try {await navigator.clipboard.writeText(value);$("copyStatus").textContent=notice;}
  catch(e){const temp=document.createElement("textarea");temp.value=value;document.body.appendChild(temp);temp.select();try{document.execCommand("copy");$("copyStatus").textContent=notice;}catch(_){$("copyStatus").textContent="Please copy the text manually.";window.prompt("Copy this:",value);}temp.remove();}
 }
 function openResults() {
  toggle("results");
  const rep=scoreReport(),pct=Math.round(rep.got/50*100);
  $("resultsTitle").textContent=(state.name?state.name+"'s":"Your")+" practice results";
  $("scoreValue").textContent=rep.got;
  const band=pct>=85?["Strong performance","Excellent control of most of the grammar, vocabulary and reading skills tested."]:pct>=70?["Promising B2 practice","A strong foundation. Review the mistakes below and pay particular attention to the lower-scoring task types."]:pct>=55?["Developing B2 skills","You have some solid skills, but more targeted practice would help before attempting the full paper."]:["Keep building","Use the answer explanations as a study plan, then try again after reviewing the areas that caused difficulty."];
  $("resultBand").textContent=pct+"% · "+band[0];
  $("resultHeadline").textContent=band[0];
  $("resultMessage").textContent=band[1];
  $("sectionScores").innerHTML=rep.sections.map((s,i)=>'<div class="section-score"><span class="small">PART '+(i+1)+'</span><strong>'+s.got+' / '+s.max+'</strong><p>'+esc(s.title)+'</p></div>').join("");
  $("reviewSections").innerHTML=EXAM.sections.map((s,i)=>{
   const r=rep.sections[i];
   return '<details class="review-section" '+(i===0?"open":"")+'><summary>Part '+(i+1)+' · '+esc(s.title)+' <span>'+r.got+' / '+r.max+' marks +</span></summary><div class="review-content">'+s.questions.map(q=>{
    const ans=state.answers[q.id],got=mark(q,ans),good=got===q.max;
    return '<div class="review-item"><div class="review-q">Question '+q.id+' · '+got+'/'+q.max+' mark'+(q.max===1?"":"s")+'</div><p class="'+(good?"answer-right":"answer-wrong")+'">Your answer: '+esc(hasAnswer(q.id)?(q.type==="reading-choice"?String.fromCharCode(65+Number(ans))+" · "+q.options[Number(ans)]:ans):"Not answered")+'</p>'+(!good?'<p class="answer-right">Correct: '+esc(expected(q))+'</p>':"")+'<p class="explain">'+esc(q.why)+'</p></div>';
   }).join("")+'</div></details>';
  }).join("");
  $("copyLinkBtn").disabled=false;
  emailStatusView();
  $("copyStatus").textContent=shared?"You're viewing a shared report.":"";
  window.scrollTo(0,0);
 }
 function resume() {const previous=saved();if(previous&&previous.startedAt){state=previous;shared=false;openExam();}}
 function restart() {
  if(!window.confirm("Start a fresh attempt? Your current answers and report on this device will be replaced."))return;
  try{localStorage.removeItem(KEY);}catch(e){}
  state={name:"",email:"",consent:false,answers:{},startedAt:0,endAt:0,finishedAt:0,emailState:"",emailError:""};
  if(ticker)clearInterval(ticker);
  shared=false;
  history.replaceState(null,"",location.pathname+location.search);
  $("studentName").value="";$("studentEmail").value="";$("reportConsent").checked=false;$("resumeBtn").hidden=true;toggle("landing");window.scrollTo(0,0);
 }
 $("startBtn").addEventListener("click",start);
 $("retryEmailBtn").addEventListener("click",sendReport);
 $("resumeBtn").addEventListener("click",resume);
 $("studentName").addEventListener("keydown",e=>{if(e.key==="Enter")start();});
 $("sectionNav").addEventListener("click",e=>{const b=e.target.closest("[data-section]");if(b)navigate(Number(b.dataset.section));});
 $("examContent").addEventListener("input",e=>{const q=e.target.dataset.q;if(q&&e.target.type==="text"){state.answers[q]=e.target.value;save();updateProgress();}});
 $("examContent").addEventListener("change",e=>{
  const q=e.target.dataset.q;if(!q)return;
  state.answers[q]=e.target.value;save();
  if(e.target.type==="radio")renderSection();else updateProgress();
 });
 $("backBtn").addEventListener("click",()=>navigate(active-1));
 $("nextBtn").addEventListener("click",()=>{if(active===6)finish(false);else navigate(active+1);});
 $("finishBtn").addEventListener("click",()=>finish(false));
 $("copyLinkBtn").addEventListener("click",()=>copyText(resultLink(),"Result link copied. Send it to your teacher."));
 $("copyReportBtn").addEventListener("click",()=>copyText(summaryText(),"Text report copied. Paste it into a message to your teacher."));
 $("printBtn").addEventListener("click",()=>{document.querySelectorAll(".review-section").forEach(x=>x.open=true);window.print();});
 $("restartBtn").addEventListener("click",restart);
 try {
  if(location.hash.startsWith("#result=")){
   const report=linkDecode(decodeURIComponent(location.hash.slice(8)));
   if(report && typeof report.answers==="object" && report.answers && report.finishedAt){
    state={name:String(report.name||"").slice(0,50),answers:report.answers,startedAt:0,endAt:0,finishedAt:report.finishedAt,email:"",consent:false,emailState:"",emailError:""};
    shared=true;openResults();return;
   }
  }
 }catch(e){}
 const previous=saved();
 if(previous&&previous.startedAt){
  $("studentName").value=previous.name||"";
  $("studentEmail").value=previous.email||"";
  $("reportConsent").checked=!!previous.consent;
  $("resumeBtn").hidden=false;
  $("resumeBtn").textContent=previous.finishedAt?"View previous results":"Resume saved exam";
 }
})();
