var express = require('express');
var router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const connection = require("../bbdd1")

const fs = require('fs')


/* Consulta General de Productos */
router.get('/', function(req, res, next) {

    connection.query('select * from mascotas', function (error, results, fields) {

        if (error) throw error;
        res.json(results)
      });
});


/* Dashboard de Productos */
router.get('/listado/', function(req, res, next) {

    sentencia = 'select * from mascotas'; 

    connection.query(sentencia, function (error, results, fields) {

        if (error) throw error;
        res.json(results)
      });
});


/* Listado con filtro por id */
router.get('/listado/:id', function(req, res, next) {

  sentencia = 'select * from mascotas where id = ' +  req.params.id

  connection.query(sentencia, function (error, results, fields) {
      if (error) throw error;
      res.json(results)
    });
});


/* Alta de Producto */
router.post('/alta',  upload.single('imagen'), async function (req, res, next){

    // Concatenando cadenas con signo +
    let sentencia = 'insert into mascotas (nombre, descripcion, control, imagen) values("' + req.body.nombre + '","' + req.body.descripcion + '","' + req.body.control + '","/img/' + req.file.originalname + '")'
    
    // Usando template string
    // `insert into productos(nombre, descripcion,  imagen) values('${req.body.nombre}','${req.body.descripcion}','/images/${req.file.originalname}')`
    
    connection.query(sentencia, function (error, results, fields) {
      if (error) throw error;
      res.json({mensaje: "Alta realizada exitosamente"})
    });

    fs.createReadStream("./uploads/" + req.file.filename).pipe(fs.createWriteStream("./public/img/" + req.file.originalname), function(error){})
})


/* Modificación de Producto */
router.get('/modificar/:id', function (req, res, next){
  connection.query('select * from mascotas where id = ' + req.params.id, function (error, results, fields) {
      if (error) throw error;
      res.json(results)
  });
})


/* Baja de Producto */
router.put('/modificar/:id',  upload.single('imagen'), async function (req, res, next){

    let sentencia;

    if (req.file){
      sentencia =  `update mascotas set nombre  = '${req.body.nombre}', descripcion  = '${req.body.descripcion}', control  = '${req.body.control}', imagen = '/img/${req.file.originalname}' 
      where id = ${req.params.id} `

      fs.createReadStream("./uploads/" + req.file.filename).pipe(fs.createWriteStream("./public/img/" + req.file.originalname), function(error){})

    } else {
      sentencia = `update mascotas set nombre  = '${req.body.nombre}', descripcion  = '${req.body.descripcion}', control  = '${req.body.control}' where id = ${req.params.id}` 
    }  

    connection.query(sentencia, function (error, results, fields) {

      if (error) throw error;
      res.json({mensaje: "Modificación realizada exitosamente"})
    });

})

router.get('/eliminar/:id', function (req, res, next){

  connection.query('select * from mascotas where id = ' + req.params.id, function (error, results, fields) {

    if (error) throw error;
    res.json(results)
  });
})

router.delete('/eliminar/:id', function (req, res, next){

  connection.query('delete from mascotas where id = ' + req.params.id, function (error, results, fields) {

    if (error) throw error;
    res.json({mensaje: "Se ha dado de baja la mascota seleccionada"})

  });
})



module.exports = router;