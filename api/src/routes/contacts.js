var express = require("express");


// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Contacts, Messages, Category, Contact_Group } = require("../models/index");

const { generateToken, validateToken } = require("../utils/token");

var router = express.Router();

//Obtener todos los contactos
router.get("/", async (req, res) => {
  try {
    let getAllContacts = await Contacts.findAll({
      order: [["name", "ASC"]],
      include: { model: Category }
    });
    console.log(getAllContacts)
    return res.send(getAllContacts);
  } catch (err) {
    return res.send({
      message: "No se pudieron obtener usuarios \n" + err,
    });
  }
});

//Obtener todos los contactos
router.get("/byid/:id", async (req, res) => {
  const { id } = req.params
  try {
    let getContactbyId = await Contacts.findOne({
      order: [["name", "ASC"]],
      where: {id },
      include: { model: Category }
    });
    // console.log(getAllContacts)
    return res.send(getContactbyId);
  } catch (err) {
    return res.send({
      message: "No se pudieron obtener usuarios \n" + err,
    });
  }
});


//Obtener todos las contactos de un usuario
router.get("/byuser/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let getAllContacts = await Contacts.findAll({
      order: [["name", "ASC"]],
      where: { userId: id },
      include: { model: Category }
    });
    console.log(getAllContacts)
    return res.send(getAllContacts);
  } catch (err) {
    return res.send({
      message: "No se pudieron obtener usuarios \n" + err,
    });
  }
});

//Obtener todos las usuarios de un grupo
router.get("/group/:id", async (req, res) => {
  let { id } = req.params;
  if (!id || id <= 0)
    return res.status(400).send("Por favor, ingrese categoría");
  await Category.findAll({
    where: { id: id },
    include: { model: Contacts },
  }).then((s) => {
    if (s.length === 0)
      return res.status(400).json({
        message: "No se encontró contacto del grupo: " + id,
      });
    res.json(s);
  });
});

//producto por categoria
router.get("/bycat/:category", async (req, res) => {
  let { category } = req.params;
  if (!category || category === "")
    return res.status(400).send("Por favor, ingrese categoría");
  await Category.findAll({
    where: { category: category },
    include: { model: Product },
  }).then((s) => {
    if (s.length === 0)
      return res.status(400).json({
        message: "No se encontró producto con categoria: " + category,
      });
    res.json(s);
  });
});


// usernames para no chocar usuarios nuevos

//Obtener todos las celulares para evitar duplicado

router.get("/allphones", async (req, res) => {
  try {
    let getAllUserPhones = await Contacts.findAll({
      order: [["cellphone", "ASC"]],
    });
    let userphones = []
    getAllUserPhones.map((phone) => {
      userphones.push(phone.cellphone)
    })
    return res.send(userphones);
  } catch (err) {
    return res.send({
      message: "No se pudieron obtener usernames" + err,
    });
  }
});


// Actualizar datos de contacto
router.put("/update", async (req, res) => {
  // tomo todos los campos del form de registro de usuario
  const { id, name, email, cellphone, address, city, zip, province, country, groups } = req.body.user;
  console.log("RESULTADO: ", id, groups);
  // chequeo que estén completos los 3 campos requeridos
  if (!id || id === "") {
    return res.status(400).json({ message: "Falta ingresar id de usuario" });
  }
  if (!name || name === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar nombre correspondiente" });
  }
  if (!cellphone || cellphone === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar numero correspondiente" });
  }

  const objUser = {
    name,
    email,
    address,
    cellphone,
    city,
    zip,
    province,
    country,
    id
  };

  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let newUser = await Contacts.update(objUser, {
      where: {
        id,
      },
    });
    // si todo sale bien devuelvo el objeto agregado
    // console.log("Objeto de usuario guardado")
    groups.map(async (cates) => {
      await Contact_Group.destroy({
        where: {
          contactId: id,
        },
      });
    });

    groups.map(async (cates) => {
      const relacion = {
        contactId: id,
        categoryId: cates
      }
      console.log("cates",cates,"Id contact",id)
       await Contact_Group.create(relacion);
    });
    // await newUser.setCategories(groups);
    res
      .status(200)
      .json({ message: "contacto modificado con éxito", user: objUser });
  } catch (error) {
    // en caso de error lo devuelvo al frontend
    // console.log(error)
    res.status(400).json({ message: "No se pudo actualizar contacto" + error });
  }
});

//add contact
router.post("/add", async (req, res) => {
  // tomo todos los campos del form de registro de usuario
  const {
    name,
    email,
    cellphone,
    address,
    city,
    zip,
    province,
    country,
    groups,
    userid
  } = req.body;
  let hash = "";
  console.log("grupos", groups)
  // chequeo que estén completos los 3 campos requeridos
  if (!name || name === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar nombre correspondiente" });
  } else if (!cellphone || cellphone === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar numero correspondiente" });
  } else if (!country || country === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar pais correspondiente" });
  } if (!groups || groups.length <= 0) {
    return res
      .status(400)
      .json({ message: "Falta ingresar grupo para contacto" });
  }
  const objUser = {
    name,
    email,
    cellphone,
    address,
    city,
    zip,
    province,
    country,
    userId: userid
  };
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let newUser = await Contacts.create(objUser);
    // si todo sale bien devuelvo el objeto agregado
    await newUser.setCategories(groups);

    let addedUser = await Contacts.findOne({
      include: { model: Category },
      where: {
        id: newUser.id
      }
    });

    console.log("Objeto de usuario guardado");
    res
      .status(200)
      .json({ message: "Usuario admin generado correctamente", user: addedUser });
  } catch (error) {
    // en caso de error lo devuelvo al frontend
    console.log(error);
    res.status(500).json({ message: "No se pudo crear el admin" + error });
  }
});


// Borrar Contacto
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) return res.status(400).send({ message: "Debe seleccionar contacto" });

  let producSocios = await Contacts.findAll({
    where: { id: id },
    include: { model: Messages },
  }).then((s) => {
    console.log(s)
    if (s[0] && s[0].messages.length > 0) {
      return s[0].messages.length
    } else return 0
  });

  const existCat = await Contacts.findOne({
    where: {
      id,
    },
  });

  if (producSocios > 0) {
    return res.status(400).json({ message: "No se puede contacto, mensajes asociados" })
  } else {
    if (existCat) {
      try {
        let delContact = await Contacts.destroy({
          where: {
            id,
          },
        });
        console.log(delContact);
        return res
          .status(200)
          .json({ message: "contacto eliminada correctamente" });
      } catch (err) {
        return res
          .status(500)
          .json({ message: "No se pudo eliminar el contacto" + err });
      }
    } else {
      return res.status(400).json({ message: "Contacto inexistente" });
    }
  }
});


module.exports = router;
