const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    var fname=req.body.fname;
    var lname=req.body.lname;
      var email=req.body.email;
      var data={
        members:[
          {
            email_address:email,
            status:"subscribed",
            merge_fields:{
              FNAME:fname,
              LNAME:lname
            }
          }
        ]
      };
    const jsondata=JSON.stringify(data);
    const url="https://us13.api.mailchimp.com/3.0/lists/c58a481ce9";
    const options={
      method:"POST",
      auth:"sowmya:010320e28b97507519ed09ff2d0d3b671-us13"
    }
  const request=  https.request(url,options,function(response){
      if(response.statusCode===200)
      {
        res.sendFile(__dirname+"/success.html");
      }
      else{
          res.sendFile(__dirname+"/failure.html");
      }
       response.on("data",function(data){
         console.log(JSON.parse(data));
       })
    })
    request.write(jsondata);
    request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT||3000,function(){
  console.log("server is running at port 3000");
})


//api   10320e28b97507519ed09ff2d0d3b671-us13
//audience id= c58a481ce9
