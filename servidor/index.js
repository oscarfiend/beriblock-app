const express =require('express');
const conectarDB=require('./config/db')
const cors=require('cors')
const fallback=require('express-history-api-fallback')

//crear el servidor
const app=express();

//conectar a la db
conectarDB()

//habilitar cors
app.use(cors())

//habilitar express.json
app.use(express.json({extended:true}))

const PORT=process.env.PORT || 4000;

//importar rutas
app.use('/api/users',require('./routes/users'))

const root = __dirname+'/public'
app.use(express.static(root))
app.use(fallback('index.html', { root: root }))


app.listen(PORT,()=>{
    console.log("El servidor esta funcionando en el puerto:",PORT)
})