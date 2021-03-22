
export const splitAnswer = (answer) => {
  var words=answer.split(" ", 5);

  var filteredItems = words.filter(function(item)
  {
      return item.length>1 & item.length<20;
  });

  return filteredItems;
};

export const equalTest = (answer,realanswer) => {
   // count = 0;
   realanswer=realanswer.replace(/آ/gi, "ا");
   answer=answer.replace(/آ/gi, "ا");
   if(answer.length>2)
   {
      if(answer.length<=realanswer.length)
      {
        if(realanswer.includes(answer))
          return true;
      }
   }
   else {
     let realAnswerWords= splitAnswer(realanswer);
     for (let i=0;i<realAnswerWords.length;i++)
     {
        if(realAnswerWords[i].length==2)
        {
          if(realAnswerWords[i]==answer)
            return true;
        }
          // console.log(realanswer);
     }
   }
  return false;
}

// const replaceChars = (answer) => {
//   answer.replace(/آ/gi, "ا");
//   answer.replace(/ث|ص/gi, "س");
//
// }

// export const findInAnswers = (answer, answers) => {
//   return answers.filter((item) => {
//     let itemWords = splitAnswer(item);
//     let answerWords= splitAnswer(answer);
//     for (let i=0;i<itemWords.length;i++)
//     {
//       if(answerWords.some((element)=>equalTest(element,itemWords[i])))
//         {
//           return true;
//           break;
//         }
//     }
//     return false;
//   });
// }

export const findInAnswers1 = (answer, answers) => {
  let scores=[];
  let count=0;
  let answerWords= splitAnswer(answer);
  answers.forEach((item)=>{
    count=0;
    if(answer===item)
      count=5;
    for (let i=0;i<answerWords.length;i++)
    {
      if(equalTest(answerWords[i],item))
        count+=1;
    }
    scores.push(count);
  });
  return scores;
}

export const findAnswer = (answer, answers1,answers2,answers3) => {
  let scores1=findInAnswers1(answer,answers1);
  let scores2=findInAnswers1(answer,answers2);
  let scores3=findInAnswers1(answer,answers3);
  let max = [Math.max(...scores1),Math.max(...scores2),Math.max(...scores3)];
  let maxScore=Math.max(...max);
  let score=0;
  let ans=answer;
  if(maxScore>0)
  {
    score = max.indexOf(maxScore)+1;
    if(score==1)
      ans = answers1[scores1.indexOf(max[0])];
    else if (score==2)
      ans = answers2[scores2.indexOf(max[1])];
    else
      ans = answers3[scores3.indexOf(max[2])];
  }
  return [ans,score];
}

export const findIndexInAnswers = (answer, answers) => {
  return answers.findIndex((item) => {
    let itemWords = splitAnswer(item[0]);
    let answerWords= splitAnswer(answer);
    for (let i=0;i<itemWords.length;i++)
    {
      if(answerWords.some((element)=>equalTest(element,itemWords[i])))
        {
          return true;
          break;
        }
    }
    return false;
  });
}

export const findIndexInAnswers1 = (answer, answers) => {
  return answers.findIndex((item) =>
    item[0].valueOf() ===answer.valueOf()
  );
}

export const answersCount = (answers, type) => {
  return answers.filter((item) =>
    item[1]==type
  ).length;
}

export const answersFilter = (useranswers, answers) => {
  let ans=useranswers.map((currentValue)=>currentValue[0]);
  return answers.filter((item) =>{
    return !ans.includes(item);
    // for (let i=0;i<useranswers.length;i++)
    // {
    //   if(item==useranswers[i][0])
    //     return false;
    // }
    // return true;
  });
}
