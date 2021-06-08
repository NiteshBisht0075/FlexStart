const koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const Register = require('./models/registers');
const serve = require('koa-static');
const app = new koa();
const path = require("path")
const router = new Router();
const port = 8000 ;
// const json = require('koa-json');
require('./db/conn')

const static_path = path.join(__dirname, "../public")
// const static_path = app.use(serve(__dirname , './public'));
console.log("kkk",static_path)


// app.use(json())
// app.use(koa.static(static_path))
app.use(require('koa-static')(static_path));

// read users
router.get('/',async(ctx,next)=>{
    console.log("get by ")
    ctx.body={message:"dta show"}
})
// add users in db
router.post('/register',async(ctx, next) => {
    
try{
    var body = ctx.request.body;
    var reg = new Register();
    reg.email = body.email;
    reg.password = body.password;
    reg.confirmpassword = body.confirmpassword;
    reg.save();
    ctx.body= {status: 200, message: "data save "} 
}
catch(error){
    ctx.throw(error)
}
});

// read users
router.get('/userlist',async(ctx,next)=>{
    
    try{
        var usersData = await Register.find()
        ctx.body ={usersData}
    }
    catch(error){
        ctx.throw(error)
    }
})
// get user by id
router.get("/user/:id", async(ctx,next) => {

    try{
        const _id = ctx.request.params.id;
        const userData = await Register.findById(_id);
        // console.log(userData);
        if(!userData){
            return ctx.body;
        }
        else{
            ctx.body={userData};
        }
    }
    catch(error){
        ctx.throw(error);
    }
})




app.use(koaBody({ multipart: true }))

app
.use(router.routes())
.use(router.allowedMethods());

app.listen(port,() =>{
console.log(`${port}`)
})