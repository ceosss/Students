var express = require("express"),
        app = express(),
   mongoose = require("mongoose"),
   bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb+srv://sswarajsamant:bs1999rs@students-s3blg.mongodb.net/sudents", { useNewUrlParser: true });

var studSchema = new mongoose.Schema({
    name: String,
    roll : Number,
    age : Number,
    image : String    
});

var studentData = mongoose.model("studentData",studSchema);

// studentData.create({
//     name:"Aishwarya",
//     roll : 1706481,
//     age : 19
// },function(err,student){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("New Student added");
//         console.log(student);
//     }
// });

// var studentData = [  
//     {
//         name : "Swaraj",
//         roll : 1706469,
//         age  : 19
//     },
//     {
//         name : "Aishwarya",
//         roll : 1706481,
//         age  : 19
//     },
//     {
//         name : "Priya",
//         roll : 1706470,
//         age  : 19
//     }
// ];

//GET Requests

app.get("/", function(req, res) {
    
    studentData.find({},function(err,allStud){
        if(err){
            console.log(err);
        }
        else{
        res.render("index.ejs",{student:allStud});
        }
    });
    
});

app.get("/addStudent",function(req,res){
    res.render("addStudent.ejs");
});

app.get("/deleteStudent/:id/delete",function(req,res){
    var id=req.params.id;
    studentData.findByIdAndRemove(id,function(err,remStud){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    })
    });
    
    
app.get("/deleteStudent",function(req,res){
    studentData.find({},function(err,allStud){
        if(err){
            console.log(err);
        }
        else{
            res.render("deleteStudent.ejs",{student:allStud});
        }
    })
});

app.get("/updateStudent",function(req,res){
    studentData.find({},function(err,allStud){
        if(err){
            console.log(err);
        }
        else{
            res.render("updateStudent.ejs",{student:allStud});
        }
    })
    
});

app.get("/updateStudent/:id/update",function(req,res){
    var id=req.params.id;
    var name,age;
    studentData.findById(id,function(err,foundStud){
        if(err){
            console.log(err);
        }
        else{
            res.render("updateStudentData.ejs",{student:foundStud});
        }
    })
    // studentData.update({_student.id:id},{$set:{name:name}})
    // for(var i=0;i<studentData.length;i++){
    //     if(studentData[i].roll==roll){
    //         name=studentData[i].name;
    //         age=studentData[i].age;
    //     }
    
    
});

//POST Requests

app.post("/addStudent",function(req,res){
    var name = req.body.name,
        roll = req.body.roll,
        age  = req.body.age,
        image = req.body.image;
        // studentData.push({name : name, roll : roll, age : age});
        studentData.create({
            name:name,
            roll:roll,
            age:age,
            image:image
        },function(err,student){
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/");
            }
        });
        
});

app.post("/updateStudent/:id/update",function(req,res){
    var id=req.params.id,
        roll=req.body.roll,
        name=req.body.name,
        age=req.body.age,
        image=req.body.image;
    studentData.findByIdAndUpdate(id,{$set:{name:name,age:age,roll:roll,image:image}},function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    });
});



// app.listen(3000, function() {
//     console.log("Server Started");
//   });

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });