const EXAM = {
 title: "B2 First · 50-minute practice mock",
 durationMinutes: 50,
 sections: [
  {
   title: "Multiple-choice cloze", type: "choice-cloze", minutes: 5, marks: 6,
   instructions: "Read the text and choose the word or phrase that best fits each gap.",
   heading: "A garden above the city",
   text: "When residents of a busy apartment building suggested turning their unused roof into a garden, the proposal was initially met with considerable {{1}}. Some neighbours worried about the cost, while others doubted that plants could survive so high above the street. However, as volunteers began to explain their plans, the idea slowly {{2}} momentum. Eventually, the residents came to an {{3}}: everyone could use the garden, provided they helped to maintain it. Newcomers were {{4}} responsibility for a small task, from watering seedlings to collecting rainwater. Within a year, the rooftop had become a {{5}} of pride for the entire building. Its greatest achievement, though, was not the vegetables it produced but the friendships that had developed. The long-term {{6}} of the project now depends on keeping that sense of shared ownership alive.",
   questions: [
    {id:1, options:["doubt","scepticism","suspicion","confusion"], answer:"scepticism", why:"A proposal can be ‘met with scepticism’: people doubt that it will work."},
    {id:2, options:["won","earned","gained","made"], answer:"gained", why:"‘Gain momentum’ is the established collocation for growing support or progress."},
    {id:3, options:["arrangement","agreement","appointment","acceptance"], answer:"agreement", why:"‘Come to an agreement’ means reach a shared decision."},
    {id:4, options:["presented","awarded","offered","given"], answer:"given", why:"We say ‘be given responsibility for’ a task."},
    {id:5, options:["source","cause","reason","origin"], answer:"source", why:"‘A source of pride’ is the natural fixed expression."},
    {id:6, options:["achievement","success","victory","progress"], answer:"success", why:"‘The long-term success of the project’ refers to whether it continues to work well."}
   ]
  },
  {
   title:"Open cloze", type:"input-cloze", minutes:5, marks:6,
   instructions:"Write ONE word in each gap. Do not use contractions.",
   heading:"The forgotten art of repair",
   text:"For generations, people repaired everyday objects rather {{7}} replacing them. Today, however, it is often easier to buy something new. Repair cafés are trying to change this habit. Visitors can bring broken household items and learn how to mend them with the help of volunteers. The aim is not only to save money {{8}} also to reduce waste. What used {{9}} be an ordinary skill is becoming popular again. Many visitors arrive without {{10}} idea of how to use a screwdriver, yet leave feeling surprisingly confident. Repairs are rarely as difficult {{11}} people imagine. Even when an object cannot be fixed, visitors learn something useful, whether {{12}} not they succeed.",
   questions:[
    {id:7, answers:["than"], why:"‘Rather than’ expresses a preference or alternative."},
    {id:8, answers:["but"], why:"The correlative phrase is ‘not only … but also’."},
    {id:9, answers:["to"], why:"‘Used to be’ describes a past state."},
    {id:10, answers:["any","an"], why:"‘Without any idea’ and ‘without an idea’ are both grammatically possible here."},
    {id:11, answers:["as"], why:"The comparative structure is ‘as … as’."},
    {id:12, answers:["or"], why:"The fixed expression is ‘whether or not’."}
   ]
  },
  {
   title:"Word formation", type:"word-formation", minutes:5, marks:6,
   instructions:"Use the word in CAPITALS to form a word that fits the gap.",
   heading:"A library with a difference",
   text:"In a small coastal town, the local library has introduced a series of {{13}} organised workshops. Residents can learn everything from photography to furniture design. The programme encourages {{14}}, especially among people who have not tried anything artistic since school. Organisers believe that developing practical skills can be highly {{15}} for mental well-being. As participants become more experienced, their {{16}} grows. The library is also trying to make its activities more {{17}} by reusing materials wherever possible. Perhaps the most surprising outcome is that learners are becoming increasingly {{18}}: rather than waiting for instructions, they now start projects of their own.",
   questions:[
    {id:13, seed:"LOCAL", answers:["locally"], why:"An adverb is needed to modify ‘organised’: locally organised."},
    {id:14, seed:"CREATE", answers:["creativity"], why:"The verb ‘encourages’ requires the noun ‘creativity’."},
    {id:15, seed:"BENEFIT", answers:["beneficial"], why:"After ‘highly’, the adjective ‘beneficial’ is required."},
    {id:16, seed:"CONFIDENT", answers:["confidence"], why:"The possessive ‘their’ is followed by the noun ‘confidence’."},
    {id:17, seed:"SUSTAIN", answers:["sustainable"], why:"The adjective ‘sustainable’ means able to continue with less harm or waste."},
    {id:18, seed:"DEPEND", answers:["independent"], why:"They act without waiting for instructions, so the negative-prefix adjective ‘independent’ fits."}
   ]
  },
  {
   title:"Key word transformations", type:"transform", minutes:7, marks:8,
   instructions:"Complete the second sentence so it means the same as the first. Use the given word unchanged and between 2 and 5 words in total, including that word. Each item is worth 2 marks.",
   questions:[
    {id:19, original:"I last saw Daniel three years ago.", keyword:"FOR", before:"I", after:"three years.", answers:["haven't seen Daniel for","have not seen Daniel for"], why:"Present perfect negative + ‘for’ expresses a period continuing to the present: I haven't seen Daniel for three years."},
    {id:20, original:"It wasn't necessary for us to book in advance.", keyword:"HAVE", before:"We", after:"in advance.", answers:["didn't have to book","did not have to book"], why:"‘Didn't have to’ means there was no obligation. It doesn't mean booking was forbidden."},
    {id:21, original:"Although she was tired, Maya finished the project.", keyword:"SPITE", before:"Maya finished the project", after:"tired.", answers:["in spite of being"], why:"‘In spite of’ is followed by a noun or -ing form: in spite of being tired."},
    {id:22, original:"I'm sure Oliver didn't forget about the meeting.", keyword:"CAN'T", before:"Oliver", after:"about the meeting.", answers:["can't have forgotten","cannot have forgotten"], why:"‘Can't have + past participle’ expresses a strong belief that something did not happen."}
   ]
  },
  {
   title:"Reading · multiple choice", type:"reading-choice", minutes:10, marks:10,
   instructions:"Read the article and choose the best answer (A, B, C or D) for each question. Each item is worth 2 marks.",
   heading:"The slow journey",
   paragraphs:[
    "When my editor asked me to travel overnight by train from London to the Scottish Highlands, I agreed rather reluctantly. I had grown used to choosing the quickest route between two places and viewed the journey itself as an obstacle to overcome. A flight would have taken far less time, or so I kept telling anyone who would listen. The idea of sleeping in a narrow cabin while the landscape passed unseen beyond the window hardly sounded like an adventure.",
    "The first surprise came before the train had even left the station. People were chatting in the corridor and helping one another find their compartments. A couple across from me had brought a small picnic, which they offered to share. Instead of the hurried atmosphere I associate with airports, there was an unusual sense that nobody needed to be somewhere else immediately. I found myself putting my phone away without consciously deciding to.",
    "As the train moved north, I sat in the lounge carriage speaking to a wildlife photographer named Elise. She made the journey regularly, not because she disliked flying but because of what the train gave her. ‘It isn't simply a slower way of getting there,’ she said. ‘It changes how you use the hours.’ I understood her point when I realised that I had spent nearly an hour watching the evening light move across fields, something I would normally have considered a waste of valuable time.",
    "Not everything went smoothly. Around midnight we stopped for longer than expected. A member of staff explained that maintenance work further along the line was causing delays. He gave us updates even when there was little new information. The delay was frustrating, but I appreciated being treated as a person who deserved an explanation rather than as a problem to be managed. Some passengers went to bed; others stayed up playing cards.",
    "By dawn, the train was threading its way between hills, rivers and stretches of woodland. I had expected the views to be the highlight, and they were remarkable. Yet what stayed with me most was the shift in my attention. Without the constant pressure to reach a destination, I had noticed people and details I would otherwise have missed. The journey had become part of the experience, not merely the price of getting to it.",
    "I would be dishonest to suggest that night trains are the answer to every travel problem. They can be expensive, routes are limited, and a long journey simply will not suit every timetable. Nevertheless, when the option exists and time allows, I now think it deserves serious consideration. Choosing the fastest route might save hours, but speed is not always the same as making the best use of them."
   ],
   questions:[
    {id:23, stem:"Why was the writer initially unenthusiastic about the journey?",options:["She expected it to be an inefficient way to travel.","She had previously had a bad experience on a train.","She did not want to visit the Highlands.","She was worried she would have to work throughout the night."], answer:0, why:"She says she usually chooses the quickest route and regarded travel time as an obstacle."},
    {id:24, stem:"What surprised the writer before departure?",options:["The quality of the accommodation.","The friendly, unhurried atmosphere.","The number of people travelling alone.","The amount of luggage passengers had brought."], answer:1, why:"She describes sharing food, chatting and a contrast with the rush of airports."},
    {id:25, stem:"What did Elise mean by saying the train ‘changes how you use the hours’?",options:["It provides better conditions for professional work.","It helps travellers sleep more deeply.","It encourages people to experience the journey differently.","It makes every trip feel shorter than it really is."], answer:2, why:"The writer subsequently notices scenery and appreciates time she once dismissed as wasted."},
    {id:26, stem:"How did the writer react to the delay?",options:["She was impressed that it was fixed immediately.","She blamed the other passengers for making it worse.","She felt the staff should have avoided providing updates.","She valued the staff member's honest communication."], answer:3, why:"Although frustrated, she appreciated the explanations and updates."},
    {id:27, stem:"Which statement best summarises the writer's final view?",options:["Night trains should replace short flights completely.","The quickest journey is usually the cheapest.","Slow travel is worthwhile in some circumstances, though not always practical.","Train delays help passengers form friendships."], answer:2, why:"The conclusion is qualified: night trains have disadvantages, but speed is not the only consideration."}
   ]
  },
  {
   title:"Reading · gapped text", type:"gapped", minutes:8, marks:8,
   instructions:"Four sentences have been removed from the article. Choose from A–E the sentence that best fits each gap. There is ONE extra sentence. Each correct answer is worth 2 marks.",
   heading:"Starting music later in life",
   chunks:[
    "When I joined a community orchestra at the age of forty-two, I was certain everyone would notice how inexperienced I was. At the first rehearsal I arrived early, hoping to hide at the back, but several people immediately introduced themselves. ",
    " Their welcome did not make the difficult notes disappear, but it made me willing to return the following week.",
    "At home, I initially tried to practise until I could play each piece perfectly. The result was usually frustration. My teacher encouraged me to work on short passages for fifteen minutes a day and record myself once a week, rather than repeat the entire piece for hours. ",
    " Looking back at recordings from a month earlier made small improvements much easier to recognise.",
    "Playing with others brought a different challenge. If I concentrated entirely on my own part, I often lost track of the music as a whole. ",
    " Once I stopped treating the orchestra as a collection of separate performers, it became easier to follow the conductor and recover from mistakes.",
    "Our first public concert was held in a small village hall. We played for less than half an hour, and my own contribution was modest. ",
    " For me, simply standing on the stage without wanting to escape was an achievement worth celebrating."
   ],
   candidates:[
    {letter:"A", text:"That was when I realised that being a beginner could eventually become a source of pleasure."},
    {letter:"B", text:"To my surprise, the other musicians seemed more interested in encouraging me than in noticing my mistakes."},
    {letter:"C", text:"As a result, I began measuring success in weeks rather than individual rehearsals."},
    {letter:"D", text:"Listening carefully to the players around me became just as important as reading the notes in front of me."},
    {letter:"E", text:"The audience, however, could not have known how much effort had gone into those few minutes."}
   ],
   questions:[
    {id:28, answer:"B", why:"‘To my surprise’ contrasts the writer's expectation with the friendliness of the other musicians; ‘Their welcome’ follows."},
    {id:29, answer:"C", why:"‘As a result’ refers to the new practice method, and the next sentence discusses recognising improvement over a month."},
    {id:30, answer:"D", why:"Listening to others directly resolves the problem of focusing only on the writer's own part."},
    {id:31, answer:"E", why:"‘Those few minutes’ points back to the short concert, and contrasts the audience's view with the effort behind the performance."}
   ]
  },
  {
   title:"Reading · multiple matching", type:"matching", minutes:7, marks:6,
   instructions:"Read four accounts of learning a new skill. Match each statement to person A, B, C or D. You may use each letter more than once.",
   heading:"A new skill, a new perspective",
   profiles:[
    {letter:"A", name:"Noah · woodwork", text:"I took up woodwork because I imagined making tables to sell online. After a few months I realised that running a small business would turn my new hobby into another source of pressure. Now I restore old furniture for friends and enjoy the work much more. My first attempt at making a chair was rather disastrous, but examining exactly where it went wrong taught me more than following a perfect demonstration. These days, I deliberately choose projects slightly beyond my ability because there is more to learn from them."},
    {letter:"B", name:"Aisha · photography", text:"I joined a weekend photography club mainly because I wanted to understand my camera. The technical workshops were useful, but the conversations were even better. One member was a retired engineer, another was studying fashion, and several had recently moved to the city. Each noticed things I had overlooked. We visited the same streets and returned with completely different photographs. I began to understand that a good picture depends not just on equipment but on the perspective of the person holding it."},
    {letter:"C", name:"Leah · French", text:"When I mentioned enrolling in a French course, my relatives told me that languages were for schoolchildren and that I had left it too late. Fortunately, I ignored them. My main challenge wasn't my age but my shifts at the hospital. I often had to swap evening classes or review recordings on the bus home. It took persistence to maintain a routine, but last summer I managed a long conversation with a French patient. That moment made the effort worthwhile."},
    {letter:"D", name:"Marco · cycling", text:"Cycling had never particularly interested me until the bus company stopped running the early service I used for work. I couldn't afford taxis every day, so I borrowed a bike and asked a friend to help me practise riding in traffic safely. At first the uphill sections seemed impossible, but gradually I built up stamina. I still don't see myself as a sporty person, although I now take weekend rides simply because I enjoy them. Something that started as a practical solution has become a pleasant habit."}
   ],
   questions:[
    {id:32, stem:"Who changed their original aim after discovering what they really enjoyed?", answer:"A", why:"Noah originally wanted to sell furniture but switched to restoring it for enjoyment."},
    {id:33, stem:"Who says they learned from people with very different experiences?", answer:"B", why:"Aisha describes club members from different professional and personal backgrounds."},
    {id:34, stem:"Who began learning because of an unexpected everyday problem?", answer:"D", why:"Marco started cycling after an early bus service was cancelled."},
    {id:35, stem:"Who realised mistakes could be especially instructive?", answer:"A", why:"Noah says analysing the failed chair was more educational than a perfect demonstration."},
    {id:36, stem:"Who had to fit lessons around an unpredictable work schedule?", answer:"C", why:"Leah's hospital shifts required changing classes or studying on the bus."},
    {id:37, stem:"Who had been discouraged by relatives before starting?", answer:"C", why:"Leah's relatives said she was too old to learn languages."}
   ]
  }
 ]
};
