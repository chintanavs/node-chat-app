var generateMessage=(from,text)=>{
  return{
    text,
    from,
    createdAt:new Date().getTime()
  };
};

var generateLocationMessage=(from,latitude,longitude)=>{
  return {
    from,
    createdAt:new Date().getTime(),
    url:`https://www.google.com/maps?q=${latitude},${longitude}`
  };
};

module.exports={generateMessage,generateLocationMessage};
